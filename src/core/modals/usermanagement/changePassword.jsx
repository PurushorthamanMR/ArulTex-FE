import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import axios from 'axios';
import { updatePassword, decodeJwt } from '../../../feature-module/Api/UserApi';
import { BASE_BACKEND_URL } from '../../../feature-module/Api/config';

const ChangePassword = ({ user, onUpdate }) => {
    const MySwal = withReactContent(Swal);
    
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });

    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });

    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: ''
    });

    const togglePasswordVisibility = (field) => {
        setShowPassword(prevShowPassword => ({
            ...prevShowPassword,
            [field]: !prevShowPassword[field]
        }));
    };

    useEffect(() => {
        if (user) {
            setFormData({
                password: '',
                confirmPassword: '',
            });
            setPasswordError('');
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'password' || name === 'confirmPassword') {
            const newFormData = {
                ...formData,
                [name]: value
            };
            setFormData(newFormData);
            
            const newErrors = { ...errors };
            
            if (name === 'password') {
                if (!value) {
                    newErrors.password = 'Password is required';
                } else if (value.length < 6) {
                    newErrors.password = 'Password must be at least 6 characters long';
                } else {
                    newErrors.password = '';
                }
                
                if (newFormData.confirmPassword && value !== newFormData.confirmPassword) {
                    newErrors.confirmPassword = 'Passwords do not match';
                } else if (newFormData.confirmPassword) {
                    newErrors.confirmPassword = '';
                }
            }
            
            if (name === 'confirmPassword') {
                if (!value) {
                    newErrors.confirmPassword = 'Please confirm your password';
                } else if (value !== newFormData.password) {
                    newErrors.confirmPassword = 'Passwords do not match';
                } else {
                    newErrors.confirmPassword = '';
                }
            }
            
            setErrors(newErrors);
            setPasswordError('');
        }
    };

    const validatePasswords = () => {
        let isValid = true;
        const newErrors = {
            password: '',
            confirmPassword: ''
        };

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            isValid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validatePasswords()) {
            return;
        }

        try {
            const accessToken = localStorage.getItem("accessToken");
            const decodedToken = decodeJwt(accessToken);
            
            const loggedInUserEmail = decodedToken.sub;

            try {
                const response = await axios.get(
                    `${BASE_BACKEND_URL}/user/getByEmailAddress?emailAddress=${loggedInUserEmail}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                const loggedInUserId = response.data.responseDto[0]?.id;

                if (!loggedInUserId || !user?.id) {
                    MySwal.fire({
                        title: 'Error!',
                        text: 'User information is missing.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                    return;
                }

                MySwal.fire({
                    title: 'Are you sure?',
                    text: "You want to update this user's password?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, update it!',
                    cancelButtonText: 'No, cancel!',
                    confirmButtonColor: '#00ff00',
                    cancelButtonColor: '#ff0000',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            const response = await updatePassword(
                                parseInt(user.id),         
                                formData.password,         
                                parseInt(loggedInUserId)  
                            );
                            
                            if (response && response.status === true) {
                                document.querySelector('#change-password button[data-bs-dismiss="modal"]').click();

                                MySwal.fire({
                                    title: 'Updated!',
                                    text: 'Password has been updated successfully.',
                                    icon: 'success',
                                    confirmButtonText: 'OK',
                                    customClass: {
                                        confirmButton: 'btn btn-success',
                                    },
                                });
                                
                                setFormData({
                                    password: '',
                                    confirmPassword: '',
                                });
                                
                                onUpdate();
                            } else {
                                MySwal.fire({
                                    title: 'Update Failed',
                                    text: response?.errorDescription || 'Failed to update password',
                                    icon: 'error',
                                    confirmButtonText: 'OK',
                                });
                            }
                        } catch (error) {
                            console.error('Error updating password:', error);
                            MySwal.fire({
                                title: 'Error!',
                                text: 'Failed to update password. Please check the console for details.',
                                icon: 'error',
                                confirmButtonText: 'OK',
                            });
                        }
                    }
                });
            } catch (error) {
                console.error('Error getting logged-in user ID:', error);
                MySwal.fire({
                    title: 'Error!',
                    text: 'Failed to get logged-in user information.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            MySwal.fire({
                title: 'Error!',
                text: 'Something went wrong.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleClose = () => {
        setFormData({
            password: '',
            confirmPassword: '',
        });
        setErrors({
            password: '',
            confirmPassword: ''
        });
        setPasswordError('');
    };

    return (
        <div className="modal fade" id="change-password">
            <div className="modal-dialog modal-dialog-centered custom-modal-two">
                <div className="modal-content">
                    <div className="page-wrapper-new p-0">
                        <div className="content">
                            <div className="modal-header border-0 custom-modal-header">
                                <div className="page-title">
                                    <h4>Change Password</h4>
                                </div>
                                <button
                                    type="button"
                                    className="close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleClose}
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body custom-modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="input-blocks">
                                                <label>New Password</label>
                                                <div className="input-group">
                                                    <input
                                                        type={showPassword.password ? "text" : "password"}
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        placeholder="Enter new password"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => togglePasswordVisibility('password')}
                                                    >
                                                        <i className={`fa ${showPassword.password ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                                    </button>
                                                </div>
                                                {errors.password && (
                                                    <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                                                        {errors.password}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="input-blocks">
                                                <label>Confirm Password</label>
                                                <div className="input-group">
                                                    <input
                                                        type={showPassword.confirmPassword ? "text" : "password"}
                                                        name="confirmPassword"
                                                        value={formData.confirmPassword}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        placeholder="Confirm new password"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => togglePasswordVisibility('confirmPassword')}
                                                    >
                                                        <i className={`fa ${showPassword.confirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                                    </button>
                                                </div>
                                                {errors.confirmPassword && (
                                                    <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                                                        {errors.confirmPassword}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {passwordError && (
                                            <div className="col-lg-12">
                                                <div className="alert alert-danger">
                                                    {passwordError}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="modal-footer-btn">
                                        <button
                                            type="button"
                                            className="btn btn-cancel me-2"
                                            data-bs-dismiss="modal"
                                            onClick={handleClose}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-submit">
                                            Update Password
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

ChangePassword.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        mobileNumber: PropTypes.string,
        emailAddress: PropTypes.string,
        address: PropTypes.string,
        createdDate: PropTypes.string,
        isActive: PropTypes.bool,
        userRoleDto: PropTypes.shape({
            userRole: PropTypes.string,
            id: PropTypes.number,
            isActive: PropTypes.bool
        })
    }),
    onUpdate: PropTypes.func.isRequired
};

ChangePassword.defaultProps = {
    user: null
};

export default ChangePassword;
