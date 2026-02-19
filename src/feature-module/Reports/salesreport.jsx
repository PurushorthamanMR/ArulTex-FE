import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../core/breadcrumbs";
//import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { getAllByZReportsPages } from "../Api/SalesReport";
import { Eye, Printer } from "react-feather";
import Table from "../../core/pagination/datatable";
import { Modal, Tabs, Tab } from "react-bootstrap";
//import { Box, Zap } from "react-feather";
//import Select from "react-select";

const tillName = localStorage.getItem("tillName");

const SalesReport = () => {
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState("summary");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setIsLoading(true);
        const response = await getAllByZReportsPages(currentPage, pageSize);
        
        if (response && response.content) {
          const mappedData = response.content.map((item, index) => ({
            ...item,
            key: index,
            action: (
              <Link to="#" className="action-btn" onClick={() => handleViewDetails(item)}>
                <Eye className="action-eye" />
              </Link>
            )
          }));
          setReportData(mappedData);
          setFilteredData(mappedData);
          setTotalElements(response.totalElements || 0);
        } else {
          setReportData([]);
          setFilteredData([]);
          setTotalElements(0);
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
        setReportData([]);
        setFilteredData([]);
        setTotalElements(0);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReportData();
  }, [currentPage, pageSize]);

  const handleViewDetails = (record) => {
    setSelectedReport(record);
    setShowDetailsModal(true);
    setActiveDetailTab("summary");
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
  };

  // const [isFilterVisible, setIsFilterVisible] = useState(false);
  // const toggleFilterVisibility = () => {
  //   setIsFilterVisible((prevVisibility) => !prevVisibility);
  // };

  // const options = [
  //   { value: "sortByDate", label: "Sort by Date" },
  //   { value: "140923", label: "14 09 23" },
  //   { value: "110923", label: "11 09 23" },
  // ];

  // const productOptions = [
  //   { value: "chooseProduct", label: "Choose Product" },
  //   { value: "boldV3.2", label: "Bold V3.2" },
  //   { value: "nikeJordan", label: "Nike Jordan" },
  // ];

  // const categoryOptions = [
  //   { value: "chooseCategory", label: "Choose Category" },
  //   { value: "accessories", label: "Accessories" },
  //   { value: "shoe", label: "Shoe" },
  // ];

  const formatCurrency = (value) => {
    if (value === undefined || value === null) {
      return "0.00";
    }
    // Convert string to number if needed
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return numValue.toFixed(2);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const printReport = () => {
    if (!selectedReport) return;

    const printContent = `
      <html>
        <head>
          <title>Z Report - ${selectedReport.reportGeneratedBy}</title>
          <style>
            @page {
              size: 80mm 297mm;
              margin: 0;
            }
            body {
              font-family: sans-serif;
              width: 80mm;
              margin: 0;
              padding: 10px;
              font-size: 12px;
            }
            .receipt-header {
              text-align: center;
              border-bottom: 1px dashed #000;
              padding-bottom: 10px;
              margin-bottom: 10px;
            }
            .receipt-title {
              font-size: 20px;
              font-family: sans-serif;
              font-weight: 900;
              margin: 5px 0;
              letter-spacing: 1px;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              margin: 5px 0;
            }
            .info-row span {
              font-weight: bold;
            }
            .section {
              margin: 10px 0;
              border-bottom: 1px dashed #000;
              padding-bottom: 10px;
            }
            .section-title {
              font-family: sans-serif;
              font-weight: 800;
              font-size: 14px;
              text-align: center;
              margin: 8px 0;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              text-align: left;
              padding: 3px 0;
              font-weight: bold;
            }
            .amount {
              text-align: right;
            }
            .total-row {
              font-weight: bold;
            }
            .footer {
              text-align: center;
              margin-top: 10px;
              font-size: 10px;
              font-weight: bold;
            }
            .date-header {
              font-family: sans-serif;
              font-weight: 800;
              font-size: 16px;
              text-align: center;
              padding: 5px 0;
              border-bottom: 1px dashed #000;
              margin: 15px 0 10px 0;
              text-transform: uppercase;
            }
          </style>
        </head>
        <body>
          <div class="receipt-header">
            <div class="receipt-title">Z REPORT</div>
            <div><strong>${formatDate(selectedReport.startDate)} - ${formatDate(selectedReport.endDate)}</strong></div>
            <div><strong>Generated by: ${selectedReport.reportGeneratedBy}</strong></div>
            <p>Till Name: ${tillName}</p>
            <div><strong>Back Office</strong></div>
          </div>
          
          <div class="section">
            <div class="info-row">
              <span>Total Transactions:</span>
              <span>${selectedReport.salesDateDetails[0].totalTransactions}</span>
            </div>
            <div class="info-row">
              <span>Banking Count:</span>
              <span>${selectedReport.bankingCount || 0}</span>
            </div>
            <div class="info-row">
              <span>Payout Count:</span>
              <span>${selectedReport.payoutCount || 0}</span>
            </div>
            <div class="info-row">
              <span>Banking Total:</span>
              <span>${formatCurrency(selectedReport.banking || 0)}</span>
            </div>
            <div class="info-row">
              <span>Payout Total:</span>
              <span>${formatCurrency(selectedReport.payout || 0)}</span>
            </div>
            <div class="info-row">
              <span>Total Sales:</span>
              <span>${formatCurrency(selectedReport.fullyTotalSales)}</span>
            </div>
            <div class="info-row">
              <span>Difference:</span>
              <span>${formatCurrency(selectedReport.difference)}</span>
            </div>
            <div class="info-row">
              <span>After Balance Cash:</span>
              <span>${formatCurrency(selectedReport.salesDateDetails[0].overallPaymentTotals.find(payment => payment.paymentMethod.toLowerCase() === 'cash')?.paymentTotal - selectedReport.difference)}</span>
            </div>
          </div>
          
          ${selectedReport.salesDateDetails.map(dateDetail => `
              <div class="date-header">
                Date: ${formatDate(dateDetail.salesDate)}
              </div>
              
              <div class="section">
                <div class="section-title">Categories</div>
                <table>
                  ${dateDetail.categoryTotals.map(category => `
                    <tr>
                      <td>${category.categoryName}</td>
                      <td class="amount">${formatCurrency(category.categoryTotal)}</td>
                    </tr>
                  `).join('')}
                </table>
              </div>
              
              <div class="section">
                <div class="section-title">Payment Methods</div>
                <table>
                  ${dateDetail.overallPaymentTotals.map(payment => `
                    <tr>
                      <td>${payment.paymentMethod}</td>
                      <td class="amount">${formatCurrency(payment.paymentTotal)}</td>
                    </tr>
                  `).join('')}
                </table>
              </div>
              
              <div class="section">
                <div class="section-title">User Payment Details</div>
                <table>
                  ${dateDetail.userPaymentDetails.map(userPayment => `
                    <tr>
                      <td>${userPayment.userName.split(' ')[0]}</td>
                      <td>${userPayment.paymentMethod}</td>
                      <td class="amount">${formatCurrency(userPayment.paymentTotal)}</td>
                    </tr>
                  `).join('')}
                </table>
              </div>

              <div class="section">
                <div class="section-title">Banking & Payout Details</div>
                <table>
                  <tr>
                    <td>Banking</td>
                    <td>${selectedReport.bankingCount || 0}</td>
                    <td class="amount">${formatCurrency(selectedReport.banking || 0)}</td>
                  </tr>
                  <tr>
                    <td>Payout</td>
                    <td>${selectedReport.payoutCount || 0}</td>
                    <td class="amount">${formatCurrency(selectedReport.payout || 0)}</td>
                  </tr>
                  <tr class="total-row">
                    <td>Difference</td>
                    <td colspan="2" class="amount">${formatCurrency(selectedReport.difference)}</td>
                  </tr>
                </table>
              </div>
          `).join('')}

          <div class="footer">
            <div>*** End of Report ***</div>
            <div>Printed on ${new Date().toLocaleString()}</div>
          </div>
        </body>
      </html>
    `;

    const printFrame = document.createElement('iframe');
    printFrame.style.display = 'none';
    document.body.appendChild(printFrame);
    
    printFrame.contentWindow.document.write(printContent);
    printFrame.contentWindow.document.close();
    
    printFrame.onload = () => {
      printFrame.contentWindow.print();
      setTimeout(() => {
        document.body.removeChild(printFrame);
      }, 1000);
    };
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.trim().toLowerCase();
    setSearchTerm(searchValue);
    
    if (searchValue === "") {
      setFilteredData(reportData);
    } else {
      const filtered = reportData.filter(item => 
        item.reportGeneratedBy.toLowerCase().includes(searchValue)
      );
      setFilteredData(filtered);
    }
  };

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      const response = await getAllByZReportsPages(1, pageSize);
      const mappedData = response.responseDto.payload.map((item, index) => ({
        ...item,
        key: index,
        action: (
          <Link to="#" className="action-btn">
            <Eye className="action-eye" />
          </Link>
        )
      }));
      setReportData(mappedData);
      setFilteredData(mappedData);
      setTotalElements(response.responseDto.totalRecords);
      setCurrentPage(1);
      setSearchTerm("");
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onShowSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const columns = [
    {
      title: "Report Generated By",
      dataIndex: "reportGeneratedBy",
      sorter: (a, b) => a.reportGeneratedBy.localeCompare(b.reportGeneratedBy),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
      render: (text) => formatDate(text),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
      render: (text) => formatDate(text),
    },
    {
      title: "Fully Total Sales",
      dataIndex: "fullyTotalSales",
      sorter: (a, b) => a.fullyTotalSales - b.fullyTotalSales,
      render: (text) => formatCurrency(text),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <td className="action-table-data text-center">
          <div className="edit-delete-action d-flex justify-content-center align-items-center">
            <Link
              className="p-2"
              to="#"
              onClick={() => handleViewDetails(record)}
            >
              <Eye className="action-eye" />
            </Link>
          </div>
        </td>
      ),
      sorter: false,
    },
  ];

  const handleDownloadPDF = () => {
    if (!filteredData || filteredData.length === 0) {
      return [];
    }
    
    return filteredData.map(item => ({
      'Generated By': item.reportGeneratedBy,
      'Start Date': formatDate(item.startDate),
      'End Date': formatDate(item.endDate),
      'Total Sales': formatCurrency(item.fullyTotalSales)
    }));
  };

  const handleDownloadExcel = () => {
    if (!filteredData || filteredData.length === 0) {
      return [];
    }
    
    return filteredData.map(item => ({
      'Generated By': item.reportGeneratedBy,
      'Start Date': formatDate(item.startDate),
      'End Date': formatDate(item.endDate),
      'Total Sales': formatCurrency(item.fullyTotalSales)
    }));
  };

  if (isLoading) {
    return <div className="page-wrapper">{/* Add loading spinner or message here if desired */}</div>;
  }

  return (
    <div className="page-wrapper">
      <div className="content">
        <Breadcrumbs
          maintitle="Z Report"
          subtitle="Manage Your Z Report"
          onDownloadPDF={handleDownloadPDF}
          onDownloadExcel={handleDownloadExcel}
          onRefresh={handleRefresh}
        />
        {/* /product list */}
        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search by Report Generator"
                    className="form-control form-control-sm formsearch"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <Link to="#" className="btn btn-searchset">
                    <i data-feather="search" className="feather-search" />
                  </Link>
                </div>
              </div>
              {/* <div className="search-path">
                <Link
                  className={`btn btn-filter ${
                    isFilterVisible ? "setclose" : ""
                  }`}
                  id="filter_search"
                >
                  <Filter
                    className="filter-icon"
                    onClick={toggleFilterVisibility}
                  />
                  <span onClick={toggleFilterVisibility}>
                    <ImageWithBasePath
                      src="assets/img/icons/closes.svg"
                      alt="img"
                    />
                  </span>
                </Link>
              </div> */}
              {/* <div className="form-sort stylewidth">
                <Sliders className="info-img" />

                <Select
                  className="select "
                  options={options}
                  placeholder="Sort by Date"
                />
              </div> */}
            </div>
            {/* /Filter */}
            {/* <div
               className={`card${isFilterVisible ? " visible" : ""}`}
               id="filter_inputs"
               style={{ display: isFilterVisible ? "block" : "none" }}
            >
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="input-blocks">
                      <Box className="info-img" />
                      <Select className="select" options={productOptions} />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="input-blocks">
                      <Zap className="info-img" />
                      <Select className="select" options={categoryOptions} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-12">
                    <div className="input-blocks">
                      <Link className="btn btn-filters ms-auto">
                        {" "}
                        <i
                          data-feather="search"
                          className="feather-search"
                        />{" "}
                        Search{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* /Filter */}
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={filteredData}
                rowKey={(record) => record.id}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: totalElements,
                  onChange: (page, pageSize) => {
                    setCurrentPage(page);
                    setPageSize(pageSize);
                  },
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  pageSizeOptions: ["10", "20", "50", "100"],
                }}
              />
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>

      {/* Detailed Report Modal */}
      <Modal
        show={showDetailsModal}
        onHide={closeDetailsModal}
        size="xl"
        centered
        className="report-detail-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Z Report Details</Modal.Title>
          <button 
            className="btn btn-primary ms-auto me-2 d-flex align-items-center"
            onClick={printReport}
          >
            <Printer className="me-1" size={16} /> Print Report
          </button>
        </Modal.Header>
        <Modal.Body>
          {selectedReport && (
            <div className="report-details">
              <div className="report-header mb-4">
                <div className="row">
                  <div className="col-md-6">
                    <h5>Report Information</h5>
                    <p><strong>Generated By:</strong> {selectedReport.reportGeneratedBy}</p>
                    <p><strong>Report Type:</strong> {selectedReport.reportType}</p>
                    <p><strong>Total Transactions:</strong> {selectedReport.salesDateDetails[0].totalTransactions}</p>
                    <p><strong>Total Sales:</strong> {formatCurrency(selectedReport.fullyTotalSales)}</p>
                    <p><strong>Difference:</strong> <span className={selectedReport.difference >= 0 ? "text-success" : "text-danger"}>{formatCurrency(selectedReport.difference)}</span></p>
                    <p><strong>After Balance Cash:</strong> <span className="text-primary">{formatCurrency(selectedReport.salesDateDetails[0].overallPaymentTotals.find(payment => payment.paymentMethod.toLowerCase() === 'cash')?.paymentTotal - selectedReport.difference)}</span></p>
                  </div>
                  <div className="col-md-6">
                    <h5>Report Period</h5>
                    <p><strong>From:</strong> {formatDate(selectedReport.startDate)}</p>
                    <p><strong>To:</strong> {formatDate(selectedReport.endDate)}</p>
                    <p><strong>Banking Total:</strong> <span className="text-info">{formatCurrency(selectedReport?.banking)}</span></p>
                    <p><strong>Banking Count:</strong> <span className="text-info">{selectedReport?.bankingCount}</span></p>
                    <p><strong>Payout Total:</strong> <span className="text-warning">{formatCurrency(selectedReport?.payout)}</span></p>
                    <p><strong>Payout Count:</strong> <span className="text-warning">{selectedReport?.payoutCount}</span></p>
                  </div>
                </div>
              </div>

              <Tabs
                activeKey={activeDetailTab}
                onSelect={(k) => setActiveDetailTab(k)}
                className="mb-4"
              >
                <Tab eventKey="summary" title="Daily Summary">
                  {selectedReport.salesDateDetails && selectedReport.salesDateDetails.length > 0 && (
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead className="thead-light">
                          <tr>
                            <th>Date</th>
                            <th>Transactions</th>
                            <th>Total Sales</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedReport.salesDateDetails.map((detail, index) => (
                            <tr key={index}>
                              <td>{formatDate(detail.salesDate)}</td>
                              <td>{detail.totalTransactions}</td>
                              <td>{formatCurrency(detail.totalSales)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Tab>
                <Tab eventKey="categories" title="Categories Breakdown">
                  {selectedReport.salesDateDetails && selectedReport.salesDateDetails.length > 0 && (
                    <div>
                      {selectedReport.salesDateDetails.map((dateDetail, dateIndex) => (
                        <div key={dateIndex} className="mb-4">
                          <h5 className="border-bottom pb-2">{formatDate(dateDetail.salesDate)} - Categories</h5>
                          {dateDetail.categoryTotals && dateDetail.categoryTotals.length > 0 ? (
                            <div className="table-responsive">
                              <table className="table table-bordered">
                                <thead className="thead-light">
                                  <tr>
                                    <th>Category</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {dateDetail.categoryTotals.map((category, catIndex) => (
                                    <tr key={catIndex}>
                                      <td>{category.categoryName}</td>
                                      <td>{formatCurrency(category.categoryTotal)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p>No category data available for this date</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Tab>
                <Tab eventKey="payments" title="Payment Methods">
                  {selectedReport.salesDateDetails && selectedReport.salesDateDetails.length > 0 && (
                    <div>
                      {selectedReport.salesDateDetails.map((dateDetail, dateIndex) => (
                        <div key={dateIndex} className="mb-4">
                          <h5 className="border-bottom pb-2">{formatDate(dateDetail.salesDate)} - Payment Methods</h5>
                          {dateDetail.overallPaymentTotals && dateDetail.overallPaymentTotals.length > 0 ? (
                            <div className="table-responsive">
                              <table className="table table-bordered">
                                <thead className="thead-light">
                                  <tr>
                                    <th>Payment Method</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {dateDetail.overallPaymentTotals.map((payment, payIndex) => (
                                    <tr key={payIndex}>
                                      <td>{payment.paymentMethod}</td>
                                      <td>{formatCurrency(payment.paymentTotal)}</td>
                                    </tr>
                                  ))}
                                  {dateDetail.overallPaymentTotals.some(payment => payment.paymentMethod.toLowerCase() === 'cash') && (
                                    <tr className="font-weight-bold">
                                      <td>After Balance Cash</td>
                                      <td>
                                        {formatCurrency(
                                          dateDetail.overallPaymentTotals
                                            .find(payment => payment.paymentMethod.toLowerCase() === 'cash')
                                            ?.paymentTotal - selectedReport.difference
                                        )}
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p>No payment data available for this date</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Tab>
                <Tab eventKey="users" title="User Payment Details">
                  {selectedReport.salesDateDetails && selectedReport.salesDateDetails.length > 0 && (
                    <div>
                      {selectedReport.salesDateDetails.map((dateDetail, dateIndex) => (
                        <div key={dateIndex} className="mb-4">
                          <h5 className="border-bottom pb-2">{formatDate(dateDetail.salesDate)} - User Payments</h5>
                          {dateDetail.userPaymentDetails && dateDetail.userPaymentDetails.length > 0 ? (
                            <div className="table-responsive">
                              <table className="table table-bordered">
                                <thead className="thead-light">
                                  <tr>
                                    <th>User</th>
                                    <th>Payment Method</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {dateDetail.userPaymentDetails.map((userPayment, userIndex) => (
                                    <tr key={userIndex}>
                                      <td>{userPayment.userName.split(' ')[0]}</td>
                                      <td>{userPayment.paymentMethod}</td>
                                      <td>{formatCurrency(userPayment.paymentTotal)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p>No user payment data available for this date</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Tab>
                <Tab eventKey="banking" title="Banking & Payout Details">
                  {selectedReport.salesDateDetails && selectedReport.salesDateDetails.length > 0 && (
                    <div>
                      {selectedReport.salesDateDetails.map((dateDetail, dateIndex) => (
                        <div key={dateIndex} className="mb-4">
                          <h5 className="border-bottom pb-2">{formatDate(dateDetail.salesDate)} - Banking & Payout Information</h5>
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead className="thead-light">
                                <tr>
                                  <th>Category</th>
                                  <th>Count</th>
                                  <th>Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Banking</td>
                                  <td className="text-info">{selectedReport.bankingCount || 0}</td>
                                  <td className="text-info">{formatCurrency(selectedReport.banking || 0)}</td>
                                </tr>
                                <tr>
                                  <td>Payout</td>
                                  <td className="text-warning">{selectedReport.payoutCount || 0}</td>
                                  <td className="text-warning">{formatCurrency(selectedReport.payout || 0)}</td>
                                </tr>
                                <tr className="font-weight-bold">
                                  <td>Difference</td>
                                  <td colSpan="2" className={selectedReport.difference >= 0 ? "text-success" : "text-danger"}>
                                    {formatCurrency(selectedReport.difference)}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Tab>
              </Tabs>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={closeDetailsModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SalesReport;
