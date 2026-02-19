import React, { useState, useEffect } from "react";
// import Breadcrumbs from "../../core/breadcrumbs"; 
// import { Link } from "react-router-dom";
import { fetchXReport } from "../Api/TransactionApi";
import { Printer, RefreshCw } from "react-feather";
import { Tabs, Tab } from "react-bootstrap";

const tillName = localStorage.getItem("tillName");

const PurchaseReport = () => {
  const [latestReport, setLatestReport] = useState(null);
  const [activeDetailTab, setActiveDetailTab] = useState("summary");
  const [isLoading, setIsLoading] = useState(true);

  const fetchReportData = async () => {
    try {
      setIsLoading(true);
      const response = await fetchXReport();
      if (response.success && response.data && response.data.responseDto) {
        console.log('X Report Data:', response.data.responseDto);
        const transformedData = {
          reportGeneratedBy: response.data.responseDto.reportGeneratedBy,
          reportType: "X Report",
          startDate: response.data.responseDto.startDate,
          endDate: response.data.responseDto.endDate,
          fullyTotalSales: response.data.responseDto.totalSales,
          bankingTotal: response.data.responseDto.bankingTotal,
          bankingCount: response.data.responseDto.bankingCount,
          payoutTotal: response.data.responseDto.payoutTotal,
          payoutCount: response.data.responseDto.payoutCount,
          difference: response.data.responseDto.difference,
          salesDateDetails: [{
            salesDate: response.data.responseDto.startDate,
            totalTransactions: response.data.responseDto.totalTransactions,
            totalSales: response.data.responseDto.totalSales,
            bankingTotal: response.data.responseDto.bankingTotal,
            bankingCount: response.data.responseDto.bankingCount,
            payoutTotal: response.data.responseDto.payoutTotal,
            payoutCount: response.data.responseDto.payoutCount,
            difference: response.data.responseDto.difference,
            categoryTotals: Object.entries(response.data.responseDto.categoryTotals).map(([categoryName, categoryTotal]) => ({
              categoryName,
              categoryTotal
            })),
            overallPaymentTotals: Object.entries(response.data.responseDto.overallPaymentTotals).map(([paymentMethod, paymentTotal]) => ({
              paymentMethod,
              paymentTotal
            })),
            userPaymentDetails: response.data.responseDto.userPaymentDetails.map(user => 
              Object.entries(user.payments).map(([paymentMethod, paymentTotal]) => ({
                userName: user.userName,
                paymentMethod,
                paymentTotal
              }))
            ).flat()
          }]
        };
        
        setLatestReport(transformedData);
      } else {
        console.error("Failed to fetch X-Report:", response.error);
      }
    } catch (error) {
      console.error("Error fetching X-Report:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchReportData();
  }, []);

  const formatCurrency = (value) => {
    return parseFloat(value).toFixed(2);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const printReport = () => {
    if (!latestReport) return;

    const printContent = `
      <html>
        <head>
          <title>X Report - ${latestReport.reportGeneratedBy}</title>
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
          </style>
        </head>
        <body>
          <div class="receipt-header">
            <div class="receipt-title">X REPORT</div>
            <div><strong>${formatDate(latestReport.startDate)}</strong></div>
            <div><strong>Generated by: ${latestReport.reportGeneratedBy}</strong></div>
            <p>Till Name: ${tillName}</p>
            <div><strong>Back Office</strong></div>
          </div>

          <div class="section">
            <div class="info-row">
              <span>Period:</span>
              <span>${formatDate(latestReport.startDate)} - ${formatDate(latestReport.endDate)}</span>
            </div>
            <div class="info-row">
              <span>Total Transactions:</span>
              <span>${latestReport.salesDateDetails[0].totalTransactions}</span>
            </div>
            <div class="info-row">
              <span>Banking Count:</span>
              <span>${latestReport.bankingCount}</span>
            </div>
            <div class="info-row">
              <span>Payout Count:</span>
              <span>${latestReport.payoutCount}</span>
            </div>
            <div class="info-row">
              <span>Banking Total:</span>
              <span>${formatCurrency(latestReport.bankingTotal)}</span>
            </div>
            <div class="info-row">
              <span>Payout Total:</span>
              <span>${formatCurrency(latestReport.payoutTotal)}</span>
            </div>
            <div class="info-row">
              <span>Total Sales:</span>
              <span>${formatCurrency(latestReport.fullyTotalSales)}</span>
            </div>
            <div class="info-row">
              <span>Difference:</span>
              <span>${formatCurrency(latestReport.difference)}</span>
            </div>
            <div class="info-row">
              <span>After Balance Cash:</span>
              <span>${formatCurrency(latestReport.salesDateDetails[0].overallPaymentTotals.find(payment => payment.paymentMethod.toLowerCase() === 'cash')?.paymentTotal - latestReport.difference || 0)}</span>
            </div>
          </div>

          ${latestReport.salesDateDetails.map(dateDetail => `
            <div class="section">
              <div class="section-title" style="font-family: sans-serif;">Categories</div>
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
              <div class="section-title" style="font-family: sans-serif;">Payment Methods</div>
              <table>
                ${dateDetail.overallPaymentTotals.map(payment => `
                  <tr>
                    <td>${payment.paymentMethod}</td>
                    <td class="amount">${formatCurrency(payment.paymentTotal)}</td>
                  </tr>
                `).join('')}
                ${dateDetail.overallPaymentTotals.find(payment => payment.paymentMethod.toLowerCase() === 'cash') ? `
                  <tr class="total-row">
                    <td>After Balance Cash</td>
                    <td class="amount">${formatCurrency(dateDetail.overallPaymentTotals.find(payment => payment.paymentMethod.toLowerCase() === 'cash').paymentTotal - dateDetail.difference)}</td>
                  </tr>
                ` : ''}
              </table>
            </div>

            <div class="section">
              <div class="section-title" style="font-family: sans-serif;">User Payment Details</div>
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
              <div class="section-title" style="font-family: sans-serif;">Banking & Payout Details</div>
              <table>
                <tr>
                  <td>Banking</td>
                  <td>${dateDetail.bankingCount}</td>
                  <td class="amount">${formatCurrency(dateDetail.bankingTotal)}</td>
                </tr>
                <tr>
                  <td>Payout</td>
                  <td>${dateDetail.payoutCount}</td>
                  <td class="amount">${formatCurrency(dateDetail.payoutTotal)}</td>
                </tr>
                <tr class="total-row">
                  <td>Difference</td>
                  <td colspan="2" class="amount">${formatCurrency(dateDetail.difference)}</td>
                </tr>
              </table>
            </div>
          `).join('')}

          <div class="footer">
            <div>*** End of X Report ***</div>
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

  if (isLoading) {
    return <div className="page-wrapper">{/* Add loading spinner or message here if desired */}</div>;
  }

  return (
    <div className="pos-category-grid-container">
      
      <div className="page-wrapper">
        <div className="content">   
          <div className="card">
            <div className="card-body">
              <div className="report-details">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="card-title mb-0 text-primary">X Report Details</h4>
                  <div className="d-flex">
                    <button 
                      className="btn btn-secondary d-flex align-items-center me-2"
                      onClick={fetchReportData}
                    >
                      <RefreshCw className="me-1" size={16} />
                    </button>
                    <button 
                      className="btn btn-primary d-flex align-items-center"
                      onClick={printReport}
                      disabled={!latestReport}
                    >
                      <Printer className="me-1" size={16} />
                    </button>
                  </div>
                </div>
                
                {latestReport && (
                  <>
                    <div className="report-header mb-4 p-3 bg-light rounded">
                      <div className="row">
                        <div className="col-md-6">
                          <h5 className="text-dark">Report Information</h5>
                          <p className="mb-1"><strong className="text-secondary">Generated By:</strong> <span className="text-dark">{latestReport.reportGeneratedBy}</span></p>
                          <p className="mb-1"><strong className="text-secondary">Report Type:</strong> <span className="text-dark">{latestReport.reportType}</span></p>
                          <p className="mb-1"><strong className="text-secondary">Total Transactions:</strong> <span className="text-primary">{latestReport.salesDateDetails[0].totalTransactions}</span></p>
                          <p className="mb-1"><strong className="text-secondary">Total Sales:</strong> <span className="text-success">{formatCurrency(latestReport.fullyTotalSales)}</span></p>
                          <p className="mb-1"><strong className="text-secondary">Difference:</strong> <span className={latestReport.difference >= 0 ? "text-success" : "text-danger"}>{formatCurrency(latestReport.difference)}</span></p>
                          <p className="mb-1"><strong className="text-secondary">After Balance Cash:</strong> <span className="text-primary">{formatCurrency(latestReport.salesDateDetails[0].overallPaymentTotals.find(payment => payment.paymentMethod.toLowerCase() === 'cash')?.paymentTotal - latestReport.difference || 0)}</span></p>
                        </div>
                        <div className="col-md-6">
                          <h5 className="text-dark">Report Period</h5>
                          <p className="mb-1"><strong className="text-secondary">From:</strong> <span className="text-dark">{formatDate(latestReport.startDate)}</span></p>
                          <p className="mb-1"><strong className="text-secondary">To:</strong> <span className="text-dark">{formatDate(latestReport.endDate)}</span></p>
                          <p className="mb-1"><strong className="text-secondary">Banking Total:</strong> <span className="text-info">{formatCurrency(latestReport.bankingTotal)}</span></p>
                          <p className="mb-1"><strong className="text-secondary">Banking Count:</strong> <span className="text-info">{latestReport.bankingCount}</span></p>
                          <p className="mb-1"><strong className="text-secondary">Payout Total:</strong> <span className="text-warning">{formatCurrency(latestReport.payoutTotal)}</span></p>
                          <p className="mb-1"><strong className="text-secondary">Payout Count:</strong> <span className="text-warning">{latestReport.payoutCount}</span></p>
                        </div>
                      </div>
                    </div>

                    <Tabs
                      activeKey={activeDetailTab}
                      onSelect={(k) => setActiveDetailTab(k)}
                      className="mb-4"
                    >
                      <Tab eventKey="summary" title="Daily Summary">
                        {latestReport.salesDateDetails && latestReport.salesDateDetails.length > 0 && (
                          <div className="table-responsive mt-3">
                            <table className="table table-bordered table-striped">
                              <thead className="thead-light bg-primary text-white">
                                <tr>
                                  <th>Date</th>
                                  <th>Transactions</th>
                                  <th>Total Sales</th>
                                </tr>
                              </thead>
                              <tbody>
                                {latestReport.salesDateDetails.map((detail, index) => (
                                  <tr key={index}>
                                    <td className="text-dark">{formatDate(detail.salesDate)}</td>
                                    <td className="text-dark">{detail.totalTransactions}</td>
                                    <td className="text-success">{formatCurrency(detail.totalSales)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </Tab>
                      <Tab eventKey="categories" title="Categories Breakdown">
                        {latestReport.salesDateDetails && latestReport.salesDateDetails.length > 0 && (
                          <div className="mt-3">
                            {latestReport.salesDateDetails.map((dateDetail, dateIndex) => (
                              <div key={dateIndex} className="mb-4">
                                <h5 className="border-bottom pb-2 text-primary">{formatDate(dateDetail.salesDate)} - Categories</h5>
                                {dateDetail.categoryTotals && dateDetail.categoryTotals.length > 0 ? (
                                  <div className="table-responsive">
                                    <table className="table table-bordered">
                                      <thead className="thead-light bg-primary text-white">
                                        <tr>
                                          <th>Category</th>
                                          <th>Amount</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {dateDetail.categoryTotals.map((category, catIndex) => (
                                          <tr key={catIndex}>
                                            <td className="text-dark">{category.categoryName}</td>
                                            <td className="text-success">{formatCurrency(category.categoryTotal)}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                ) : (
                                  <p className="text-muted">No category data available for this date</p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </Tab>
                      <Tab eventKey="payments" title="Payment Methods">
                        {latestReport.salesDateDetails && latestReport.salesDateDetails.length > 0 && (
                          <div className="mt-3">
                            {latestReport.salesDateDetails.map((dateDetail, dateIndex) => {
                              // Find the cash payment total
                              const cashPayment = dateDetail.overallPaymentTotals.find(
                                payment => payment.paymentMethod.toLowerCase() === 'cash'
                              );
                              const cashTotal = cashPayment ? cashPayment.paymentTotal : 0;
                              const afterBalanceCash = cashTotal - dateDetail.difference;

                              return (
                                <div key={dateIndex} className="mb-4">
                                  <h5 className="border-bottom pb-2 text-primary">{formatDate(dateDetail.salesDate)} - Payment Methods</h5>
                                  {dateDetail.overallPaymentTotals && dateDetail.overallPaymentTotals.length > 0 ? (
                                    <div className="table-responsive">
                                      <table className="table table-bordered">
                                        <thead className="thead-light bg-primary text-white">
                                          <tr>
                                            <th>Payment Method</th>
                                            <th>Amount</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {dateDetail.overallPaymentTotals.map((payment, payIndex) => (
                                            <tr key={payIndex}>
                                              <td className="text-dark">{payment.paymentMethod}</td>
                                              <td className="text-success">{formatCurrency(payment.paymentTotal)}</td>
                                            </tr>
                                          ))}
                                          {cashPayment && (
                                            <tr className="font-weight-bold">
                                              <td className="text-dark">After Balance Cash</td>
                                              <td className={afterBalanceCash >= 0 ? "text-success" : "text-danger"}>
                                                {formatCurrency(afterBalanceCash)}
                                              </td>
                                            </tr>
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  ) : (
                                    <p className="text-muted">No payment data available for this date</p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </Tab>
                      <Tab eventKey="users" title="User Payment Details">
                        {latestReport.salesDateDetails && latestReport.salesDateDetails.length > 0 && (
                          <div className="mt-3">
                            {latestReport.salesDateDetails.map((dateDetail, dateIndex) => (
                              <div key={dateIndex} className="mb-4">
                                <h5 className="border-bottom pb-2 text-primary">{formatDate(dateDetail.salesDate)} - User Payments</h5>
                                {dateDetail.userPaymentDetails && dateDetail.userPaymentDetails.length > 0 ? (
                                  <div className="table-responsive">
                                    <table className="table table-bordered">
                                      <thead className="thead-light bg-primary text-white">
                                        <tr>
                                          <th>User</th>
                                          <th>Payment Method</th>
                                          <th>Amount</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {dateDetail.userPaymentDetails.map((userPayment, userIndex) => (
                                          <tr key={userIndex}>
                                            <td className="text-dark">{userPayment.userName.split(' ')[0]}</td>
                                            <td className="text-dark">{userPayment.paymentMethod}</td>
                                            <td className="text-success">{formatCurrency(userPayment.paymentTotal)}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                ) : (
                                  <p className="text-muted">No user payment data available for this date</p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </Tab>
                      <Tab eventKey="banking" title="Banking & Payout Details">
                        {latestReport.salesDateDetails && latestReport.salesDateDetails.length > 0 && (
                          <div className="mt-3">
                            {latestReport.salesDateDetails.map((dateDetail, dateIndex) => (
                              <div key={dateIndex} className="mb-4">
                                <h5 className="border-bottom pb-2 text-primary">{formatDate(dateDetail.salesDate)} - Banking & Payout Information</h5>
                                <div className="table-responsive">
                                  <table className="table table-bordered">
                                    <thead className="thead-light bg-primary text-white">
                                      <tr>
                                        <th>Category</th>
                                        <th>Count</th>
                                        <th>Amount</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td className="text-dark">Banking</td>
                                        <td className="text-info">{dateDetail.bankingCount}</td>
                                        <td className="text-info">{formatCurrency(dateDetail.bankingTotal)}</td>
                                      </tr>
                                      <tr>
                                        <td className="text-dark">Payout</td>
                                        <td className="text-warning">{dateDetail.payoutCount}</td>
                                        <td className="text-warning">{formatCurrency(dateDetail.payoutTotal)}</td>
                                      </tr>
                                      <tr className="font-weight-bold">
                                        <td className="text-dark">Difference</td>
                                        <td colSpan="2" className={dateDetail.difference >= 0 ? "text-success" : "text-danger"}>
                                          {formatCurrency(dateDetail.difference)}
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
                  </>
                )}
                
                {!latestReport && (
                  <div className="alert alert-info mt-3">
                    <p className="mb-0">No report data available yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseReport;
