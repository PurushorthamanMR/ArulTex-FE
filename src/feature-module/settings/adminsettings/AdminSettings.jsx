import React, { useEffect, useState } from 'react';
import { getAllPendingDevices, approveDevice, declineDevice, getAllDevices, blockDevice, updateTillName } from '../../Api/DeviceAuthApi';
import { getAllManagerToggles, updateManagerToggleAdminStatus, saveManagerToggle, updateManagerToggleStatus, updateManagerToggle } from '../../Api/ManagerToggle';
import Table from "../../../core/pagination/datatable";
import { Edit, RotateCcw, ChevronUp, PlusCircle } from "feather-icons-react/build/IconComponents";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../../core/img/imagewithbasebath';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import Swal from 'sweetalert2';
import './AdminSetting.scss';
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../../core/redux/action";

const AdminSettings = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const [pendingDevices, setPendingDevices] = useState([]);
  const [allDevices, setAllDevices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [access, setAccess] = useState('');
  const [saving, setSaving] = useState(false);
  const [showActive, setShowActive] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pendingDevicesError, setPendingDevicesError] = useState(false);
  const [allDevicesError, setAllDevicesError] = useState(false);
  const [isPendingEdit, setIsPendingEdit] = useState(false);
  const [managerToggles, setManagerToggles] = useState([]);
  const [showAddToggleModal, setShowAddToggleModal] = useState(false);
  const [newToggleAction, setNewToggleAction] = useState('');
  const [toggleActionError, setToggleActionError] = useState('');
  const [isEditingTillName, setIsEditingTillName] = useState(false);
  const [editedTillName, setEditedTillName] = useState('');
  const [showUpdateToggleModal, setShowUpdateToggleModal] = useState(false);
  const [editingToggle, setEditingToggle] = useState(null);
  const [editedAction, setEditedAction] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          fetchPendingDevices(),
          fetchAllDevices(),
          fetchManagerToggles()
        ]);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const fetchManagerToggles = async () => {
    try {
      setIsLoading(true);
      const response = await getAllManagerToggles();
      if (response && response.status) {
        setManagerToggles([...response.responseDto].reverse());
      }
    } catch (error) {
      console.error('Error fetching manager toggles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleChange = async (id, currentStatus) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to change this admin toggle status?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change it!',
        cancelButtonText: 'No, cancel',
        customClass: {
          container: 'swal-container-class',
          popup: 'swal-popup-class',
          header: 'swal-header-class',
          title: 'swal-title-class',
          closeButton: 'swal-close-button-class',
          icon: 'swal-icon-class',
          image: 'swal-image-class',
          content: 'swal-content-class',
          input: 'swal-input-class',
          actions: 'swal-actions-class',
          confirmButton: 'swal-confirm-button-class',
          cancelButton: 'swal-cancel-button-class',
          footer: 'swal-footer-class'
        },
        backdrop: true,
        allowOutsideClick: false,
        allowEscapeKey: true,
        allowEnterKey: true,
        focusConfirm: false
      });

      if (result.isConfirmed) {
        const newStatus = !currentStatus;
        await updateManagerToggleAdminStatus(id, newStatus);
        setManagerToggles(prevToggles => 
          prevToggles.map(toggle => 
            toggle.id === id ? { ...toggle, adminActive: newStatus } : toggle
          )
        );
        Swal.fire({
          title: "Success!",
          text: "Admin toggle status has been updated successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error('Error updating toggle status:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update admin toggle status: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
        customClass: { confirmButton: "btn btn-danger" },
      });
    }
  };

  const handleToggleStatusChange = async (id, currentStatus) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to change this manager toggle status?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change it!',
        cancelButtonText: 'No, cancel',
        customClass: {
          container: 'swal-container-class',
          popup: 'swal-popup-class',
          header: 'swal-header-class',
          title: 'swal-title-class',
          closeButton: 'swal-close-button-class',
          icon: 'swal-icon-class',
          image: 'swal-image-class',
          content: 'swal-content-class',
          input: 'swal-input-class',
          actions: 'swal-actions-class',
          confirmButton: 'swal-confirm-button-class',
          cancelButton: 'swal-cancel-button-class',
          footer: 'swal-footer-class'
        },
        backdrop: true,
        allowOutsideClick: false,
        allowEscapeKey: true,
        allowEnterKey: true,
        focusConfirm: false
      });

      if (result.isConfirmed) {
        const newStatus = !currentStatus;
        await updateManagerToggleStatus(id, newStatus);
        fetchManagerToggles(); // Refresh the data
        Swal.fire({
          title: "Success!",
          text: "Manager toggle status has been updated successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error('Error updating manager toggle status:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update manager toggle status: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
        customClass: { confirmButton: "btn btn-danger" },
      });
    }
  };

  const fetchPendingDevices = async () => {
    try {
      setIsLoading(true);
      const response = await getAllPendingDevices();
      setPendingDevicesError(false);
      if (response && response.status) {
        setPendingDevices(response.responseDto);
      }
    } catch (error) {
      setPendingDevicesError(true);
      setPendingDevices([]);
      console.error('Error fetching pending devices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllDevices = async () => {
    try {
      setIsLoading(true);
      const response = await getAllDevices();
      setAllDevicesError(false);
      if (response && response.status) {
        setAllDevices(response.responseDto);
      }
    } catch (error) {
      setAllDevicesError(true);
      console.error('Error fetching all devices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (device, fromPending = false, e) => {
    e.preventDefault(); // Prevent default anchor behavior
    setSelectedDevice(device);
    setAccess('');
    setModalVisible(true);
    setIsPendingEdit(fromPending);
  };

  const handleAccessChange = (e) => {
    setAccess(e.target.value);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedDevice(null);
    setAccess('');
    setIsEditingTillName(false);
    setEditedTillName('');
  };

  const handleSave = async () => {
    if (!selectedDevice || !access) return;

    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to change this device's access to ${access}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change it!',
        cancelButtonText: 'No, cancel',
        customClass: {
          container: 'swal-container-class',
          popup: 'swal-popup-class',
          header: 'swal-header-class',
          title: 'swal-title-class',
          closeButton: 'swal-close-button-class',
          icon: 'swal-icon-class',
          image: 'swal-image-class',
          content: 'swal-content-class',
          input: 'swal-input-class',
          actions: 'swal-actions-class',
          confirmButton: 'swal-confirm-button-class',
          cancelButton: 'swal-cancel-button-class',
          footer: 'swal-footer-class'
        },
        backdrop: true,
        allowOutsideClick: false,
        allowEscapeKey: true,
        allowEnterKey: true,
        focusConfirm: false
      });

      if (result.isConfirmed) {
        setSaving(true);
        try {
          if (access === 'Approved') {
            await approveDevice(selectedDevice.id);
          } else if (access === 'Declined') {
            await declineDevice(selectedDevice.id);
          } else if (access === 'Block') {
            await blockDevice(selectedDevice.id);
          }
          setPendingDevices(prev => prev.filter(d => d.id !== selectedDevice.id));
          await Promise.all([
            fetchPendingDevices(),
            fetchAllDevices()
          ]);
          handleModalClose();
          Swal.fire({
            title: "Success!",
            text: "Device access has been updated successfully.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to update device access: " + error.message,
            icon: "error",
            confirmButtonText: "OK",
            customClass: { confirmButton: "btn btn-danger" },
          });
        }
      }
    } catch (error) {
      console.error('Error in handleSave:', error);
    } finally {
      setSaving(false);
    }
  };

  const validateToggleAction = (action) => {
    if (!action.trim()) {
      return 'Please type the action name';
    }

    // Check for duplicate action (case-insensitive)
    const normalizedInput = action.trim().toLowerCase();
    const isDuplicate = managerToggles.some(
      toggle => toggle.action.toLowerCase() === normalizedInput
    );

    if (isDuplicate) {
      return 'This action already exists';
    }

    // Check for similar actions (fuzzy match)
    const similarActions = managerToggles.filter(
      toggle => {
        const normalizedToggle = toggle.action.toLowerCase();
        return (
          normalizedToggle.includes(normalizedInput) ||
          normalizedInput.includes(normalizedToggle)
        );
      }
    );

    if (similarActions.length > 0) {
      return `Similar actions exist: ${similarActions.map(t => t.action).join(', ')}`;
    }

    return '';
  };

  const handleAddToggle = async () => {
    const error = validateToggleAction(newToggleAction);
    if (error) {
      setToggleActionError(error);
      return;
    }

    try {
      await saveManagerToggle(newToggleAction.trim());
      setNewToggleAction('');
      setToggleActionError('');
      setShowAddToggleModal(false);
      fetchManagerToggles(); // Refresh the toggles list
    } catch (error) {
      console.error('Error adding new toggle:', error);
      setToggleActionError('Failed to add new toggle');
    }
  };

  const handleCloseAddToggleModal = (e) => {
    e.preventDefault();
    setShowAddToggleModal(false);
    setNewToggleAction('');
    setToggleActionError('');
  };

  const handleEditTillName = () => {
    setIsEditingTillName(true);
    setEditedTillName(selectedDevice.tillName);
  };

  const handleSaveTillName = async () => {
    // Check for duplicate till name
    const isDuplicate = allDevices.some(device => 
      device.id !== selectedDevice.id && 
      device.tillName.toLowerCase() === editedTillName.toLowerCase()
    );

    if (isDuplicate) {
      Swal.fire({
        title: "Error!",
        text: "This till name already exists. Please choose a different name.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: { confirmButton: "btn btn-danger" },
      });
      return;
    }

    try {
      await updateTillName(selectedDevice.id, editedTillName);
      await Promise.all([fetchAllDevices(), fetchPendingDevices()]);
      setIsEditingTillName(false);
      Swal.fire({
        title: "Success!",
        text: "Till name has been updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update till name: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
        customClass: { confirmButton: "btn btn-danger" },
      });
    }
  };

  const handleCancelTillNameEdit = () => {
    setIsEditingTillName(false);
    setEditedTillName('');
  };

  const handleEditToggle = (toggle) => {
    setEditingToggle(toggle);
    setEditedAction(toggle.action);
  };

  const handleSaveToggle = async (e) => {
    e.preventDefault();
    
    // Check for duplicate action (case-insensitive)
    const normalizedInput = editedAction.trim().toLowerCase();
    const isDuplicate = managerToggles.some(
      toggle => 
        toggle.id !== editingToggle.id && 
        toggle.action.toLowerCase() === normalizedInput
    );

    if (isDuplicate) {
      Swal.fire({
        title: "Error!",
        text: "This action name already exists. Please choose a different name.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: { confirmButton: "btn btn-danger" },
      });
      return;
    }

    try {
      await updateManagerToggle(editingToggle.id, editedAction, editingToggle.isActive, editingToggle.adminActive);
      await fetchManagerToggles();
      setEditingToggle(null);
      setEditedAction('');
      Swal.fire({
        title: "Success!",
        text: "Toggle has been updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error updating toggle:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update toggle: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
        customClass: { confirmButton: "btn btn-danger" },
      });
    }
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    setEditingToggle(null);
    setEditedAction('');
  };

  const columns = [
    {
      title: 'Till Name',
      dataIndex: 'tillName',
      key: 'tillName',
      sorter: (a, b) => a.tillName.localeCompare(b.tillName),
    },
    {
      title: 'Till ID',
      dataIndex: 'tillId',
      key: 'tillId',
      sorter: (a, b) => a.tillId.localeCompare(b.tillId),
    },
    {
      title: 'Approve Status',
      dataIndex: 'approveStatus',
      key: 'approveStatus',
      sorter: (a, b) => a.approveStatus.localeCompare(b.approveStatus),
      render: (status) => (
        <span className={`admin-status-badge ${
          status === 'Pending' ? 'pending' :
          status === 'Approved' ? 'approved' :
          status === 'Declined' ? 'declined' : ''
        }`}>
          {status}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <a 
              className="me-2 p-2" 
              href="#" 
              onClick={(e) => handleEditClick(record, true, e)}
            >
              <Edit className="feather-edit" />
            </a>
          </div>
        </td>
      ),
    },
  ];

  const allDevicesColumns = [
    {
      title: 'Till Name',
      dataIndex: 'tillName',
      key: 'tillName',
      sorter: (a, b) => a.tillName.localeCompare(b.tillName),
    },
    {
      title: 'Till ID',
      dataIndex: 'tillId',
      key: 'tillId',
      sorter: (a, b) => a.tillId.localeCompare(b.tillId),
    },
    {
      title: 'Approve Status',
      dataIndex: 'approveStatus',
      key: 'approveStatus',
      sorter: (a, b) => a.approveStatus.localeCompare(b.approveStatus),
      render: (status) => (
        <span className={`admin-status-badge ${
          status === 'Pending' ? 'pending' :
          status === 'Approved' ? 'approved' :
          status === 'Declined' ? 'declined' : ''
        }`}>
          {status}
        </span>
      ),
    },
    {
      title: 'Login Status',
      dataIndex: 'loginStatus',
      key: 'loginStatus',
      sorter: (a, b) => a.loginStatus.localeCompare(b.loginStatus),
      render: (status) => (
        <span className={`admin-status-badge ${status === 'True' ? 'approved' : 'declined'}`}>{status}</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <a 
              className="me-2 p-2" 
              href="#" 
              onClick={(e) => handleEditClick(record, false, e)}
            >
              <Edit className="feather-edit" />
            </a>
          </div>
        </td>
      ),
    },
  ];

  const filteredDevices = allDevices
    .filter(device =>
      showActive
        ? device.isActive === "1" || device.isActive === 1 || device.isActive === true
        : device.isActive === "0" || device.isActive === 0 || device.isActive === false
    )
    .reverse();

  const reversedPendingDevices = [...pendingDevices].reverse();

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Pending Till", 14, 15);

    // Pending Till Table
    if (pendingDevices && pendingDevices.length > 0) {
      autoTable(doc, {
        head: [["Till Name", "Approve Status"]],
        body: pendingDevices.map(d => [d.tillName, d.approveStatus]),
        startY: 20,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      });
    }

    // All Devices Table
    let y = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 40;
    doc.text("All Devices", 14, y);
    if (allDevices && allDevices.length > 0) {
      autoTable(doc, {
        head: [["Till Name", "Approve Status", "Login Status"]],
        body: allDevices.map(d => [d.tillName, d.approveStatus, d.loginStatus]),
        startY: y + 5,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      });
    }

    doc.save("admin_settings.pdf");
  };

  const exportToExcel = () => {
    const ws_data = [];

    // Pending Till Section
    ws_data.push(["Pending Till"]);
    ws_data.push(["Till Name", "Approve Status"]);
    pendingDevices.forEach(d => {
      ws_data.push([d.tillName, d.approveStatus]);
    });

    // Blank row as separator
    ws_data.push([]);

    // All Devices Section
    ws_data.push(["All Devices"]);
    ws_data.push(["Till Name", "Approve Status", "Login Status"]);
    allDevices.forEach(d => {
      ws_data.push([d.tillName, d.approveStatus, d.loginStatus]);
    });

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Admin Settings");
    XLSX.writeFile(wb, "admin_settings.xlsx");
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchAllDevices(), fetchPendingDevices()]);
    setRefreshing(false);
  };

  const renderTooltip = (msg) => (
    <Tooltip>{msg}</Tooltip>
  );

  const getCardClass = (action) => {
    if (!action) return 'default-card';
    
    const normalizedAction = action.toLowerCase().trim();
    const firstWord = normalizedAction.split(' ')[0];

    // Direct matches
    if (normalizedAction === 'age validation') return 'age-validation';
    if (['manual discount', 'employee discount'].includes(normalizedAction)) return 'discount';
    if (normalizedAction === 'add customer') return 'customer';
    if (normalizedAction === 'non scan product') return 'non-scan';
    if (normalizedAction === 'minimum banking') return 'banking';
    if (normalizedAction === 'tax') return 'tax';
    if (normalizedAction === 'under maintenance') return 'maintenance';

    // Fallback to first word matching
    if (['manual', 'discount'].includes(firstWord)) return 'discount';
    if (firstWord === 'customer') return 'customer';
    if (firstWord === 'tax') return 'tax';
    if (firstWord === 'banking') return 'banking';
    if (firstWord === 'age') return 'age-validation';

    return 'default-card';
  };

  const handleCloseUpdateModal = (e) => {
    e.preventDefault();
    setShowUpdateToggleModal(false);
    setEditingToggle(null);
    setEditedAction('');
  };

  if (isLoading) {
    return <div className="page-wrapper">{/* Add loading spinner or message here if desired */}</div>;
  }

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex flex-column">
            <div className="page-title">
              <h4>Admin Settings</h4>
              <h6>Manage your admin settings</h6>
            </div>
          </div>
          <ul className="table-top-head">
            <li>
              <OverlayTrigger placement="top" overlay={renderTooltip('Pdf')}>
                <Link to="#" onClick={exportToPDF}>
                  <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderTooltip('Excel')}>
                <Link to="#" onClick={exportToExcel}>
                  <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderTooltip('Refresh')}>
                <Link to="#" onClick={handleRefresh} disabled={refreshing}>
                  <RotateCcw className={refreshing ? "refresh-rotating" : ""} />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderTooltip('Collapse')}>
                <Link
                  id="collapse-header"
                  className={data ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setToogleHeader(!data));
                  }}
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
              onClick={() => setShowAddToggleModal(true)}
            >
              <PlusCircle className="me-2 iconsize" />
              Add Toggle
            </Link>
          </div>
        </div>

        {/* Pending Till Card - Always at top */}
        {!pendingDevicesError && pendingDevices && pendingDevices.length > 0 && (
          <div className="card mb-4">
            <div className="card-body">
              <div className="pending-till-header">
                <div className="header-content">
                  <h5 className="section-title">Pending Till</h5>
                  <p className="section-description">Review and manage pending till approvals</p>
                </div>
              </div>
              <div className="responsive-table-wrapper">
                <Table
                  columns={columns}
                  dataSource={reversedPendingDevices}
                  pagination={{ pageSize: 10 }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Manager Toggles Section */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="admin-toggles-header">
              <div className="header-content">
                <h5 className="section-title">Admin Toggles</h5>
                <p className="section-description">Manage and update your admin toggle settings</p>
              </div>
              <div className="header-actions">
                <button 
                  className="btn btn-primary btn-update"
                  onClick={() => setShowUpdateToggleModal(true)}
                >
                  <Edit className="me-2" size={16} />
                  Update Toggles
                </button>
              </div>
            </div>
            <div className="row">
              {/* Other Toggles - Now showing all toggles without pagination */}
              {managerToggles
                .sort((a, b) => {
                  // Always put "Minimum Banking" first
                  if (a.action === "Minimum Banking") return -1;
                  if (b.action === "Minimum Banking") return 1;
                  // Then put "Under Maintenance" second
                  if (a.action === "Under Maintenance") return -1;
                  if (b.action === "Under Maintenance") return 1;
                  // Then put "Device Authentication" third
                  if (a.action === "Device Authentication") return -1;
                  if (b.action === "Device Authentication") return 1;
                  return 0;
                })
                .map((toggle) => (
                <div key={toggle.id} className="col-12 mb-3">
                  <div className={`card ${getCardClass(toggle.action)}`}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="card-title mb-0">{toggle.action}</h6>
                          <p className="card-description">
                            {toggle.action?.toLowerCase().includes('minimum banking')
                              ? 'Set minimum banking amount for transactions'
                              : toggle.action?.toLowerCase().includes('age validation') 
                              ? 'Enable age verification for age-restricted products'
                              : toggle.action?.toLowerCase().includes('employee discount')
                              ? 'Enable employee discount functionality'
                              : toggle.action?.toLowerCase().includes('add customer')
                              ? 'Enable add customer button in POS'
                              : toggle.action?.toLowerCase().includes('non scan product')
                              ? 'Show non-scan products in POS'
                              : toggle.action?.toLowerCase().includes('tax')
                              ? 'Enable tax calculation in POS'
                              : toggle.action?.toLowerCase().includes('under maintenance')
                              ? 'Enable maintenance mode for non-admin users'
                              : 'Toggle functionality for this action'}
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-4">
                          {toggle.action !== "Under Maintenance" && toggle.action !== "Minimum Banking" && toggle.action !== "Device Authentication" && (
                            <div className="toggle-wrapper">
                              <span className="toggle-label">Manager</span>
                              <label className="toggle-switch">
                                <input
                                  type="checkbox"
                                  checked={toggle.isActive}
                                  onChange={() => handleToggleStatusChange(toggle.id, toggle.isActive)}
                                />
                                <span className="toggle-slider"></span>
                              </label>
                            </div>
                          )}
                          {toggle.action !== "Minimum Banking" && toggle.action !== "Device Authentication" && (
                            <div className="toggle-wrapper">
                              <span className="toggle-label">Admin</span>
                              <label className="toggle-switch">
                                <input
                                  type="checkbox"
                                  checked={toggle.adminActive}
                                  onChange={() => handleToggleChange(toggle.id, toggle.adminActive)}
                                />
                                <span className="toggle-slider"></span>
                              </label>
                            </div>
                          )}
                          {toggle.action === "Device Authentication" && (
                            <div className="toggle-wrapper">
                              <span className="toggle-label">Admin</span>
                              <label className="toggle-switch">
                                <input
                                  type="checkbox"
                                  checked={toggle.adminActive}
                                  onChange={() => handleToggleChange(toggle.id, toggle.adminActive)}
                                />
                                <span className="toggle-slider"></span>
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All Devices Table */}
        <div className="card">
          <div className="card-body">
            <div className="devices-header">
              <div className="header-content">
                <h5 className="section-title">All Devices</h5>
                <p className="section-description">Manage your device settings and access</p>
              </div>
              <div className="status-toggle-btns">
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className={`btn ${showActive ? 'btn-primary active' : 'btn-outline-primary'}`}
                    onClick={() => setShowActive(true)}
                  >
                    <span className="status-indicator active"></span>
                    Active
                  </button>
                  <button
                    type="button"
                    className={`btn ${!showActive ? 'btn-primary active' : 'btn-outline-primary'}`}
                    onClick={() => setShowActive(false)}
                  >
                    <span className="status-indicator inactive"></span>
                    Inactive
                  </button>
                </div>
              </div>
            </div>
            {!allDevicesError && filteredDevices && filteredDevices.length > 0 ? (
              <div className="responsive-table-wrapper">
                <Table
                  columns={allDevicesColumns}
                  dataSource={filteredDevices}
                  pagination={{ pageSize: 10 }}
                />
              </div>
            ) : (
              <div className="no-data-message">
                <div className="no-data-content">
                  <ImageWithBasePath
                    src="assets/img/icons/no-data.png"
                    alt="img"
                    style={{ width: '24px', height: '24px' }}
                  />
                  <p>No devices found</p>
                </div>
              </div>
            )}
          </div>
        </div>
        {modalVisible && (
          <div className="admin-settings-modal-root">
            <div className="custom-modal-overlay">
              <div className="custom-modal">
                <div className="custom-modal-header">
                  <h4>Edit Device Access</h4>
                  <button className="custom-modal-close" onClick={handleModalClose}>&times;</button>
                </div>
                <div className="custom-modal-body">
                  {selectedDevice && (
                    <>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <label>Till Name:</label>
                          {!isEditingTillName ? (
                            <button 
                              className="btn btn-sm btn-edit-green"
                              onClick={handleEditTillName}
                            >
                              Edit
                            </button>
                          ) : (
                            <div className="d-flex gap-2">
                              <button 
                                className="btn btn-sm btn-primary"
                                onClick={handleSaveTillName}
                              >
                                Save
                              </button>
                              <button 
                                className="btn btn-sm btn-outline-secondary"
                                onClick={handleCancelTillNameEdit}
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                        {isEditingTillName ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editedTillName}
                            onChange={(e) => setEditedTillName(e.target.value)}
                          />
                        ) : (
                          <div>{selectedDevice.tillName}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label>Access:</label>
                        <select value={access} onChange={handleAccessChange} className="custom-select">
                          <option value="" disabled>Select Access</option>
                          <option value="Approved">Approved</option>
                          <option value="Declined">Declined</option>
                          {!isPendingEdit && <option value="Block">Block</option>}
                        </select>
                      </div>
                    </>
                  )}
                </div>
                <div className="custom-modal-footer">
                  <button className="custom-save-btn" onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button className="custom-cancel-btn" onClick={handleModalClose}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Toggle Modal */}
        {showAddToggleModal && (
          <div className="admin-settings-modal-root">
            <div className="custom-modal-overlay">
              <div className="custom-modal">
                <div className="custom-modal-header">
                  <h4>Add New Toggle</h4>
                  <button 
                    type="button"
                    className="custom-modal-close" 
                    onClick={handleCloseAddToggleModal}
                  >
                    &times;
                  </button>
                </div>
                <div className="custom-modal-body">
                  <div className="mb-3">
                    <label>Action Name:</label>
                    <input
                      type="text"
                      className={`form-control ${toggleActionError ? 'is-invalid' : ''}`}
                      value={newToggleAction}
                      onChange={(e) => {
                        const value = e.target.value;
                        setNewToggleAction(value);
                        // Validate on change but don't show error until blur or submit
                        if (value.trim()) {
                          const error = validateToggleAction(value);
                          setToggleActionError(error);
                        } else {
                          setToggleActionError('');
                        }
                      }}
                      onBlur={(e) => {
                        const error = validateToggleAction(e.target.value);
                        setToggleActionError(error);
                      }}
                      placeholder="Enter action name"
                    />
                    {toggleActionError && (
                      <div className="invalid-feedback">
                        {toggleActionError}
                      </div>
                    )}
                  </div>
                </div>
                <div className="custom-modal-footer">
                  <button 
                    type="button"
                    className="custom-save-btn" 
                    onClick={handleAddToggle}
                    disabled={!!toggleActionError}
                  >
                    Save
                  </button>
                  <button 
                    type="button"
                    className="custom-cancel-btn" 
                    onClick={handleCloseAddToggleModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Update Toggle Modal */}
        {showUpdateToggleModal && (
          <div className="admin-settings-modal-root">
            <div className="custom-modal-overlay">
              <div className="custom-modal update-toggles-modal">
                <div className="custom-modal-header">
                  <h4>Update Toggles</h4>
                  <button 
                    type="button"
                    className="custom-modal-close" 
                    onClick={handleCloseUpdateModal}
                  >
                    &times;
                  </button>
                </div>
                <div className="custom-modal-body">
                  <div className="update-toggles-grid">
                    {managerToggles.map((toggle) => (
                      <div key={toggle.id} className={`update-toggle-card ${editingToggle?.id === toggle.id ? 'editing' : ''}`}>
                        <div className="card-content">
                          {editingToggle?.id === toggle.id ? (
                            <div className="edit-mode">
                              <input
                                type="text"
                                className="form-control"
                                value={editedAction}
                                onChange={(e) => setEditedAction(e.target.value)}
                              />
                              <div className="edit-actions">
                                <button 
                                  type="button"
                                  className="btn btn-sm btn-primary"
                                  onClick={handleSaveToggle}
                                >
                                  Save
                                </button>
                                <button 
                                  type="button"
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={handleCancelEdit}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="view-mode">
                              <span className="toggle-name">{toggle.action}</span>
                              <button 
                                type="button"
                                className="btn btn-sm btn-edit-green"
                                onClick={() => handleEditToggle(toggle)}
                              >
                                Edit
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="custom-modal-footer">
                  <button 
                    type="button"
                    className="custom-cancel-btn" 
                    onClick={handleCloseUpdateModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings; 