import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import ImageWithBasePath from "./img/imagewithbasebath";
import { PlusCircle } from "react-feather";
import { RotateCcw } from "feather-icons-react/build/IconComponents";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ChevronUp } from "react-feather";
import { setToogleHeader } from "./redux/action";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Swal from "sweetalert2";

const Breadcrumbs = (props) => {
  const location = useLocation();
  const data = useSelector((state) => state.toggle_header);
  const dispatch = useDispatch();

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

  let addButton = null;

  const handleExportPDF = () => {
    try {
      const data = props.onDownloadPDF();
      if (!data || data.length === 0) {
        Swal.fire({
          title: "No Data",
          text: "There is no data to export",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      const doc = new jsPDF();
      doc.text(props.maintitle, 14, 15);
      
      const tableColumn = Object.keys(data[0]);
      const tableRows = data.map(item => Object.values(item));

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      });

      doc.save(`${props.maintitle.toLowerCase().replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to generate PDF: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleExportExcel = () => {
    try {
      const data = props.onDownloadExcel();
      if (!data || data.length === 0) {
        Swal.fire({
          title: "No Data",
          text: "There is no data to export",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
      
      const colWidths = Object.keys(data[0]).map(() => ({ wch: 20 }));
      worksheet["!cols"] = colWidths;

      XLSX.writeFile(workbook, `${props.maintitle.toLowerCase().replace(/\s+/g, '_')}.xlsx`);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to export to Excel: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (
    location.pathname === "/product-list" ||
    location.pathname === "/stock-transfer"
  ) {
    addButton = (
      <div className="page-header">
        <div className="add-item d-flex">
          <div className="page-title">
            <h4>{props.maintitle}</h4>
            <h6>{props.subtitle}</h6>
          </div>
        </div>
        <ul className="table-top-head">
          <li>
            <OverlayTrigger placement="top" overlay={renderTooltip}>
              <a href="#" onClick={(e) => { 
                e.preventDefault(); 
                handleExportPDF(); 
              }}>
                <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="PDF" />
              </a>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
              <a href="#" onClick={(e) => { 
                e.preventDefault(); 
                handleExportExcel(); 
              }}>
                <ImageWithBasePath src="assets/img/icons/excel.svg" alt="Excel" />
              </a>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
              <a href="#" onClick={(e) => { e.preventDefault(); props.onRefresh(); }}>
                <RotateCcw />
              </a>
            </OverlayTrigger>
          </li>
        </ul>
        <div className="page-btn">
          <Link
            to="#"
            className="btn btn-added"
            data-bs-toggle="modal"
            data-bs-target="#add-units"
          >
            <PlusCircle className="me-2" />
            {props.addButton}
          </Link>
        </div>
        {/* <div className="page-btn import">
          <Link
            to="#"
            className="btn btn-added color"
            data-bs-toggle="modal"
            data-bs-target="#view-notes"
          >
            <Download className="me-2" />
            {props.importbutton}
          </Link>
        </div> */}
      </div>
    );
  } else if (
    location.pathname === "/sales-report" ||
    location.pathname === "/call-history" ||
    location.pathname === "/inventory-report" ||
    location.pathname === "/purchase-report" ||
    location.pathname === "/customer-report" ||
    location.pathname === "/supplier-report" ||
    location.pathname === "/income-report" ||
    location.pathname === "/tax-report" ||
    location.pathname === "/expense-report" ||
    location.pathname === "/profit-loss-report" ||
    location.pathname === "/invoice-report"
  ) {
    addButton = (
      <div className="page-header">
        <div className="add-item d-flex">
          <div className="page-title">
            <h4>{props.maintitle}</h4>
            <h6>{props.subtitle}</h6>
          </div>
        </div>
        <ul className="table-top-head">
          <li>
            <OverlayTrigger placement="top" overlay={renderTooltip}>
              <a href="#" onClick={(e) => { 
                e.preventDefault(); 
                handleExportPDF(); 
              }}>
                <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="PDF" />
              </a>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
              <a href="#" onClick={(e) => { 
                e.preventDefault(); 
                handleExportExcel(); 
              }}>
                <ImageWithBasePath src="assets/img/icons/excel.svg" alt="Excel" />
              </a>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
              <a href="#" onClick={(e) => { e.preventDefault(); props.onRefresh(); }}>
                <RotateCcw />
              </a>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
              <Link
                to="#"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                id="collapse-header"
                className={data ? "active" : ""}
                onClick={() => dispatch(setToogleHeader(!data))}
              >
                <ChevronUp />
              </Link>
            </OverlayTrigger>
          </li>
        </ul>
      </div>
    );
  } else if (
    location.pathname === "/expense-list" ||
    location.pathname === "/expense-category" ||
    location.pathname === "/customers" ||
    location.pathname === "/warehouse" ||
    location.pathname === "/store-list" ||
    location.pathname === "/suppliers" ||
    location.pathname === "/manage-stocks" ||
    location.pathname === "/stock-adjustment"
  ) {
    addButton = (
      <div className="page-header">
        <div className="add-item d-flex">
          <div className="page-title">
            <h4>{props.maintitle}</h4>
            <h6>{props.subtitle}</h6>
          </div>
        </div>
        <ul className="table-top-head">
          <li>
            <OverlayTrigger placement="top" overlay={renderTooltip}>
              <a href="#" onClick={(e) => { 
                e.preventDefault(); 
                handleExportPDF(); 
              }}>
                <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="PDF" />
              </a>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
              <a href="#" onClick={(e) => { 
                e.preventDefault(); 
                handleExportExcel(); 
              }}>
                <ImageWithBasePath src="assets/img/icons/excel.svg" alt="Excel" />
              </a>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
              <a href="#" onClick={(e) => { e.preventDefault(); props.onRefresh(); }}>
                <RotateCcw />
              </a>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
              <Link
                to="#"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                id="collapse-header"
                className={data ? "active" : ""}
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
            data-bs-toggle={props.buttonDataToggle}
            data-bs-target={props.buttonDataTarget}
          >
            <PlusCircle className="me-2" />
            {props.addButton}
          </Link>
        </div>
      </div>
    );
  }

  return <>{addButton}</>;
};

Breadcrumbs.propTypes = {
  maintitle: PropTypes.string,
  subtitle: PropTypes.string,
  addButton: PropTypes.string,
  importbutton: PropTypes.string,
  buttonDataToggle: PropTypes.string,
  buttonDataTarget: PropTypes.string,
  onDownloadPDF: PropTypes.func,
  onDownloadExcel: PropTypes.func,
  onRefresh: PropTypes.func, 
};

export default Breadcrumbs;