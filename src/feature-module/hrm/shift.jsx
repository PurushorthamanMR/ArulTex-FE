import React, { useEffect, useState } from 'react';
import { saveShift, updateShift, getShiftsByDateRange } from '../Api/ShiftApi';
import { fetchUsers } from '../Api/UserApi';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
import { Modal, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PlusCircle } from 'feather-icons-react/build/IconComponents';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { ChevronUp, RotateCcw } from 'feather-icons-react/build/IconComponents';
import { useDispatch, useSelector } from 'react-redux';
import { setToogleHeader } from '../../core/redux/action';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { sendEmail, fetchHolidays } from '../Api/HolidayApi';
import '../../style/scss/pages/_shifts.scss';

function getCalendarGrid(year, month) {
  const firstDayOfMonth = dayjs(`${year}-${month}-01`);
  const startOfGrid = firstDayOfMonth.startOf('week');
  const endOfGrid = firstDayOfMonth.endOf('month').endOf('week');
  const days = [];
  let day = startOfGrid;
  while (day.isBefore(endOfGrid) || day.isSame(endOfGrid, 'day')) {
    days.push(day);
    day = day.add(1, 'day');
  }
  return days;
}

const Shift = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs('2025-05-01').startOf('month'));
  const [shifts, setShifts] = useState([]);
  const [users, setUsers] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [modal, setModal] = useState({ show: false, date: null, mode: 'add', shift: null });
  const [emailModal, setEmailModal] = useState({ show: false, startDate: '', endDate: '' });
  const [form, setForm] = useState({ startTime: '', endTime: '', userId: '', status: 'Active' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [exportModal, setExportModal] = useState({ show: false, startDate: '', endDate: '', type: '' });

  useEffect(() => {
    fetchUsers(1, 100, true).then(res => setUsers(res.payload || []));
    fetchHolidays(1, 1000, true).then(res => setHolidays(res.payload || []));
  }, []);

  const year = currentMonth.year();
  const month = currentMonth.format('MM');
  const days = getCalendarGrid(year, month);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const thisMonth = currentMonth.format('YYYY-MM');

  useEffect(() => {
    fetchShiftsData();
  }, [currentMonth, modal.show === false]);

  const fetchShiftsData = async () => {
    setLoading(true);
    if (days.length > 0) {
      const startDate = days[0].format('YYYY-MM-DD');
      const endDate = days[days.length - 1].format('YYYY-MM-DD');
      const result = await getShiftsByDateRange(startDate, endDate);
      setShifts(result || []);
    } else {
      setShifts([]);
    }
    setLoading(false);
  };

  const shiftsByDate = shifts.reduce((acc, shift) => {
    const date = shift.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(shift);
    return acc;
  }, {});

  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
  const nextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));

  const openAddModal = (date) => {
    setForm({ startTime: '', endTime: '', userId: '', status: 'Active' });
    setModal({ show: true, date, mode: 'add', shift: null });
  };
  const openEditModal = (shift) => {
    setForm({ startTime: shift.startTime, endTime: shift.endTime, userId: shift.userDto?.id, status: shift.status });
    setModal({ show: true, date: shift.date, mode: 'edit', shift });
  };
  const closeModal = () => setModal({ show: false, date: null, mode: 'add', shift: null });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  function formatTime12(timeStr) {
    if (!timeStr) return '';
    const [h, m] = timeStr.split(':');
    let hour = parseInt(h, 10);
    const min = m || '00';
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    if (hour === 0) hour = 12;
    return `${hour.toString().padStart(2, '0')}:${min} ${ampm}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const managerId = localStorage.getItem('userId');
    if (modal.mode === 'add' && dayjs(modal.date).isBefore(dayjs(), 'day')) {
      alert('Cannot add shift for past days.');
      setLoading(false);
      return;
    }
    if (modal.mode === 'edit' && dayjs(modal.date).isBefore(dayjs(), 'day')) {
      alert('Cannot update past shifts.');
      setLoading(false);
      return;
    }
    const payload = {
      date: modal.date,
      startTime: form.startTime,
      endTime: form.endTime,
      status: modal.mode === 'edit' ? form.status : 'Active',
      userDto: { id: Number(form.userId) },
      managerDto: { id: Number(managerId) },
      isActive: 1,
    };
    try {
      if (modal.mode === 'add') {
        await saveShift(payload);
      } else if (modal.mode === 'edit') {
        await updateShift({ ...payload, id: modal.shift.id });
      }
      closeModal();
    } catch (err) {
      alert('Error saving shift');
    }
    setLoading(false);
  };

  const handleEmailSubmit = async () => {
    if (!emailModal.startDate || !emailModal.endDate) {
      alert('Please select both start and end dates');
      return;
    }

    setLoading(true);
    try {
      const startDate = dayjs(emailModal.startDate);
      const endDate = dayjs(emailModal.endDate);
      // Get all dates in the range
      const allDates = [];
      let d = startDate;
      while (d.isSameOrBefore(endDate, 'day')) {
        allDates.push(d.format('YYYY-MM-DD'));
        d = d.add(1, 'day');
      }
      // Get shifts for the selected date range
      const result = await getShiftsByDateRange(emailModal.startDate, emailModal.endDate);
      // Group shifts by user, filter out cancelled
      const shiftsByUser = result.filter(s => s.status !== 'Cancelled').reduce((acc, shift) => {
        const userId = shift.userDto?.id;
        if (!acc[userId]) acc[userId] = [];
        acc[userId].push(shift);
        return acc;
      }, {});
      // Get all user IDs with shifts or in users list
      const userIds = Array.from(new Set([
        ...Object.keys(shiftsByUser),
        ...users.map(u => String(u.id))
      ]));
      // Send email to each user with their shifts or off days
      for (const userId of userIds) {
        const user = users.find(u => u.id === Number(userId));
        if (user && user.emailAddress) {
          const userShifts = (shiftsByUser[userId] || []);
          // Map date to shift for quick lookup
          const shiftMap = {};
          userShifts.forEach(shift => { shiftMap[shift.date] = shift; });
          // Build table rows for all dates
          const tableRows = allDates.map(date => {
            const shift = shiftMap[date];
            if (shift) {
              return `${date.padEnd(11)}  ${formatTime12(shift.startTime).padEnd(10)}  ${formatTime12(shift.endTime).padEnd(10)}`;
            } else {
              return `${date.padEnd(11)}  Off day`;
            }
          }).join('\n');
          let managerName = '';
          const managerId = localStorage.getItem('userId');
          if (managerId && users.length > 0) {
            const manager = users.find(u => u.id === Number(managerId));
            if (manager) managerName = manager.firstName;
          }
          const shopName = localStorage.getItem('shopName') || '';
          const header = 'Date        Start Time   End Time';
          const divider = '--------------------------------------------';
          const subject = `Your Shifts (${startDate.format('MMM D')} - ${endDate.format('MMM D')})`;
          const body =
            `Dear ${user.firstName},\n\n` +
            `Here are your shifts for the period ${startDate.format('MMM D')} - ${endDate.format('MMM D')}:\n\n` +
            `${header}\n${divider}\n${tableRows}\n\n` +
            `If you require any further assistance or would like to discuss any details regarding your shifts, please feel free to contact ${managerName ? managerName : 'your manager'} directly.\n\n` +
            `Warm regards,\n${shopName}`;
          try {
            await sendEmail(user.emailAddress, subject, body);
          } catch (err) {
            console.error('Error sending email:', err);
          }
        }
      }
      setEmailModal({ show: false, startDate: '', endDate: '' });
    } catch (err) {
      alert('Error sending emails');
    }
    setLoading(false);
  };

  function getAllDatesInRange(start, end) {
    const dates = [];
    let d = dayjs(start);
    const endD = dayjs(end);
    while (d.isSameOrBefore(endD, 'day')) {
      dates.push(d.format('YYYY-MM-DD'));
      d = d.add(1, 'day');
    }
    return dates;
  }

  const handleExport = async () => {
    if (!exportModal.startDate || !exportModal.endDate) {
      alert('Please select both start and end dates');
      return;
    }
    console.log('Exporting from', exportModal.startDate, 'to', exportModal.endDate);
    const allDates = getAllDatesInRange(exportModal.startDate, exportModal.endDate);
    const result = await getShiftsByDateRange(exportModal.startDate, exportModal.endDate);
    const shiftMap = {};
    result.filter(s => s.status !== 'Cancelled').forEach(shift => {
      const userId = shift.userDto?.id;
      if (!shiftMap[userId]) shiftMap[userId] = {};
      shiftMap[userId][shift.date] = shift;
    });
    const matrixRows = users.map(user => {
      const row = [user.firstName + ' ' + user.lastName];
      allDates.forEach(date => {
        const shift = shiftMap[user.id]?.[date];
        if (shift) {
          row.push(`${formatTime12(shift.startTime)} - ${formatTime12(shift.endTime)}`);
        } else {
          row.push('Off day');
        }
      });
      return row;
    });
    const headerRow = ['User'];
    allDates.forEach(date => headerRow.push(dayjs(date).format('MMM DD')));
    if (exportModal.type === 'pdf') {
      try {
        const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        doc.text('Shifts', 14, 15);
        autoTable(doc, {
          head: [headerRow],
          body: matrixRows,
          startY: 20,
          theme: 'grid',
          styles: { fontSize: 12, cellPadding: 3, cellWidth: 'auto' },
          headStyles: { fontSize: 13, fillColor: [41, 128, 185], textColor: 255 },
          margin: { left: 8, right: 8 },
          tableWidth: 'wrap',
        });
        doc.save('shift.pdf');
      } catch (error) {
        alert('Failed to generate PDF: ' + error.message);
      }
    } else if (exportModal.type === 'excel') {
      try {
        const worksheetData = [headerRow, ...matrixRows];
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Shifts');
        worksheet['!cols'] = [
          { wch: 20 },
          ...allDates.map(() => ({ wch: 18 }))
        ];
        XLSX.writeFile(workbook, 'shift.xlsx');
      } catch (error) {
        alert('Failed to export to Excel: ' + error.message);
      }
    }
    setExportModal({ show: false, startDate: '', endDate: '', type: '' });
  };

  const renderTooltip = (props) => (
    <Tooltip id="pdf-tooltip" {...props}>Pdf</Tooltip>
  );
  const renderExcelTooltip = (props) => (
    <Tooltip id="excel-tooltip" {...props}>Excel</Tooltip>
  );
  const renderRefreshTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>Refresh</Tooltip>
  );
  const renderCollapseTooltip = (props) => (
    <Tooltip id="collapse-tooltip" {...props}>Collapse</Tooltip>
  );

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <div className="content" style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
        {/* Page Header */}
        <div className="page-header">
          <div className="add-item d-flex align-items-center">
            <div className="page-title">
              <h4 className="calendar-title">Shift Calendar</h4>
              <h6 className="calendar-subtitle">Manage Your Shifts</h6>
            </div>
            <Button
              variant="primary"
              className="ms-4"
              style={{ minWidth: 140 }}
              onClick={() => setEmailModal({ show: true, startDate: '', endDate: '' })}
            >
              Send Email
            </Button>
          </div>
          <ul className="table-top-head">
            <li>
              <OverlayTrigger placement="top" overlay={renderTooltip}>
                <Link to="#" onClick={() => setExportModal({ show: true, startDate: '', endDate: '', type: 'pdf' })}>
                  <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
                <Link to="#" onClick={() => setExportModal({ show: true, startDate: '', endDate: '', type: 'excel' })}>
                  <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                <Link to="#" onClick={fetchShiftsData}>
                  <RotateCcw />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                <Link
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  id="collapse-header"
                  className={data ? "active" : ""}
                  onClick={() => { dispatch(setToogleHeader(!data)) }}
                >
                  <ChevronUp />
                </Link>
              </OverlayTrigger>
            </li>
          </ul>
        </div>
        {/* End Page Header */}
        <div className="calendar-header">
          <Button variant="outline-primary" onClick={prevMonth}>{'<'}</Button>
          <h4 style={{ margin: 0 }}>{currentMonth.format('MMMM YYYY')}</h4>
          <Button variant="outline-primary" onClick={nextMonth}>{'>'}</Button>
        </div>
        <div className="calendar-weekdays">
          {weekDays.map(d => <div key={d} className="calendar-weekday-label">{d}</div>)}
        </div>
        <div className="calendar-grid">
          {days.map((date, idx) => {
            const isThisMonth = date.format('YYYY-MM') === thisMonth;
            const isPast = date.isBefore(dayjs(), 'day');
            return (
              <div
                className={`calendar-day${date.isSame(dayjs(), 'day') ? ' today' : ''}${!isThisMonth ? ' muted' : ''}`}
                key={idx}
              >
                <div className="calendar-day-number" style={{ fontWeight: 600 }}>{date.date()}</div>
                <button
                  className="add-btn"
                  title={isPast ? 'Cannot add shift for past days' : 'Add shift'}
                  onClick={() => !isPast && openAddModal(date.format('YYYY-MM-DD'))}
                  disabled={isPast}
                  style={isPast ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
                >
                  <PlusCircle size={16} />
                </button>
                <div className="shift-items-scroll">
                  {(shiftsByDate[date.format('YYYY-MM-DD')] || [])
                    .slice()
                    .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''))
                    .map(shift => {
                      // Status logic
                      let status = shift.status;
                      let statusLabel = status;
                      let shiftClass = '';
                      let statusLabelClass = 'shift-status-label';
                      if (status === 'Cancelled') {
                        shiftClass = 'shift-cancelled';
                        statusLabel = 'Cancelled';
                        statusLabelClass += ' status-cancelled';
                      } else if (status === 'Active') {
                        if (dayjs(shift.date).isBefore(dayjs(), 'day')) {
                          shiftClass = 'shift-completed';
                          statusLabel = 'Completed';
                          statusLabelClass += ' status-completed';
                        } else {
                          shiftClass = 'shift-active';
                          statusLabel = 'Active';
                        }
                      } else if (status === 'Completed') {
                        shiftClass = 'shift-completed';
                        statusLabel = 'Completed';
                        statusLabelClass += ' status-completed';
                      }
                      // Prevent update for past days
                      const shiftIsPast = dayjs(shift.date).isBefore(dayjs(), 'day');
                      return (
                        <div
                          className={`shift-item ${shiftClass}`}
                          key={shift.id}
                          onClick={() => !shiftIsPast && openEditModal(shift)}
                          style={shiftIsPast ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
                          title={shiftIsPast ? 'Cannot update past shifts' : 'Update shift'}
                        >
                          <span className={statusLabelClass}>{statusLabel}</span>
                          {formatTime12(shift.startTime)} - {formatTime12(shift.endTime)} <br />
                          {shift.userDto?.firstName || ''}
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
        <Modal show={modal.show} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{modal.mode === 'add' ? 'Add Shift' : 'Update Shift'}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control type="text" value={modal.date} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="time"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  type="time"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>User</Form.Label>
                <Form.Select
                  name="userId"
                  value={form.userId}
                  onChange={handleFormChange}
                  required
                  disabled={modal.mode === 'edit'}
                >
                  <option value="">Select User</option>
                  {users.map(u => {
                    const dateObj = dayjs(modal.date);
                    const leave = holidays.find(h =>
                      h.userDto?.id === u.id &&
                      h.status === 'Approved' &&
                      dayjs(h.startDate).isSameOrBefore(dateObj, 'day') &&
                      dayjs(h.endDate).isSameOrAfter(dateObj, 'day')
                    );
                    if (leave) {
                      return (
                        <option key={u.id} value={u.id} disabled>
                          {u.firstName} {u.lastName} (On Leave: {leave.startDate} to {leave.endDate})
                        </option>
                      );
                    } else {
                      return (
                        <option key={u.id} value={u.id}>
                          {u.firstName} {u.lastName}
                        </option>
                      );
                    }
                  })}
                </Form.Select>
              </Form.Group>
              {/* Status dropdown only for update */}
              {modal.mode === 'edit' && (
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={form.status || 'Active'}
                    onChange={handleFormChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Cancelled">Cancelled</option>
                  </Form.Select>
                </Form.Group>
              )}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between align-items-center">
              <div><Button variant="secondary" onClick={closeModal}>Cancel</Button></div>
              <div><Button type="submit" variant="primary" disabled={loading}>{modal.mode === 'add' ? 'Add' : 'Update'}</Button></div>
            </Modal.Footer>
          </Form>
        </Modal>
        {/* Email Modal */}
        <Modal show={emailModal.show} onHide={() => setEmailModal({ show: false, startDate: '', endDate: '' })} centered>
          <Modal.Header closeButton>
            <Modal.Title>Send Shift Emails</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={emailModal.startDate}
                  onChange={(e) => setEmailModal(prev => ({ ...prev, startDate: e.target.value }))}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={emailModal.endDate}
                  onChange={(e) => setEmailModal(prev => ({ ...prev, endDate: e.target.value }))}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEmailModal({ show: false, startDate: '', endDate: '' })}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEmailSubmit} disabled={loading}>
              Send Emails
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Export Modal */}
        <Modal show={exportModal.show} onHide={() => setExportModal({ show: false, startDate: '', endDate: '', type: '' })} centered>
          <Modal.Header closeButton>
            <Modal.Title>Export Shifts ({exportModal.type === 'pdf' ? 'PDF' : 'Excel'})</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={exportModal.startDate}
                  onChange={e => setExportModal(prev => ({ ...prev, startDate: e.target.value }))}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={exportModal.endDate}
                  onChange={e => setExportModal(prev => ({ ...prev, endDate: e.target.value }))}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setExportModal({ show: false, startDate: '', endDate: '', type: '' })}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleExport} disabled={!exportModal.startDate || !exportModal.endDate}>
              Export
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Shift;

