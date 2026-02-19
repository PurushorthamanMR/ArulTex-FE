//import { PlusCircle } from 'feather-icons-react/build/IconComponents'
import React, { useState, useEffect } from 'react'
//import { Link } from 'react-router-dom'
import Select from 'react-select'
import { fetchUserRoles } from '../../../feature-module/Api/UserRoleApi'
import { saveUser } from '../../../feature-module/Api/UserApi'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import { fetchBranches } from '../../../feature-module/Api/BranchApi'
import { decodeJwt } from '../../../feature-module/Api/UserApi'

const AddUsers = ({ onUpdate }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        password: '',
        address: '',
        emailAddress: '',
        mobileNumber: '',
        isActive: true,
        createdDate: new Date().toISOString(),
        userRoleDto: null,
        branchDto: null
    });

    const [errors, setErrors] = useState({});
    const [roleOptions, setRoleOptions] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);
    const [branchOptions, setBranchOptions] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);

    const MySwal = withReactContent(Swal);

    useEffect(() => {
        loadUserRoles();
        loadBranches();
    }, []);

    const loadUserRoles = async () => {
        try {
            const roles = await fetchUserRoles();
            const formattedRoles = roles.map(role => ({
                value: role.id,
                label: role.userRole
            }));
            setRoleOptions(formattedRoles);
            setDefaultRoleForManager(formattedRoles);
        } catch (error) {
            console.error('Error loading user roles:', error);
        }
    };

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

    const setDefaultRoleForManager = (roles) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            const decodedToken = decodeJwt(accessToken);
            const userRole = decodedToken?.roles[0]?.authority;
            
            if (userRole === "ROLE_MANAGER") {
                const userRoleOption = roles.find(option => option.label === "USER");
                if (userRoleOption) {
                    handleRoleChange(userRoleOption);
                    setSelectedRole(userRoleOption);
                }
            }
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
        } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
            newErrors.emailAddress = 'Invalid email format';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!isManagerLoggedIn() && !formData.userRoleDto) {
            newErrors.role = 'Role is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.branchDto) {
            newErrors.branch = 'Branch is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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

    const handleRoleChange = (selectedOption) => {
        setSelectedRole(selectedOption);
        setFormData(prev => ({
            ...prev,
            userRoleDto: {
                id: selectedOption.value,
                userRole: selectedOption.label
            }
        }));
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            try {
                const submitData = {
                    ...formData,
                    createdDate: new Date().toISOString()
                };
                delete submitData.confirmPassword;

                if (!submitData.userRoleDto) {
                    submitData.userRoleDto = {
                        id: 3,
                        userRole: "USER"
                    };
                }
                
                console.log("Data being submitted:", JSON.stringify(submitData, null, 2));
                
                const response = await saveUser(submitData);
                
                if (response && response.responseDto) {
                    MySwal.fire({
                        title: 'Success!',
                        text: 'User created successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        customClass: {
                            confirmButton: 'btn btn-success'
                        }
                    }).then(() => {
                        document.querySelector('[data-bs-dismiss="modal"]').click();
                        
                        if (typeof onUpdate === 'function') {
                            onUpdate();
                        }
                    });

                    setFormData({
                        firstName: '',
                        lastName: '',
                        password: '',
                        address: '',
                        emailAddress: '',
                        mobileNumber: '',
                        isActive: true,
                        createdDate: new Date().toISOString(),
                        userRoleDto: null,
                        branchDto: null
                    });
                    setSelectedRole(null);
                    setSelectedBranch(null);
                } else {
                    MySwal.fire({
                        title: 'Error!',
                        text: response?.errorDescription || 'Failed to create user',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            } catch (error) {
                MySwal.fire({
                    title: 'Error!',
                    text: error.message || 'An unexpected error occurred',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    const handleCancel = () => {
        setFormData({
            firstName: '',
            lastName: '',
            password: '',
            address: '',
            emailAddress: '',
            mobileNumber: '',
            isActive: true,
            createdDate: new Date().toISOString(),
            userRoleDto: null,
            branchDto: null
        });
        setSelectedRole(null);
        setSelectedBranch(null);
        setErrors({});
    };

    const isManagerLoggedIn = () => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            const decodedToken = decodeJwt(accessToken);
            return decodedToken?.roles[0]?.authority === "ROLE_MANAGER";
        }
        return false;
    };

    return (
        <div>
            {/* Add User */}
            <div className="modal fade" id="add-units">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Add User</h4>
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
                                            {/* <div className="col-lg-12">
                                                <div className="new-employee-field">
                                                    <span>Avatar</span>
                                                    <div className="profile-pic-upload mb-2">
                                                        <div className="profile-pic">
                                                            <span>
                                                                <PlusCircle className="plus-down-add" />
                                                                Profile Photo
                                                            </span>
                                                        </div>
                                                        <div className="input-blocks mb-0">
                                                            <div className="image-upload mb-0">
                                                                <input type="file" />
                                                                <div className="image-uploads">
                                                                    <h4>Change Image</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
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
                                            <div className="col-lg-6">
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
                                                        placeholder={isManagerLoggedIn() ? "USER" : "Choose Role"}
                                                        isSearchable={true}
                                                        isDisabled={isManagerLoggedIn()}
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
                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>Password</label>
                                                    <div className="pass-group">
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            className="pass-input"
                                                            name="password"
                                                            value={formData.password}
                                                            onChange={handleInputChange}
                                                            placeholder="Enter your password"
                                                        />
                                                        <span
                                                            className={`fas toggle-password ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        />
                                                    </div>
                                                    {errors.password && <span className="error-message text-danger">{errors.password}</span>}
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>Confirm Password</label>
                                                    <div className="pass-group">
                                                        <input
                                                            type={showConfirmPassword ? 'text' : 'password'}
                                                            className="pass-input"
                                                            name="confirmPassword"
                                                            value={formData.confirmPassword}
                                                            onChange={handleInputChange}
                                                            placeholder="Confirm password"
                                                        />
                                                        <span
                                                            className={`fas toggle-password ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                                                            onClick={() => setConfirmPassword(!showConfirmPassword)}
                                                        />
                                                    </div>
                                                    {errors.confirmPassword && <span className="error-message text-danger">{errors.confirmPassword}</span>}
                                                </div>
                                            </div>
                                            {/* <div className="col-lg-12">
                                                <div className="mb-0 input-blocks">
                                                    <label className="form-label">Descriptions</label>
                                                    <textarea
                                                        className="form-control mb-1"
                                                        defaultValue={"Type Message"}
                                                    />
                                                    <p>Maximum 600 Characters</p>
                                                </div>
                                            </div> */}
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
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Add User */}
        </div>
    )
}

AddUsers.propTypes = {
    onUpdate: PropTypes.func
};

AddUsers.defaultProps = {
    onUpdate: () => {}
};

export default AddUsers
