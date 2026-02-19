import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/dist';
import AddBrand from '../../core/modals/inventory/addbrand';
import EditBrand from '../../core/modals/inventory/editbrand';
import Swal from 'sweetalert2';
import Table from '../../core/pagination/datatable'
import Select from 'react-select';
import { ChevronUp, PlusCircle, RotateCcw, StopCircle, Zap, Edit } from 'feather-icons-react/build/IconComponents';
import { DatePicker } from 'antd';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { setToogleHeader } from '../../core/redux/action';
import { fetchPayoutCategories, updatePayoutCategoryStatus } from '../Api/PayoutCategoryApi';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const BrandList = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);
    const [payoutCategories, setPayoutCategories] = useState([]);
    const [togglingId, setTogglingId] = useState(null);
    const [showActive, setShowActive] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            loadPayoutCategories();
        }
    }, [showActive]);

    const loadInitialData = async () => {
        setIsLoading(true);
        await loadPayoutCategories();
        setIsLoading(false);
    };

    const loadPayoutCategories = async () => {
        try {
            setIsLoading(true);
            const categories = await fetchPayoutCategories(1, 10, showActive);
            if (Array.isArray(categories)) {
                setPayoutCategories(categories);
            } else {
                console.error("Categories is not an array:", categories);
                setPayoutCategories([]);
            }
        } catch (error) {
            console.error("Error loading categories:", error);
            setPayoutCategories([]);
            Swal.fire("Error!", "Failed to fetch categories", "error");
        } finally {
            setIsLoading(false);
        }
    };

    // Add a function to handle refresh after any activity
    const handleActivityComplete = async () => {
        try {
            await loadPayoutCategories();
            // Add a small delay to ensure the state is updated
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
            console.error("Error refreshing categories:", error);
            Swal.fire("Error!", "Failed to refresh categories", "error");
        }
    };

    const handleToggleStatus = async (categoryId, currentStatus) => {
        setTogglingId(categoryId);
        const newStatusText = currentStatus ? 'Inactive' : 'Active';

        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to change this category to ${newStatusText}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!',
            cancelButtonText: 'No, cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const newStatus = currentStatus ? 0 : 1;
                    const response = await updatePayoutCategoryStatus(categoryId, newStatus);

                    if (response?.responseDto) {
                        await handleActivityComplete(); // Use the new refresh handler
                        Swal.fire({
                            title: 'Success!',
                            text: `Category status changed to ${newStatusText}`,
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false
                        });
                    } else {
                        throw new Error('Failed to update category status: Invalid response from server');
                    }
                } catch (error) {
                    console.error('Error updating category status:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: error.message || 'Failed to update category status',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                } finally {
                    setTogglingId(null);
                }
            } else {
                setTogglingId(null);
            }
        });
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text(`Payout Categories (${showActive ? 'Active' : 'Inactive'})`, 20, 10);
        const tableData = payoutCategories.map(cat => [cat.payoutCategory, cat.isActive ? 'Active' : 'Inactive']);
        autoTable(doc, {
            head: [['Payout Category', 'Status']],
            body: tableData,
            startY: 20,
        });
        doc.save(`payout_categories_${showActive ? 'active' : 'inactive'}.pdf`);
    };

    const exportToExcel = () => {
        const worksheetData = payoutCategories.map(cat => ({
            'Payout Category': cat.payoutCategory,
            'Status': cat.isActive ? 'Active' : 'Inactive'
        }));
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Categories');
        XLSX.writeFile(workbook, `payout_categories_${showActive ? 'active' : 'inactive'}.xlsx`);
    };


    const brandOptions = [
        { value: 'choose', label: 'Choose Brand' },
        { value: 'lenevo', label: 'Lenevo' },
        { value: 'boat', label: 'Boat' },
        { value: 'nike', label: 'Nike' },
    ];
    const status = [
        { value: 'choose Status', label: 'Choose Status' },
        { value: 'Active', label: 'Active' },
        { value: 'InActive', label: 'InActive' },
    ];


    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const renderTooltip = (props) => (
        <Tooltip id="pdf-tooltip" {...props}>
            Pdf
        </Tooltip>
    );
    const renderExcelTooltip = (props) => (
        <Tooltip id="excel-tooltip" {...props}>
            Excel
        </Tooltip>
    );
    const renderPrinterTooltip = (props) => (
        <Tooltip id="printer-tooltip" {...props}>
            Printer
        </Tooltip>
    );
    const renderRefreshTooltip = (props) => (
        <Tooltip id="refresh-tooltip" {...props}>
            Refresh
        </Tooltip>
    );
    const renderCollapseTooltip = (props) => (
        <Tooltip id="refresh-tooltip" {...props}>
            Collapse
        </Tooltip>
    )
    const columns = [
        {
            title: "Payout Category",
            dataIndex: "payoutCategory",
            sorter: (a, b) => a.payoutCategory.localeCompare(b.payoutCategory),
        },
        {
            title: "Status",
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
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => (
                <td className="action-table-data">
                    <div className="edit-delete-action">
                        <Link
                            className="me-2 p-2"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-brand"
                            onClick={() => setSelectedCategory(record)}
                        >
                            <Edit className="feather-edit" />
                        </Link>
                    </div>
                </td>
            ),
        },
    ];

    const handleCategoryAdded = (newCategory) => {
        setPayoutCategories(prev => [newCategory, ...prev]);
    };

    if (isLoading) {
        return <div className="page-wrapper">{/* Add loading spinner or message here if desired */}</div>;
    }

    return (
        <div>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="add-item d-flex flex-column">
                            <div className="page-title">
                                <h4>Payout Categories</h4>
                                <h6>Manage your payout categories</h6>
                            </div>
                            <div className="status-toggle-btns mt-2">
                                <div className="btn-group" role="group">
                                    <button
                                        type="button"
                                        className={`btn ${showActive ? 'btn-primary active' : 'btn-outline-primary'}`}
                                        onClick={() => setShowActive(true)}>
                                        Active
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn ${!showActive ? 'btn-primary active' : 'btn-outline-primary'}`}
                                        onClick={() => setShowActive(false)}>
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
                                <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>

                                    <Link data-bs-toggle="tooltip" data-bs-placement="top">
                                        <i data-feather="printer" className="feather-printer" />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            <li>
                                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>

                                    <Link data-bs-toggle="tooltip" data-bs-placement="top">
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
                            <Link
                                to="#"
                                className="btn btn-added"
                                data-bs-toggle="modal"
                                data-bs-target="#add-brand"
                            >
                                <PlusCircle className="me-2" />
                                Add New
                            </Link>
                        </div>
                    </div>
                    {/* /product list */}
                    <div className="card table-list-card">
                        <div className="card-body">
                            <div className="table-top">
                                <div className="search-set">
                                    <div className="search-input">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="form-control form-control-sm formsearch"
                                        />
                                        <Link to className="btn btn-searchset">
                                            <i data-feather="search" className="feather-search" />
                                        </Link>
                                    </div>
                                </div>

                            </div>
                            {/* /Filter */}

                            <div
                                className="card"
                                id="filter_inputs"
                            >
                                <div className="card-body pb-0">
                                    <div className="row">
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <Zap className="info-img" />
                                                <Select
                                                    className="select"
                                                    options={brandOptions}
                                                    placeholder="Choose Brand"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">

                                                <div className="input-groupicon">
                                                    <DatePicker
                                                        selected={selectedDate}
                                                        onChange={handleDateChange}
                                                        type="date"
                                                        className="filterdatepicker"
                                                        dateFormat="dd-MM-yyyy"
                                                        placeholder='Choose Date'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="input-blocks">
                                                <i data-feather="stop-circle" className="info-img" />
                                                <StopCircle className="info-img" />
                                                <Select
                                                    className="select"
                                                    options={status}
                                                    placeholder="Choose Brand"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6 col-12 ms-auto">
                                            <div className="input-blocks">
                                                <Link className="btn btn-filters ms-auto">
                                                    {" "}
                                                    <i data-feather="search" className="feather-search" />{" "}
                                                    Search{" "}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* /Filter */}
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={payoutCategories}
                                    rowKey={(record) => record.id}
                                />
                            </div>
                        </div>
                        {/* /product list */}
                    </div>
                </div>
            </div>
            <AddBrand
                refreshCategories={handleActivityComplete}
                onCategoryAdded={handleCategoryAdded}
            />
            <EditBrand
                selectedCategory={selectedCategory}
                refreshCategories={handleActivityComplete}
            />
        </div>
    )
}

export default BrandList;
