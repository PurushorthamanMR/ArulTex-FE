import React, { useEffect, useState } from 'react';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ChevronUp, PlusCircle, RotateCcw } from 'feather-icons-react/build/IconComponents';
import { useDispatch, useSelector } from 'react-redux';
import { setToogleHeader } from '../../core/redux/action';
import AddSubcategory from '../../core/modals/inventory/addsubcategory';
import EditSubcategories from './editsubcategories';
import Swal from 'sweetalert2';
import Table from '../../core/pagination/datatable';
import { fetchTaxesPages, updateTaxStatus } from '../Api/TaxApi';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import "../../style/scss/pages/_categorylist.scss";

const SubCategories = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);
    const [taxes, setTaxes] = useState([]);
    const [selectedTax, setSelectedTax] = useState(null);
    const [togglingId, setTogglingId] = useState(null);
    const [showActive, setShowActive] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            loadTaxes();
        }
    }, [showActive, currentPage, pageSize]);

    const loadInitialData = async () => {
        setIsLoading(true);
        await loadTaxes();
        setIsLoading(false);
    };

    const loadTaxes = async () => {
        try {
            setIsLoading(true);
            const response = await fetchTaxesPages(currentPage, pageSize, showActive);
            if (response && response.responseDto) {
                setTaxes(response.responseDto.payload || []);
                setTotalRecords(response.responseDto.totalRecords);
            } else {
                setTaxes([]);
                setTotalRecords(0);
            }
        } catch (error) {
            setTaxes([]);
            setTotalRecords(0);
            Swal.fire({
                title: "Error!",
                text: "Failed to fetch taxes: " + error.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleTableChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const onShowSizeChange = (current, size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    const handleToggleStatus = (taxId, currentStatus) => {
        setTogglingId(taxId);
        const newStatusText = currentStatus ? 'Inactive' : 'Active';

        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to change this tax to ${newStatusText}?`,
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
                    const response = await updateTaxStatus(taxId, newStatus);
                    if (response) {
                        loadTaxes();
                    } else {
                        Swal.fire('Error', 'Failed to update tax status', 'error');
                    }
                } catch (error) {
                    Swal.fire('Error', 'Something went wrong', 'error');
                }
            }
            setTogglingId(null);
        });
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text(`Tax List (${showActive ? 'Active' : 'Inactive'})`, 20, 10);
        const tableData = taxes.map(tax => [tax.taxPercentage || 'N/A']);
        autoTable(doc, {
            head: [['Tax Percentage']],
            body: tableData,
            startY: 20,
        });
        doc.save(`tax_list_${showActive ? 'active' : 'inactive'}.pdf`);

    };

    const exportToExcel = () => {
        const worksheetData = taxes.map(tax => ({
            'Tax Percentage': tax.taxPercentage || 'N/A',
        }));
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Taxes');
        XLSX.writeFile(workbook, `tax_list_${showActive ? 'active' : 'inactive'}.xlsx`);
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
        <Tooltip id="refresh-tooltip" {...props}>Collapse</Tooltip>
    );

    const handleEdit = (tax) => {
        setSelectedTax(tax);
    };

    const columns = [
        {
            title: 'Tax Percentage',
            dataIndex: 'taxPercentage',
            render: (text) => <Link to="#">{text}</Link>,
            sorter: (a, b) => (a.taxPercentage || 0) - (b.taxPercentage || 0),
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
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
            key: 'actions',
            render: (_, record) => (
                <td className="action-table-data">
                    <div className="edit-delete-action">
                        <Link
                            className="me-2 p-2"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-tax"
                            onClick={() => handleEdit(record)}
                        >
                            <i data-feather="edit" className="feather-edit"></i>
                        </Link>
                    </div>
                </td>
            ),
        },
    ];

    const handleTaxCreated = () => {
        loadTaxes();
    };

    if (isLoading) {
        return (
            <div className="page-wrapper">
                {/* You can add a loading spinner or message here if desired */}
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
                                <h4>Tax List</h4>
                                <h6>Manage your tax percentage</h6>
                            </div>
                            <div className="status-toggle-btns mt-2">
                                <div className="btn-group" role="group">
                                    <button
                                        type="button"
                                        className={`btn ${showActive ? 'btn-primary active' : 'btn-outline-primary'}`}
                                        onClick={() => {
                                            setShowActive(true);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        Active
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn ${!showActive ? 'btn-primary active' : 'btn-outline-primary'}`}
                                        onClick={() => {
                                            setShowActive(false);
                                            setCurrentPage(1);
                                        }}
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
                                    <Link onClick={() => loadTaxes()}>
                                        <RotateCcw />
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            <li>
                                <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                                    <Link
                                        id="collapse-header"
                                        className={data ? 'active' : ''}
                                        onClick={() => dispatch(setToogleHeader(!data))}
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
                                data-bs-target="#add-tax"
                            >
                                <PlusCircle className="me-2" />
                                Add New
                            </Link>
                        </div>
                    </div>
                    <div className="card table-list-card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <Table
                                    className="table datanew"
                                    columns={columns}
                                    dataSource={taxes}
                                    rowKey={(record) => record.id}
                                    pagination={{
                                        current: currentPage,
                                        pageSize: pageSize,
                                        total: totalRecords,
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
            <AddSubcategory onTaxCreated={handleTaxCreated} />
            <EditSubcategories
                selectedTax={selectedTax}
                onTaxUpdated={loadTaxes}
            />
        </div>
    );
};

export default SubCategories;