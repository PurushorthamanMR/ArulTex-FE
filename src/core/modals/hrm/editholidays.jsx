import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { updateHoliday, sendEmail } from '../../../feature-module/Api/HolidayApi';
import { fetchUsers } from '../../../feature-module/Api/UserApi';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../../../style/scss/components/Pos Components/Pos_RequestLeave.scss";

const EditHolidays = ({ selectedHoliday, onUpdate }) => {
  const [formData, setFormData] = useState({
    id: '',
    createdOn: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Pending',
    userDto: null,
    isActive: 1,
  });
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [userLoadError, setUserLoadError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Declined', label: 'Declined' },
  ];

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedHoliday) {
      setFormData({
        id: selectedHoliday.id || '',
        createdOn: selectedHoliday.createdOn || '',
        description: selectedHoliday.description || '',
        startDate: selectedHoliday.startDate || '',
        endDate: selectedHoliday.endDate || '',
        status: selectedHoliday.status || 'Pending',
        userDto: selectedHoliday.userDto || null,
        isActive: selectedHoliday.isActive ? 1 : 0,
      });
    }
  }, [selectedHoliday]);

  const loadUsers = async () => {
    try {
      setIsLoadingUsers(true);
      setUserLoadError(null);
      const userData = await fetchUsers(1, 100, true);
      const userOptions = userData.payload.map(user => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`,
        email: user.emailAddress
      }));
      setUsers(userOptions);
    } catch (error) {
      setUserLoadError('Failed to load users');
      Swal.fire({
        title: "Error!",
        text: "Failed to load users: " + error.message,
        icon: "error",
      });
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const formatReadableDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDateChange = (date, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: date ? formatDate(date) : ''
    }));
  };

  const handleUserChange = (selectedOption) => {
    setFormData(prev => ({
      ...prev,
      userDto: selectedOption ? { id: selectedOption.value } : null
    }));
  };

  const validateDates = () => {
    if (!formData.startDate || !formData.endDate) {
      return false;
    }
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    return start <= end;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.userDto?.id) {
      Swal.fire({
        title: "Error!",
        text: "Please select a user",
        icon: "error",
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      Swal.fire({
        title: "Error!",
        text: "Please select both start and end dates",
        icon: "error",
      });
      setIsSubmitting(false);
      return;
    }

    if (!validateDates()) {
      Swal.fire({
        title: "Error!",
        text: "Start date must be before or equal to end date",
        icon: "error",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const holidayData = {
        id: formData.id,
        createdOn: selectedHoliday.createdOn,
        startDate: formData.startDate,
        endDate: formData.endDate,
        description: formData.description,
        isActive: formData.isActive,
        status: formData.status,
        userDto: {
          id: formData.userDto.id
        }
      };

      console.log("Sending payload to updateHoliday:", JSON.stringify(holidayData, null, 2));

      const response = await updateHoliday(holidayData);
      if (response) {
        if (formData.status === 'Approved' || formData.status === 'Declined') {
          try {
            const approverFirstName = localStorage.getItem("firstName") || "Unknown";
            const approverLastName = localStorage.getItem("lastName") || "";
            const approverEmail = localStorage.getItem("email");
            const shopName = localStorage.getItem("shopName") || "KFC";
            const user = users.find(u => u.value === formData.userDto.id);
            console.log("user:", user);
            const userName = user ? user.label : "Staff Member";
            const userEmail = user ? user.email : null;
            console.log("userEmail:", userEmail);
            const subject = `Leave Request ${formData.status}`;
            const actionDate = formatReadableDate(new Date());
            const leavePeriod = `${formatReadableDate(formData.startDate)} – ${formatReadableDate(formData.endDate)}`;
            const dateLabel = formData.status === 'Approved' ? 'Approval Date' : 'Declined Date';

            const userBody = `Dear ${userName},\n\nYour leave request has been "${formData.status.toLowerCase()}" by Mr. ${approverFirstName} ${approverLastName}.\n\nLeave Type: ${formData.description}\nLeave Period: ${leavePeriod}\n${dateLabel}: ${actionDate}\n\nIf you require any further assistance or would like to discuss any details regarding your leave, please feel free to contact Mr. ${approverFirstName} ${approverLastName} directly.\n\nWarm regards,\n${shopName}`;

            if (!userEmail) {
              throw new Error("User email not found");
            }
            await sendEmail(userEmail, subject, userBody);
            console.log("Email sent successfully to user:", userEmail);

            if (!approverEmail) {
              console.warn("Approver email not found in localStorage");
            } else {
              const approverSubject = formData.status === 'Approved' ? "Leave Approval Notification" : "Leave Decline Notification";
              const approverBody = `Dear ${approverFirstName} ${approverLastName},\n\nThis is a confirmation email that you have "${formData.status.toLowerCase()}" a leave request for ${userName}.\n\nReason for leave: ${formData.description}\nPeriod: ${leavePeriod.replace('–', 'to')}\n${dateLabel}: ${actionDate}\n\nKind regards,\n${shopName}`;
              await sendEmail(approverEmail, approverSubject, approverBody);
              console.log("Email sent successfully to approver:", approverEmail);
            }
          } catch (emailError) {
            console.error("Failed to send email:", emailError);
            Swal.fire({
              title: "Warning!",
              text: "Leave updated successfully, but failed to send email notification.",
              icon: "warning",
            });
          }
        }

        onUpdate();
        Swal.fire({
          title: "Success!",
          text: "Staff Leave has been updated successfully.",
          icon: "success",
        });
        document.querySelector("#edit-department .close").click();
      }
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      Swal.fire({
        title: "Error!",
        text: `Failed to update Staff Leave: ${error.response?.data?.message || error.message}`,
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal fade" id="edit-department">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Edit Staff Leave</h4>
                </div>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body custom-modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="input-blocks mb-3">
                        <label>Description</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          disabled={isSubmitting || isLoadingUsers}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-blocks mb-3">
                        <label>Start Date</label>
                        <DatePicker
                          selected={formData.startDate ? new Date(formData.startDate) : null}
                          onChange={(date) => handleDateChange(date, 'startDate')}
                          dateFormat="dd-MM-yyyy"
                          className="form-control custom-date-picker"
                          placeholderText="Select start date"
                          disabled={isSubmitting || isLoadingUsers}
                          minDate={new Date()}
                          maxDate={formData.endDate ? new Date(formData.endDate) : null}
                          popperPlacement="bottom-start"
                          weekStartsOn={1}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-blocks mb-3">
                        <label>End Date</label>
                        <DatePicker
                          selected={formData.endDate ? new Date(formData.endDate) : null}
                          onChange={(date) => handleDateChange(date, 'endDate')}
                          dateFormat="dd-MM-yyyy"
                          className="form-control custom-date-picker"
                          placeholderText="Select end date"
                          disabled={isSubmitting || isLoadingUsers}
                          minDate={formData.startDate ? new Date(formData.startDate) : new Date()}
                          popperPlacement="bottom-start"
                          weekStartsOn={1}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="input-blocks mb-3">
                        <label>User</label>
                        <Select
                          options={users}
                          value={formData.userDto ? users.find(user => user.value === formData.userDto.id) : null}
                          onChange={handleUserChange}
                          className="w-100"
                          isLoading={isLoadingUsers}
                          placeholder={userLoadError || "Select a user"}
                          isClearable
                          isDisabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="input-blocks mb-3">
                        <label>Status</label>
                        <Select
                          options={statusOptions}
                          value={statusOptions.find(opt => opt.value === formData.status)}
                          onChange={(selected) => setFormData({ ...formData, status: selected.value })}
                          className="w-100"
                          isDisabled={isSubmitting || isLoadingUsers}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer-btn">
                    <button type="button" className="btn btn-cancel me-2" data-bs-dismiss="modal" disabled={isSubmitting}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-submit" disabled={isSubmitting || isLoadingUsers}>
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EditHolidays.propTypes = {
  selectedHoliday: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    createdOn: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    status: PropTypes.string,
    userDto: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    isActive: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
  }),
  onUpdate: PropTypes.func.isRequired
};

export default EditHolidays;