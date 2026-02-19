import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { ChevronUp, RotateCcw, PlusCircle, Edit } from 'feather-icons-react/build/IconComponents';
import { setToogleHeader } from '../../core/redux/action';
import Select from 'react-select';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Table from '../../core/pagination/datatable.jsx';
import AddHolidays from '../../core/modals/hrm/addholidays.jsx';
import EditHolidays from '../../core/modals/hrm/editholidays.jsx';
import { fetchHolidays, updateHolidayStatus } from '../Api/HolidayApi.js';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import "../../style/scss/pages/_categorylist.scss";

const Holidays = () => {
    const dispatch = useDispatch();
    const headerToggleState = useSelector((state) => state.toggle_header);
    const [holidays, setHolidays] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedHoliday, setSelectedHoliday] = useState(null);
    const [togglingId, setTogglingId] = useState(null);
    const [showActive, setShowActive] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    const MySwal = withReactContent(Swal);

    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            fetchHolidaysData();
        }
    }, [showActive, currentPage, pageSize]);

    const loadInitialData = async () => {
        setIsLoading(true);
        await fetchHolidaysData();
        setIsLoading(false);
    };

    const fetchHolidaysData = async () => {
        try {
            setIsLoading(true);
            const response = await fetchHolidays(currentPage, pageSize, showActive);
            if (response && response.payload) {
                const normalizedData = response.payload.map(holiday => ({
                    ...holiday,
                    isActive: holiday.isActive === 1 || holiday.isActive === true
                }));
                setHolidays(normalizedData);
                setTotalItems(response.totalRecords || 0);
            } else {
                setHolidays([]);
                setTotalItems(0);
                Swal.fire({
                    title: "Warning!",
                    text: "No holiday data received from the server.",
                    icon: "warning",
                });
            }
        } catch (error) {
            console.error("Error fetching holidays:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to fetch holidays: " + error.message,
                icon: "error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleStatus = (holidayId, currentStatus) => {
        setTogglingId(holidayId);
        const newStatus = currentStatus ? 0 : 1;
        const newStatusText = currentStatus ? 'Inactive' : 'Active';

        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to change this holiday to ${newStatusText}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await updateHolidayStatus(holidayId, newStatus);
                    if (response) {
                        await fetchHolidaysData();
                        Swal.fire({
                            title: "Success!",
                            text: `Holiday status changed to ${newStatusText}.`,
                            icon: "success",
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to update holiday status: " + error.message,
                        icon: "error",
                    });
                }
            }
            setTogglingId(null);
        });
    };

    const statusOptions = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Approved', label: 'Approved' },
        { value: 'Declined', label: 'Declined' },
    ];

    const userOptions = Array.from(
        new Set(holidays.map(holiday => {
            const fullName = holiday.userDto ? `${holiday.userDto.firstName || ''} ${holiday.userDto.lastName || ''}`.trim() : 'N/A';
            return fullName;
        }))
    )
        .filter(name => name !== 'N/A')
        .map(name => ({
            value: name,
            label: name
        }));

    const handleTableChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const onShowSizeChange = (current, size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    const filteredHolidays = holidays
        .filter(holiday =>
            holiday.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(holiday =>
            selectedStatus ? holiday.status === selectedStatus.value : true
        )
        .filter(holiday => {
            if (!selectedUser) return true;
            const fullName = holiday.userDto ? `${holiday.userDto.firstName || ''} ${holiday.userDto.lastName || ''}`.trim() : 'N/A';
            return fullName === selectedUser.value;
        });

    const exportToPDF = () => {
        try {
            const doc = new jsPDF();
            doc.text("Holiday List", 14, 15);
            const tableColumn = ["Description", "Start Date", "End Date", "Status", "User Name"];
            const tableRows = filteredHolidays.map(holiday => [
                holiday.description || "",
                holiday.startDate || "",
                holiday.endDate || "",
                holiday.status || "",
                holiday.userDto ? `${holiday.userDto.firstName || ''} ${holiday.userDto.lastName || ''}`.trim() : 'N/A',
            ]);

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 20,
                theme: 'grid',
                styles: { fontSize: 8 },
                headStyles: { fillColor: [41, 128, 185], textColor: 255 },
            });
            doc.save("holiday_list.pdf");
        } catch (error) {
            MySwal.fire({
                title: "Error!",
                text: "Failed to generate PDF: " + error.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const exportToExcel = () => {
        try {
            if (!filteredHolidays || filteredHolidays.length === 0) {
                MySwal.fire({
                    title: "No Data",
                    text: "There are no holidays to export",
                    icon: "warning",
                    confirmButtonText: "OK",
                });
                return;
            }
            const worksheetData = filteredHolidays.map(holiday => ({
                "Description": holiday.description || "",
                "Start Date": holiday.startDate || "",
                "End Date": holiday.endDate || "",
                "Status": holiday.status || "",
                "User Name": holiday.userDto ? `${holiday.userDto.firstName || ''} ${holiday.userDto.lastName || ''}`.trim() : 'N/A',
            }));
            const worksheet = XLSX.utils.json_to_sheet(worksheetData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Holidays");
            worksheet["!cols"] = [
                { wch: 30 },
                { wch: 15 },
                { wch: 15 },
                { wch: 10 },
                { wch: 20 },
                { wch: 10 }
            ];
            XLSX.writeFile(workbook, "holiday_list.xlsx");
        } catch (error) {
            MySwal.fire({
                title: "Error!",
                text: "Failed to export to Excel: " + error.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const columns = [
        {
            title: "Description",
            dataIndex: "description",
            sorter: (a, b) => a.description.length - b.description.length,
        },
        {
            title: "Start Date",
            dataIndex: "startDate",
            sorter: (a, b) => a.startDate.localeCompare(b.startDate),
        },
        {
            title: "End Date",
            dataIndex: "endDate",
            sorter: (a, b) => a.endDate.localeCompare(b.endDate),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text) => (
                <span className={`badge ${text === 'Approved' ? 'badge-linesuccess' : text === 'Pending' ? 'badge-linewarning' : 'badge-linedanger'}`}>
                    {text}
                </span>
            ),
            sorter: (a, b) => a.status.length - b.status.length,
        },
        {
            title: "User Name",
            dataIndex: "userDto",
            render: (userDto) => {
                const fullName = userDto ? `${userDto.firstName || ''} ${userDto.lastName || ''}`.trim() : '';
                return fullName || 'N/A';
            },
            sorter: (a, b) => {
                const nameA = a.userDto ? `${a.userDto.firstName || ''} ${a.userDto.lastName || ''}`.trim() : '';
                const nameB = b.userDto ? `${b.userDto.firstName || ''} ${b.userDto.lastName || ''}`.trim() : '';
                return nameA.localeCompare(nameB);
            },
        },
        {
            title: "Active",
            dataIndex: "isActive",
            render: (isActive, record) => (
                <div className={`form-check form-switch ${togglingId === record.id ? 'toggling' : ''}`}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isActive}
                        onChange={() => handleToggleStatus(record.id, isActive)}
                        disabled={togglingId === record.id}
                    />
                </div>
            ),
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (_, record) => (
                <td className="action-table-data">
                    <div className="edit-delete-action">
                        <Link
                            className="me-2 p-2"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-department"
                            onClick={() => setSelectedHoliday(record)}
                        >
                            <Edit className="feather-edit" />
                        </Link>
                    </div>
                </td>
            ),
        },
    ];

    const renderTooltip = (props) => <Tooltip id="pdf-tooltip" {...props}>Pdf</Tooltip>;
    const renderExcelTooltip = (props) => <Tooltip id="excel-tooltip" {...props}>Excel</Tooltip>;
    const renderRefreshTooltip = (props) => <Tooltip id="refresh-tooltip" {...props}>Refresh</Tooltip>;
    const renderCollapseTooltip = (props) => <Tooltip id="refresh-tooltip" {...props}>Collapse</Tooltip>;

    if (isLoading) {
        return <div className="page-wrapper">{/* Add loading spinner or message here if desired */}</div>;
      }

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="add-item d-flex flex-column">
                        <div className="page-title">
                            <h4>Staff Leave</h4>
                            <h6>Manage your Staff Leave</h6>
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
                                <Link onClick={() => fetchHolidaysData()}>
                                    <RotateCcw />
                                </Link>
                            </OverlayTrigger>
                        </li>
                        <li>
                            <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                                <Link
                                    id="collapse-header"
                                    className={headerToggleState ? "active" : ""}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(setToogleHeader(!headerToggleState));
                                    }}
                                >
                                    <ChevronUp />
                                </Link>
                            </OverlayTrigger>
                        </li>
                    </ul>
                    <div className="page-btn">
                        <Link
                            className="btn btn-added"
                            data-bs-toggle="modal"
                            data-bs-target="#add-department"
                            onClick={() => setSelectedHoliday(null)}
                        >
                            <PlusCircle className="me-2" />
                            Add New
                        </Link>
                    </div>
                </div>
                <div className="card table-list-card">
                    <div className="card-body pb-0">
                        <div className="table-top">
                            <div className="search-set">
                                <div className="search-path d-flex align-items-center gap-2" style={{ width: '100%' }}>
                                    <div className="search-input">
                                        <input
                                            type="text"
                                            placeholder="Search by description"
                                            className="form-control form-control-sm formsearch"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <Link to="#" className="btn btn-searchset">
                                            <i data-feather="search" className="feather-search" />
                                        </Link>
                                    </div>
                                    <div style={{ width: '200px' }}>
                                        <Select
                                            className="select"
                                            options={statusOptions}
                                            placeholder="Filter by Status"
                                            value={selectedStatus}
                                            onChange={setSelectedStatus}
                                            isClearable
                                        />
                                    </div>
                                    <div style={{ width: '200px' }}>
                                        <Select
                                            className="select"
                                            options={userOptions}
                                            placeholder="Filter by User"
                                            value={selectedUser}
                                            onChange={setSelectedUser}
                                            isClearable
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <Table 
                                columns={columns} 
                                dataSource={filteredHolidays} 
                                rowKey={(record) => record.id}
                                pagination={{
                                    current: currentPage,
                                    pageSize: pageSize,
                                    total: totalItems,
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
            <AddHolidays onSave={() => fetchHolidaysData()} />
            <EditHolidays selectedHoliday={selectedHoliday} onUpdate={() => fetchHolidaysData()} />
        </div>
    );
};

export default Holidays;