import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { updateUser, decodeJwt } from '../../../feature-module/Api/UserApi';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { fetchBranches } from '../../../feature-module/Api/BranchApi'
import { fetchUserRoles } from '../../../feature-module/Api/UserRoleApi'

const EditUser = ({ user, onUpdate }) => {
    const MySwal = withReactContent(Swal);
    const [errors, setErrors] = useState({});
    const [branchOptions, setBranchOptions] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [roleOptions, setRoleOptions] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [isManager, setIsManager] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        emailAddress: '',
        address: '',
        userRoleDto: { userRole: '' },
        branchDto: null,
        createdDate: null,
        isActive: true
    });

    const loadBranches = async () => {
        try {
            const response = await fetchBranches(1, 100, true); // Get active branches
            if (response && Array.isArray(response.payload)) {
                const formattedBranches = response.payload
                    .filter(branch => branch && branch.branchName)
                    .map(branch => ({
                        value: branch.id,
                        label: branch.branchName
                    }));
                setBranchOptions(formattedBranches);
            } else {
                setBranchOptions([]);
                console.error('Invalid branch data received:', response);
            }
        } catch (error) {
            console.error('Error loading branches:', error);
            setBranchOptions([]);
            MySwal.fire({
                title: 'Error',
                text: 'Failed to load branches: ' + error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const loadUserRoles = async () => {
        try {
            const roles = await fetchUserRoles();
            let filteredRoles = roles;
            
            if (isManager) {
                filteredRoles = roles.filter(role => 
                    role.userRole === "MANAGER" || role.userRole === "USER"
                );
            }
            
            const formattedRoles = filteredRoles.map(role => ({
                value: role.id,
                label: role.userRole
            }));
            setRoleOptions(formattedRoles);
        } catch (error) {
            console.error('Error loading user roles:', error);
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            const decodedToken = decodeJwt(accessToken);
            const userRole = decodedToken?.roles[0]?.authority;
            setIsManager(userRole === "ROLE_MANAGER");
        }

        loadBranches();
        loadUserRoles();
        if (user) {
            console.log('Received user data:', user);
            setFormData({
                id: user.id,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                mobileNumber: user.mobileNumber || '',
                emailAddress: user.emailAddress || '',
                address: user.address || '',
                userRoleDto: user.userRoleDto || { userRole: '' },
                branchDto: user.branchDto || null,
                createdDate: user.createdDate,
                isActive: user.isActive || true
            });

            if (user.branchDto) {
                setSelectedBranch({
                    value: user.branchDto.id,
                    label: user.branchDto.branchName
                });
            }

            if (user.userRoleDto) {
                setSelectedRole({
                    value: user.userRoleDto.id,
                    label: user.userRoleDto.userRole
                });
            }
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'mobileNumber') {
            const numbersOnly = value.replace(/[^0-9]/g, '');
            setFormData(prev => ({
                ...prev,
                [name]: numbersOnly
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        if (name === 'emailAddress' && value) {
            if (!value.includes('@')) {
                setErrors(prev => ({
                    ...prev,
                    emailAddress: 'Email must contain @ symbol'
                }));
            } else {
                setErrors(prev => ({
                    ...prev,
                    emailAddress: ''
                }));
            }
        }
    };

    const handleBranchChange = (selectedOption) => {
        setSelectedBranch(selectedOption);
        setFormData(prev => ({
            ...prev,
            branchDto: {
                id: selectedOption.value,
                branchName: selectedOption.label
            }
        }));
    };

    const handleRoleChange = (selectedOption) => {
        if (isManager) {
            setSelectedRole(selectedOption);
            setFormData(prev => ({
                ...prev,
                userRoleDto: {
                    id: selectedOption.value,
                    userRole: selectedOption.label
                }
            }));
        } else {
            setSelectedRole(selectedOption);
            setFormData(prev => ({
                ...prev,
                userRoleDto: {
                    id: selectedOption.value,
                    userRole: selectedOption.label
                }
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.mobileNumber.trim()) {
            newErrors.mobileNumber = 'Phone number is required';
        } else if (!/^\d+$/.test(formData.mobileNumber)) {
            newErrors.mobileNumber = 'Please enter valid phone number';
        }

        if (!formData.emailAddress.trim()) {
            newErrors.emailAddress = 'Email is required';
        } else if (!formData.emailAddress.includes('@')) {
            newErrors.emailAddress = 'Email must contain @ symbol';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!formData.branchDto) {
            newErrors.branch = 'Branch is required';
        }

        if (!formData.userRoleDto) {
            newErrors.role = 'Role is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                MySwal.fire({
                    title: 'Are you sure?',
                    text: "You want to update this user?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, update it!',
                    cancelButtonText: 'No, cancel!',
                    confirmButtonColor: '#00ff00',
                    cancelButtonColor: '#ff0000',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            const updateData = {
                                ...formData,
                                password: user.password
                            };
                            
                            console.log('Sending update data:', updateData);
                            
                            const response = await updateUser(updateData);
                            console.log('Update response:', response);
                            
                            if (response && response.status === true) {
                                document.querySelector('#edit-units button[data-bs-dismiss="modal"]').click();
                                MySwal.fire({
                                    title: 'Updated!',
                                    text: 'User has been updated successfully.',
                                    icon: 'success',
                                    confirmButtonText: 'OK',
                                    customClass: {
                                        confirmButton: 'btn btn-success',
                                    },
                                });
                                onUpdate();
                            } else {
                                MySwal.fire({
                                    title: 'Update Failed',
                                    text: response.errorDescription || 'Failed to update user',
                                    icon: 'error',
                                    confirmButtonText: 'OK',
                                });
                            }
                        } catch (error) {
                            console.error('Error updating user:', error);
                            MySwal.fire({
                                title: 'Error!',
                                text: 'Failed to update user. Please check the console for details.',
                                icon: 'error',
                                confirmButtonText: 'OK',
                            });
                        }
                    }
                });
            } catch (error) {
                console.error('Error in handleSubmit:', error);
                MySwal.fire({
                    title: 'Error!',
                    text: 'Something went wrong.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        }
    };

    const handleCancel = () => {
        if (user) {
            setFormData({
                id: user.id,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                mobileNumber: user.mobileNumber || '',
                emailAddress: user.emailAddress || '',
                address: user.address || '',
                userRoleDto: user.userRoleDto || { userRole: '' },
                branchDto: user.branchDto || null,
                createdDate: user.createdDate,
                isActive: user.isActive || true
            });

            if (user.branchDto) {
                setSelectedBranch({
                    value: user.branchDto.id,
                    label: user.branchDto.branchName
                });
            } else {
                setSelectedBranch(null);
            }

            if (user.userRoleDto) {
                setSelectedRole({
                    value: user.userRoleDto.id,
                    label: user.userRoleDto.userRole
                });
            } else {
                setSelectedRole(null);
            }
        }
        setErrors({});
    };

    return (
        <div>
            <div className="modal fade" id="edit-units">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Edit User</h4>
                                    </div>
                                    <button
                                        type="button"
                                        className="close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={handleCancel}
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body custom-modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>First Name</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.firstName && <span className="error-message text-danger">{errors.firstName}</span>}
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>Last Name</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.lastName && <span className="error-message text-danger">{errors.lastName}</span>}
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>Phone</label>
                                                    <input 
                                                        type="tel" 
                                                        className="form-control"
                                                        name="mobileNumber"
                                                        value={formData.mobileNumber}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.mobileNumber && <span className="error-message text-danger">{errors.mobileNumber}</span>}
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>Email</label>
                                                    <input 
                                                        type="email" 
                                                        className="form-control"
                                                        name="emailAddress"
                                                        value={formData.emailAddress}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.emailAddress && <span className="error-message text-danger">{errors.emailAddress}</span>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="input-blocks">
                                                    <label>Address</label>
                                                    <input
                                                        type="text" 
                                                        className="form-control"
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={handleInputChange}
                                                    />
                                                    {errors.address && <span className="error-message text-danger">{errors.address}</span>}
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>Role</label>
                                                    <Select
                                                        className="select"
                                                        options={roleOptions}
                                                        value={selectedRole}
                                                        onChange={handleRoleChange}
                                                        placeholder="Choose Role"
                                                        isSearchable={true}
                                                    />
                                                    {errors.role && <span className="error-message text-danger">{errors.role}</span>}
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>Branch</label>
                                                    <Select
                                                        className="select"
                                                        options={branchOptions}
                                                        value={selectedBranch}
                                                        onChange={handleBranchChange}
                                                        placeholder="Choose Branch"
                                                        isSearchable={true}
                                                    />
                                                    {errors.branch && <span className="error-message text-danger">{errors.branch}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer-btn">
                                            <button
                                                type="button"
                                                className="btn btn-cancel me-2"
                                                data-bs-dismiss="modal"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                            <button type="submit" className="btn btn-submit">
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

EditUser.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        mobileNumber: PropTypes.string,
        emailAddress: PropTypes.string,
        address: PropTypes.string,
        password: PropTypes.string,
        createdDate: PropTypes.string,
        isActive: PropTypes.bool,
        userRoleDto: PropTypes.shape({
            id: PropTypes.number,
            userRole: PropTypes.string,
            isActive: PropTypes.bool
        }),
        branchDto: PropTypes.shape({
            id: PropTypes.number,
            branchName: PropTypes.string
        })
    }),
    onUpdate: PropTypes.func.isRequired
};

EditUser.defaultProps = {
    user: null
};

export default EditUser
