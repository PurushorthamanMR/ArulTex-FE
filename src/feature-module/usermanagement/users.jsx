import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { ChevronUp, RotateCcw } from 'feather-icons-react/build/IconComponents';
import { setToogleHeader } from '../../core/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { PlusCircle, Edit, Lock } from 'react-feather';
import Select from 'react-select';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Table from '../../core/pagination/datatable';
import AddUsers from '../../core/modals/usermanagement/addusers';
import EditUser from '../../core/modals/usermanagement/edituser';
import { fetchUsers, updateUserStatus, decodeJwt } from '../Api/UserApi';
import { fetchUserRoles } from '../Api/UserRoleApi';
import ChangePassword from '../../core/modals/usermanagement/changePassword';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import * as XLSX from "xlsx";
import "../../style/scss/pages/_categorylist.scss";
import { fetchBranches } from '../Api/BranchApi';

const Users = () => {
    const [userData, setUserData] = useState({ payload: [], totalRecords: 0 });
    const [allUsers, setAllUsers] = useState([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserForPassword, setSelectedUserForPassword] = useState(null);
    const [reversedUsers, setReversedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showActive, setShowActive] = useState(true);
    const [togglingId, setTogglingId] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [roleOptions, setRoleOptions] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [branchOptions, setBranchOptions] = useState([]);
    const [isManager, setIsManager] = useState(false);

    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        checkUserRole();
        loadInitialData();
    }, []);

    useEffect(() => {
        if (!initialLoading) {
            loadUsers();
        }
    }, [currentPage, pageSize, showActive, selectedRole]);

    const checkUserRole = () => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            const decodedToken = decodeJwt(accessToken);
            const userRole = decodedToken?.roles[0]?.authority;
            setIsManager(userRole === "ROLE_MANAGER");
        }
    };

    const loadInitialData = async () => {
        setInitialLoading(true);
        await Promise.all([loadUsers(), loadUserRoles(), loadBranches()]);
        setInitialLoading(false);
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
            
            const formattedRoles = [
                ...filteredRoles.map(role => ({
                    value: role.userRole,
                    label: role.userRole
                }))
            ];
            setRoleOptions(formattedRoles);
        } catch (error) {
            setRoleOptions([{ value: 'all', label: 'All Roles' }]);
        }
    };

    const loadBranches = async () => {
        try {
            const response = await fetchBranches(1, 100, true); // Get active branches with pagination
            console.log('Branch response:', response); // Debug log
            if (response && Array.isArray(response.payload)) {
                const formattedBranches = response.payload
                    .filter(branch => branch && branch.branchName) // Filter out any invalid entries
                    .map(branch => ({
                        value: branch.id,
                        label: branch.branchName
                    }));
                console.log('Formatted branches:', formattedBranches); // Debug log
                setBranchOptions(formattedBranches);
            } else {
                setBranchOptions([]);
                console.error('Invalid branch data received:', response);
            }
        } catch (error) {
            console.error('Error loading branches:', error);
            setBranchOptions([]);
            Swal.fire({
                title: 'Error',
                text: 'Failed to load branches: ' + error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const loadUsers = async () => {
        try {
            setInitialLoading(true);
            const result = await fetchUsers(currentPage, pageSize, showActive);
            const normalizedData = result.payload.map(user => ({
                ...user,
                isActive: user.isActive === true || user.isActive === 1
            }));
            setUserData(result);
            setAllUsers(normalizedData);
            filterData(normalizedData, searchTerm, selectedRole, selectedBranch);
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to fetch users: " + error.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setInitialLoading(false);
        }
    };

    const filterData = (usersData, query, roleFilter, branchFilter) => {
        let filteredData = usersData.filter(user => user.isActive === showActive);

        if (query.trim() !== "") {
            filteredData = filteredData.filter(user =>
                (user.firstName && `${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase())) ||
                (user.emailAddress && user.emailAddress.toLowerCase().includes(query.toLowerCase())) ||
                (user.mobileNumber && user.mobileNumber.toLowerCase().includes(query.toLowerCase()))
            );
        }

        if (roleFilter && roleFilter.value !== 'all') {
            filteredData = filteredData.filter(user =>
                user.userRoleDto?.userRole === roleFilter.value
            );
        }

        if (branchFilter && branchFilter.value) {
            filteredData = filteredData.filter(user =>
                user.branchDto?.id === branchFilter.value
            );
        }

        setReversedUsers(filteredData.reverse());
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        filterData(allUsers, value, selectedRole, selectedBranch);
    };

    const handleRoleChange = (selected) => {
        setSelectedRole(selected);
        filterData(allUsers, searchTerm, selected, selectedBranch);
    };

    const handleBranchChange = (selected) => {
        setSelectedBranch(selected);
        filterData(allUsers, searchTerm, selectedRole, selected);
    };

    const exportToPDF = () => {
        try {
            const doc = new jsPDF();
            doc.text(`User List (${showActive ? 'Active' : 'Inactive'})`, 14, 15);

            const tableColumn = ["Name", "Phone", "Email", "Address", "Role", "Branch"];
            const tableRows = reversedUsers.map(user => [
                `${user.firstName} ${user.lastName}` || "",
                user.mobileNumber || "",
                user.emailAddress || "",
                user.address || "",
                user.userRoleDto?.userRole || "",
                user.branchDto?.branchName || "N/A"
            ]);

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 20,
                theme: 'grid',
                styles: { fontSize: 10 },
                headStyles: { fillColor: [41, 128, 185], textColor: 255 },
            });

            doc.save(`user_list_${showActive ? 'active' : 'inactive'}.pdf`);
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to generate PDF: " + error.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const exportToExcel = () => {
        try {
            if (!reversedUsers || reversedUsers.length === 0) {
                Swal.fire({
                    title: "No Data",
                    text: "There are no users to export",
                    icon: "warning",
                    confirmButtonText: "OK",
                });
                return;
            }

            const worksheetData = reversedUsers.map(user => ({
                "Name": `${user.firstName} ${user.lastName}` || "",
                "Phone": user.mobileNumber || "",
                "Email": user.emailAddress || "",
                "Address": user.address || "",
                "Role": user.userRoleDto?.userRole || "",
                "Branch": user.branchDto?.branchName || "N/A"
            }));

            const worksheet = XLSX.utils.json_to_sheet(worksheetData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

            worksheet["!cols"] = [{ wch: 20 }, { wch: 15 }, { wch: 30 }, { wch: 25 }, { wch: 15 }, { wch: 20 }];

            XLSX.writeFile(workbook, `user_list_${showActive ? 'active' : 'inactive'}.xlsx`);
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to export to Excel: " + error.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const handleToggleStatus = (userId, currentStatus) => {
        setTogglingId(userId);
        const newStatusText = currentStatus ? 'Inactive' : 'Active';

        MySwal.fire({
            title: 'Are you sure?',
            text: `Do you want to change this user to ${newStatusText}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!',
            cancelButtonText: 'No, cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const newStatus = !currentStatus;
                    const response = await updateUserStatus(userId, newStatus);
                    if (response) {
                        await loadUsers();
                        MySwal.fire({
                            title: "Success!",
                            text: `User status changed to ${newStatusText}.`,
                            icon: "success",
                            confirmButtonText: "OK",
                            customClass: { confirmButton: "btn btn-success" },
                        });
                    } else {
                        throw new Error("Failed to update status");
                    }
                } catch (error) {
                    MySwal.fire({
                        title: "Error!",
                        text: "Failed to update user status: " + error.message,
                        icon: "error",
                        confirmButtonText: "OK",
                        customClass: { confirmButton: "btn btn-danger" },
                    });
                }
            }
            setTogglingId(null);
        });
    };

    const columns = [
        {
            title: "Name",
            render: (text, record) => (
                <span className="userimgname">
                    <Link to="#" className="userslist-img bg-img">
                        <ImageWithBasePath alt="" src={record.img} />
                    </Link>
                    <div>
                        <Link to="#">{`${record.firstName} ${record.lastName}`}</Link>
                    </div>
                </span>
            ),
            sorter: (a, b) => (a.firstName + a.lastName).length - (b.firstName + b.lastName).length,
        },
        {
            title: "Phone",
            dataIndex: "mobileNumber",
            sorter: (a, b) => a.mobileNumber.length - b.mobileNumber.length,
        },
        {
            title: "Email",
            dataIndex: "emailAddress",
            sorter: (a, b) => a.emailAddress.length - b.emailAddress.length,
        },
        {
            title: "Address",
            dataIndex: "address",
            sorter: (a, b) => a.address.length - b.address.length,
        },
        {
            title: "Role",
            dataIndex: ["userRoleDto", "userRole"],
            render: (text) => (
                <span className="badge badge-primary">
                    {text}
                </span>
            ),
            sorter: (a, b) => a.userRoleDto.userRole.length - b.userRoleDto.userRole.length,
        },
        {
            title: "Branch",
            dataIndex: ["branchDto", "branchName"],
            render: (text) => (
                <span>
                    {text || 'N/A'}
                </span>
            ),
            sorter: (a, b) => {
                const branchA = a.branchDto?.branchName || '';
                const branchB = b.branchDto?.branchName || '';
                return branchA.localeCompare(branchB);
            },
        },
        {
            title: "Status",
            dataIndex: "isActive",
            render: (isActive, record) => {
                const isAdmin = record.userRoleDto?.userRole === "ADMIN";
                const isManager = record.userRoleDto?.userRole === "MANAGER";
                
                // Get current user's role
                const currentUserRole = decodeJwt(localStorage.getItem("accessToken"))?.roles[0]?.authority;
                
                // Determine if toggle should be disabled
                let shouldDisableToggle = false;
                
                if (currentUserRole === "ROLE_ADMIN") {
                    // Admin can only disable MANAGER and USER roles
                    shouldDisableToggle = isAdmin;
                } else if (currentUserRole === "ROLE_MANAGER") {
                    // Manager can only disable USER roles
                    shouldDisableToggle = isAdmin || isManager;
                } else {
                    // USER cannot disable any roles
                    shouldDisableToggle = true;
                }

                return (
                    <div className={`form-check form-switch ${togglingId === record.id ? 'toggling' : ''}`}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={isActive}
                            onChange={() => handleToggleStatus(record.id, isActive)}
                            disabled={togglingId === record.id || shouldDisableToggle}
                        />
                    </div>
                );
            },
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <td className="action-table-data">
                    <div className="edit-delete-action">
                        <Link
                            className="me-2 p-2"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#change-password"
                            onClick={() => setSelectedUserForPassword(record)}
                        >
                            <Lock className="feather feather-lock action-lock" />
                        </Link>
                        <Link
                            className="me-2 p-2"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-units"
                            onClick={() => setSelectedUser(record)}
                        >
                            <Edit className="feather-edit" />
                        </Link>
                    </div>
                </td>
            )
        },
    ];

    const handleTableChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const onShowSizeChange = (current, size) => {
        setPageSize(size);
        setCurrentPage(1);
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

    if (initialLoading) {
        return (
            <div className="page-wrapper">

            </div>
        );
    }

    return (
        <div>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="add-item d-flex flex-column">
                            <div className="page-title">
                                <h4>User List</h4>
                                <h6>Manage Your Users</h6>
                            </div>
                            <div className="status-toggle-btns mt-2">
                                <div className="btn-group" role="group">
                                    <button
                                        type="button"
                                        className={`btn ${showActive ? 'btn-primary active' : 'btn-outline-primary'}`}
                                        onClick={() => setShowActive(true)}
                                    >
                                        Active
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn ${!showActive ? 'btn-primary active' : 'btn-outline-primary'}`}
                                        onClick={() => setShowActive(false)}
                                    >
                                        Inactive
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ul className="table-top-head">
                            <li>
                                <OverlayTrigger placement="top" overlay={renderTooltip}>
                                    <Link onClick={exportToPDF}>
                                        <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            <li>
                                <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
                                    <Link onClick={exportToExcel}>
                                        <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            <li>
                                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                                    <Link onClick={() => loadUsers()}>
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
                        <div className="page-btn">
                            <a
                                to="#"
                                className="btn btn-added"
                                data-bs-toggle="modal"
                                data-bs-target="#add-units"
                            >
                                <PlusCircle className="me-2" />
                                Add New 
                            </a>
                        </div>
                    </div>
                    <div className="card table-list-card">
                        <div className="card-body">
                            <div className="table-top">
                                <div className="search-set">
                                    <div className="search-path d-flex align-items-center gap-2" style={{ width: '100%' }}>
                                        <div className="search-input">
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                className="form-control form-control-sm formsearch"
                                                value={searchTerm}
                                                onChange={handleSearch}
                                            />
                                            <Link to="#" className="btn btn-searchset">
                                                <i data-feather="search" className="feather-search" />
                                            </Link>
                                        </div>
                                        {!isManager && (
                                            <div style={{ width: '200px' }}>
                                                <Select
                                                    className="select"
                                                    options={roleOptions}
                                                    placeholder="Select Role"
                                                    value={selectedRole}
                                                    onChange={handleRoleChange}
                                                    isClearable
                                                />
                                            </div>
                                        )}
                                        <div style={{ width: '200px' }}>
                                            <Select
                                                className="select"
                                                options={branchOptions}
                                                placeholder="Select Branch"
                                                value={selectedBranch}
                                                onChange={handleBranchChange}
                                                isClearable
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={reversedUsers}
                                    pagination={{
                                        current: currentPage,
                                        pageSize: pageSize,
                                        total: userData.totalRecords,
                                        showSizeChanger: true,
                                        onChange: handleTableChange,
                                        onShowSizeChange: onShowSizeChange,
                                        pageSizeOptions: ["10", "20", "50", "100"],
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddUsers onUpdate={() => loadUsers()} />
            <EditUser user={selectedUser} onUpdate={() => {
                setSelectedUser(null);
                loadUsers();
            }} />
            <ChangePassword user={selectedUserForPassword} onUpdate={() => {
                setSelectedUserForPassword(null);
                loadUsers();
            }} />
        </div>
    );
};

export default Users;