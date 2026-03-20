import { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCalendarDay,
    faCalendarAlt,
    faChartBar,
    faChartLine,
    faTrophy,
    faExclamationTriangle,
    faPrint,
    faClock
} from '@fortawesome/free-solid-svg-icons'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell
} from 'recharts'
import Swal from 'sweetalert2'
import * as salesApi from '../api/salesApi'
import * as shiftApi from '../api/shiftApi'
import { downloadTablePdf, downloadZReportPdf } from '../utils/pdfExport'
import '../styles/SalesAnalysis.css'

const COLORS = ['#0d9488', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function SalesAnalysis() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const [activeMetricTab, setActiveMetricTab] = useState('daily')
    const [trendData, setTrendData] = useState({ daily: [], monthly: [], yearly: [] })
    const [topProducts, setTopProducts] = useState([])
    const [reportDateRange, setReportDateRange] = useState({
        fromDate: new Date().toISOString().slice(0, 10),
        toDate: new Date().toISOString().slice(0, 10)
    })
    const [xReport, setXReport] = useState(null)
    const [zReport, setZReport] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [zPrintSaving, setZPrintSaving] = useState(false)
    const [openShift, setOpenShift] = useState(null)
    /** Default date range — avoids requesting “current shift” before we know shift status */
    const [useShiftForXZ, setUseShiftForXZ] = useState(false)
    const [shiftReady, setShiftReady] = useState(false)
    const [xzError, setXzError] = useState(null)

    const loadShift = useCallback(async () => {
        try {
            const s = await shiftApi.getCurrent()
            setOpenShift(s && s.id ? s : null)
        } catch {
            setOpenShift(null)
        } finally {
            setShiftReady(true)
        }
    }, [])

    const fetchData = useCallback(async () => {
        setLoading(true)
        setError(null)
        setXzError(null)
        const useShift = shiftReady && Boolean(openShift?.id && useShiftForXZ)
        const xzParams = useShift
            ? {
                useOpenShift: true,
                fromDate: reportDateRange.fromDate,
                toDate: reportDateRange.toDate
            }
            : { fromDate: reportDateRange.fromDate, toDate: reportDateRange.toDate }
        try {
            const [trend, top] = await Promise.all([
                salesApi.getTrends(),
                salesApi.getTopProducts(10)
            ])
            setTrendData(
                trend && typeof trend === 'object'
                    ? {
                        daily: Array.isArray(trend.daily) ? trend.daily : [],
                        monthly: Array.isArray(trend.monthly) ? trend.monthly : [],
                        yearly: Array.isArray(trend.yearly) ? trend.yearly : []
                    }
                    : { daily: [], monthly: [], yearly: [] }
            )
            setTopProducts(Array.isArray(top) ? top : [])
        } catch (err) {
            setError(err.message || 'Failed to load charts and trends')
        }
        try {
            const [xData, zData] = await Promise.all([
                salesApi.getXReport(xzParams),
                salesApi.getZReport(xzParams)
            ])
            setXReport(xData && typeof xData === 'object' ? xData : null)
            setZReport(zData && typeof zData === 'object' ? zData : null)
            setXzError(null)
        } catch (err) {
            setXReport(null)
            setZReport(null)
            setXzError(err.message || 'Could not load X/Z reports')
        } finally {
            setLoading(false)
        }
    }, [reportDateRange, openShift, useShiftForXZ, shiftReady])

    useEffect(() => {
        if (shiftReady && !openShift?.id && useShiftForXZ) {
            setUseShiftForXZ(false)
        }
    }, [shiftReady, openShift, useShiftForXZ])

    useEffect(() => {
        loadShift()
    }, [loadShift])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const formatCurrency = (val) => `LKR ${Number(val).toLocaleString('en-LK')}`

    // KPI Summary
    const today = new Date().toISOString().slice(0, 10)
    const todaySales = trendData.daily?.find(d => d.date === today)?.totalAmount || 0
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()
    const monthSales = trendData.monthly?.find(m => Number(m.year) === currentYear && Number(m.month) === currentMonth)?.totalAmount || 0
    const yearSales = trendData.yearly?.find(y => Number(y.year) === selectedYear)?.totalAmount || 0

    // --- Sales Performance Metric Charts ---
    const dailyChartData = (trendData.daily || []).slice(-30).map(d => ({
        name: new Date(d.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }),
        sales: Number(d.totalAmount)
    }))

    const monthlyChartData = (trendData.monthly || [])
        .filter(m => Number(m.year) === selectedYear)
        .map(m => ({
            name: MONTH_NAMES[(Number(m.month) - 1)],
            sales: Number(m.totalAmount)
        }))

    const yearlyChartData = (trendData.yearly || []).map(y => ({
        name: String(y.year),
        sales: Number(y.totalAmount)
    }))

    // --- Top Products Chart ---
    const topProductsChartData = topProducts.map(tp => ({
        name: tp.product?.productName || 'Unknown',
        qty: Number(tp.totalQty),
        revenue: Number(tp.totalRevenue)
    }))

    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)

    const metricTabData = {
        daily: dailyChartData,
        monthly: monthlyChartData,
        yearly: yearlyChartData
    }

    const metricColors = {
        daily: '#0d9488',
        monthly: '#6366f1',
        yearly: '#f59e0b'
    }

    const activeChartData = metricTabData[activeMetricTab]
    const activeColor = metricColors[activeMetricTab]
    const printRangeText =
        xReport?.reportScope === 'shift' && xReport?.shiftOpenedAt
            ? `Shift #${xReport.shiftId} · opened ${new Date(xReport.shiftOpenedAt).toLocaleString()}`
            : `${xReport?.fromDate || reportDateRange.fromDate} → ${xReport?.toDate || reportDateRange.toDate}`

    const xzScopeLabel =
        xReport?.reportScope === 'shift' && xReport?.shiftId != null
            ? `Shift #${xReport.shiftId}`
            : `${reportDateRange.fromDate} → ${reportDateRange.toDate}`

    const canRunZClose = Boolean(shiftReady && openShift?.id && useShiftForXZ)

    const handlePrintXReport = () => {
        const rows = [
            ...((xReport?.payments || []).map((p) => [
                'Payment',
                p.paymentMethod,
                String(p.count),
                Number(p.amount || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })
            ])),
            ...((xReport?.categories || []).map((c) => [
                'Category',
                c.categoryName,
                String(c.quantity),
                Number(c.amount || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })
            ])),
            ['Summary', 'Total Cash Sales', '', Number(xReport?.totalCashSale || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })],
            ['Summary', 'Total Card Sales', '', Number(xReport?.totalCardSale || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })],
            ['Summary', 'Transactions', String(xReport?.transactionCount || 0), ''],
            ['Summary', 'Total Sales', '', Number(xReport?.totalSales || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })],
            ['Summary', 'Avg Ticket', '', Number(xReport?.avgTransactionValue || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })]
        ]

        downloadTablePdf({
            title: 'X Report',
            subtitle: `Sales Analysis | ${printRangeText}`,
            columns: ['Section', 'Name', 'Count / Qty', 'Amount (LKR)'],
            rows,
            filename: `X_Report_${new Date().toISOString().slice(0, 10)}.pdf`
        })
    }

    const handlePrintZReport = async () => {
        if (!canRunZClose) return
        const { isConfirmed } = await Swal.fire({
            icon: 'warning',
            title: 'Close shift (Z Report)?',
            html: 'This <strong>saves the Z report</strong>, <strong>closes the register shift</strong> (totals reset for the next period), and downloads the PDF.<br/><br/>New sales will require <strong>Open shift</strong> on POS first.',
            showCancelButton: true,
            confirmButtonText: 'Yes, close shift',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#64748b'
        })
        if (!isConfirmed) return
        setZPrintSaving(true)
        try {
            const saved = await salesApi.closeZReport()
            downloadZReportPdf(saved, `Archived #${saved.id} | ${printRangeText}`)
            await loadShift()
            await Swal.fire({
                icon: 'success',
                title: 'Shift closed',
                text: `Z Report #${saved.id} saved. Open a new shift on POS to sell again.`,
                confirmButtonColor: '#0d9488'
            })
        } catch (err) {
            await Swal.fire({
                icon: 'error',
                title: 'Z Report failed',
                text: err?.message || 'Could not close shift or save Z report.',
                confirmButtonColor: '#0d9488'
            })
        } finally {
            setZPrintSaving(false)
        }
    }

    return (
        <div className="analysis-container">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Sales Analysis</h1>
                    <p className="page-subtitle">Fancy Shop Performance & Growth Insights</p>
                </div>
                <div className="header-actions">
                    <input
                        type="date"
                        className="year-select"
                        value={reportDateRange.fromDate}
                        onChange={(e) => setReportDateRange((prev) => ({ ...prev, fromDate: e.target.value }))}
                    />
                    <input
                        type="date"
                        className="year-select"
                        value={reportDateRange.toDate}
                        onChange={(e) => setReportDateRange((prev) => ({ ...prev, toDate: e.target.value }))}
                    />
                    <select
                        className="year-select"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <button
                        type="button"
                        className="btn-refresh"
                        onClick={() => { loadShift(); fetchData() }}
                        disabled={loading}
                    >
                        {loading ? '⟳ Updating...' : '⟳ Refresh'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="analysis-error">
                    <FontAwesomeIcon icon={faExclamationTriangle} /> {error}
                </div>
            )}

            <div
                className={`analysis-card wide sa-register-panel ${openShift ? 'sa-register-panel--open' : 'sa-register-panel--closed'}`}
            >
                <div className="sa-register-panel__main">
                    <div className="sa-register-panel__status">
                        <span className={`sa-register-dot ${openShift ? 'sa-register-dot--on' : 'sa-register-dot--off'}`} aria-hidden />
                        <FontAwesomeIcon icon={faClock} className="sa-register-panel__icon" />
                        <div className="sa-register-panel__text">
                            {!shiftReady ? (
                                <p className="sa-register-panel__title">Checking register…</p>
                            ) : openShift ? (
                                <>
                                    <p className="sa-register-panel__title">
                                        Register open — <strong>Shift #{openShift.id}</strong>
                                    </p>
                                    <p className="sa-register-panel__meta">
                                        Since {openShift.openedAt ? new Date(openShift.openedAt).toLocaleString() : '—'}
                                        {openShift.openedBy && (
                                            <>
                                                {' '}
                                                · {openShift.openedBy.firstName} {openShift.openedBy.lastName}
                                            </>
                                        )}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="sa-register-panel__title">No open shift</p>
                                    <p className="sa-register-panel__meta">
                                        Open a shift on <strong>POS</strong> before taking sales. X and Z below use the <strong>date range</strong> in the header.
                                        <strong> Z Report &amp; close shift</strong> is only available while a shift is open and you choose <strong>Current shift</strong>.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="sa-register-panel__scope">
                        <span className="sa-scope-label">X / Z scope</span>
                        <div className="sa-mode-segment" role="group" aria-label="X and Z report scope">
                            <button
                                type="button"
                                className={`sa-mode-segment__btn ${!useShiftForXZ ? 'sa-mode-segment__btn--active' : ''}`}
                                onClick={() => setUseShiftForXZ(false)}
                            >
                                <FontAwesomeIcon icon={faCalendarAlt} /> Date range
                            </button>
                            <button
                                type="button"
                                className={`sa-mode-segment__btn ${useShiftForXZ ? 'sa-mode-segment__btn--active' : ''}`}
                                disabled={!shiftReady || !openShift?.id}
                                title={
                                    !shiftReady
                                        ? 'Checking shift…'
                                        : !openShift?.id
                                            ? 'Open a shift on POS first'
                                            : 'Totals for the open register shift only'
                                }
                                onClick={() => setUseShiftForXZ(true)}
                            >
                                <FontAwesomeIcon icon={faChartBar} /> Current shift
                            </button>
                        </div>
                        <p className="sa-scope-hint">Uses the two dates in the page header for <strong>Date range</strong>.</p>
                    </div>
                </div>
            </div>

            {/* KPI Summary Cards */}
            <div className="analysis-stats-row">
                <div className="stat-card primary">
                    <span className="stat-label"><FontAwesomeIcon icon={faCalendarDay} /> Today's Sales</span>
                    <span className="stat-value">{formatCurrency(todaySales)}</span>
                    <span className="stat-footer">{today}</span>
                </div>
                <div className="stat-card secondary">
                    <span className="stat-label"><FontAwesomeIcon icon={faCalendarAlt} /> This Month ({new Date().toLocaleString('default', { month: 'long' })})</span>
                    <span className="stat-value">{formatCurrency(monthSales)}</span>
                    <span className="stat-footer">Monthly revenue</span>
                </div>
                <div className="stat-card tertiary">
                    <span className="stat-label"><FontAwesomeIcon icon={faChartBar} /> Year Total ({selectedYear})</span>
                    <span className="stat-value">{formatCurrency(yearSales)}</span>
                    <span className="stat-footer">Cumulative sales</span>
                </div>
            </div>

            <div className="analysis-grid">

                {/* ======= Sales Performance Metrics - Daily / Monthly / Yearly ======= */}
                <section className="analysis-card wide">
                    <div className="card-header">
                        <h3><FontAwesomeIcon icon={faChartLine} /> Sales Performance Metrics</h3>
                        <div className="metric-tabs">
                            {['daily', 'monthly', 'yearly'].map(tab => (
                                <button
                                    key={tab}
                                    className={`metric-tab-btn ${activeMetricTab === tab ? 'active' : ''}`}
                                    style={activeMetricTab === tab ? { borderColor: metricColors[tab], color: metricColors[tab], background: `${metricColors[tab]}10` } : {}}
                                    onClick={() => setActiveMetricTab(tab)}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300} minWidth={0}>
                            <AreaChart data={activeChartData}>
                                <defs>
                                    <linearGradient id={`colorMetric`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={activeColor} stopOpacity={0.15} />
                                        <stop offset="95%" stopColor={activeColor} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 11, fill: '#64748b' }}
                                    interval={activeMetricTab === 'daily' ? 4 : 0}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 11, fill: '#64748b' }}
                                    tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
                                />
                                <Tooltip
                                    formatter={(v) => [formatCurrency(v), 'Revenue']}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 25px rgba(0,0,0,0.1)', background: '#fff' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke={activeColor}
                                    strokeWidth={2.5}
                                    fillOpacity={1}
                                    fill="url(#colorMetric)"
                                    dot={activeMetricTab !== 'daily' ? { r: 4, fill: activeColor } : false}
                                    activeDot={{ r: 6, fill: activeColor }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Summary row below chart */}
                    <div className="metric-summary-row">
                        <div className="metric-summary-item">
                            <span className="summary-label">Total Revenue</span>
                            <span className="summary-value" style={{ color: activeColor }}>
                                {formatCurrency(activeChartData.reduce((s, d) => s + d.sales, 0))}
                            </span>
                        </div>
                        <div className="metric-summary-item">
                            <span className="summary-label">Peak Day/Month</span>
                            <span className="summary-value">
                                {activeChartData.reduce((best, d) => d.sales > (best?.sales || 0) ? d : best, null)?.name || 'N/A'}
                            </span>
                        </div>
                        <div className="metric-summary-item">
                            <span className="summary-label">Data Points</span>
                            <span className="summary-value">{activeChartData.length}</span>
                        </div>
                    </div>
                </section>

                {/* ======= Top Selling Products ======= */}
                <section className="analysis-card">
                    <div className="card-header">
                        <h3><FontAwesomeIcon icon={faTrophy} /> Top Selling Products</h3>
                        <span className="card-badge purple">By Units</span>
                    </div>
                    <div className="chart-wrapper">
                        {topProductsChartData.length === 0 ? (
                            <div className="no-data">No sales data available</div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topProductsChartData} layout="vertical" margin={{ left: 0, right: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="#f1f5f9" />
                                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fill: '#475569', fontWeight: 600 }}
                                        width={110}
                                    />
                                    <Tooltip
                                        formatter={(v, name) => [
                                            name === 'qty' ? `${v} units` : formatCurrency(v),
                                            name === 'qty' ? 'Units Sold' : 'Revenue'
                                        ]}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="qty" radius={[0, 4, 4, 0]} barSize={16}>
                                        {topProductsChartData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </section>

                {/* ======= X & Z Reports ======= */}
                <section className="analysis-card wide sa-xz-section">
                    <div className="card-header sa-xz-header">
                        <div>
                            <h3><FontAwesomeIcon icon={faChartBar} /> X Report &amp; Z Report</h3>
                            <span className="sa-xz-scope-badge" title="Figures shown in tables below">
                                Showing: {xzScopeLabel}
                            </span>
                        </div>
                        <div className="sa-xz-actions">
                            <button type="button" className="btn-refresh" onClick={handlePrintXReport}>
                                <FontAwesomeIcon icon={faPrint} /> Print X Report
                            </button>
                            <button
                                type="button"
                                className="btn-refresh sa-btn-z-close"
                                onClick={handlePrintZReport}
                                disabled={!canRunZClose || zPrintSaving || loading}
                                title={
                                    !canRunZClose
                                        ? 'Open a shift on POS, choose “Current shift”, then close with Z'
                                        : 'Saves Z archive and closes the register shift'
                                }
                            >
                                <FontAwesomeIcon icon={faPrint} /> {zPrintSaving ? 'Closing…' : 'Z Report & close shift'}
                            </button>
                        </div>
                    </div>
                    {xzError && (
                        <div className="sa-xz-error">
                            <FontAwesomeIcon icon={faExclamationTriangle} /> {xzError}
                        </div>
                    )}
                    <p className="sa-xz-intro">
                        <strong>X Report</strong> is read-only (any time). <strong>Z Report</strong> ends the shift: saves an archive, <strong>closes the register</strong>, and requires an open shift + <strong>Current shift</strong> scope. Archives: <strong>Reports → Z Report</strong>.
                    </p>
                    {xReport?.shiftScopeUnavailable && useShiftForXZ && (
                        <p className="sa-xz-fallback-notice">
                            You chose <strong>Current shift</strong>, but there is no open shift — numbers below are for the <strong>selected date range</strong>.
                        </p>
                    )}
                    <div className="analysis-stats-row" style={{ marginBottom: '16px' }}>
                        <div className="stat-card primary">
                            <span className="stat-label">X Report Sales Total</span>
                            <span className="stat-value">{formatCurrency(xReport?.totalSales || 0)}</span>
                            <span className="stat-footer">{xReport?.transactionCount || 0} transactions</span>
                        </div>
                        <div className="stat-card secondary">
                            <span className="stat-label">X Report Avg Ticket</span>
                            <span className="stat-value">{formatCurrency(xReport?.avgTransactionValue || 0)}</span>
                            <span className="stat-footer">{xReport?.fromDate || reportDateRange.fromDate} to {xReport?.toDate || reportDateRange.toDate}</span>
                        </div>
                        <div className="stat-card tertiary">
                            <span className="stat-label">Z Report Grand Total</span>
                            <span className="stat-value">{formatCurrency(zReport?.grandTotal || 0)}</span>
                            <span className="stat-footer">{zReport?.dailyTotals?.length || 0} day records</span>
                        </div>
                    </div>
                    <div className="analysis-stats-row" style={{ marginBottom: '20px' }}>
                        <div className="stat-card primary">
                            <span className="stat-label">Total cash sales</span>
                            <span className="stat-value">{formatCurrency(xReport?.totalCashSale ?? zReport?.totalCashSale ?? 0)}</span>
                            <span className="stat-footer">X / Z period</span>
                        </div>
                        <div className="stat-card secondary">
                            <span className="stat-label">Total card sales</span>
                            <span className="stat-value">{formatCurrency(xReport?.totalCardSale ?? zReport?.totalCardSale ?? 0)}</span>
                            <span className="stat-footer">X / Z period</span>
                        </div>
                    </div>
                    <div className="analysis-grid">
                        <div className="analysis-table-wrapper">
                            <table className="analysis-table">
                                <thead>
                                    <tr>
                                        <th colSpan="3">X Report - Payment Breakdown</th>
                                    </tr>
                                    <tr>
                                        <th>Payment</th>
                                        <th>Count</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(xReport?.payments || []).length === 0 ? (
                                        <tr><td colSpan="3" className="no-data">No payment data</td></tr>
                                    ) : (
                                        (xReport.payments || []).map((p) => (
                                            <tr key={p.paymentMethod}>
                                                <td>{p.paymentMethod}</td>
                                                <td>{p.count}</td>
                                                <td className="amount-cell">{formatCurrency(p.amount)}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="analysis-table-wrapper">
                            <table className="analysis-table">
                                <thead>
                                    <tr>
                                        <th colSpan="5">Z Report - Daily Totals</th>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <th>Txns</th>
                                        <th>Total</th>
                                        <th>Cash</th>
                                        <th>Card</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(zReport?.dailyTotals || []).length === 0 ? (
                                        <tr><td colSpan="5" className="no-data">No daily totals</td></tr>
                                    ) : (
                                        <>
                                            {(zReport.dailyTotals || []).map((d) => (
                                                <tr key={d.date}>
                                                    <td className="date-cell">{d.date}</td>
                                                    <td>{d.transactionCount}</td>
                                                    <td className="amount-cell">{formatCurrency(d.totalSales)}</td>
                                                    <td>{formatCurrency(d.cashSales ?? 0)}</td>
                                                    <td>{formatCurrency(d.cardSales ?? 0)}</td>
                                                </tr>
                                            ))}
                                            <tr style={{ fontWeight: 800, background: '#f8fafc' }}>
                                                <td>Period total</td>
                                                <td>{zReport?.transactionCount ?? 0}</td>
                                                <td className="amount-cell">{formatCurrency(zReport?.grandTotal ?? 0)}</td>
                                                <td>{formatCurrency(zReport?.totalCashSale ?? 0)}</td>
                                                <td>{formatCurrency(zReport?.totalCardSale ?? 0)}</td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

            </div>

            <div className="bottom-accent-line"></div>
        </div>
    )
}

export default SalesAnalysis
