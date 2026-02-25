import { useState, useEffect, useCallback } from 'react'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie, Legend
} from 'recharts'
import * as salesApi from '../api/salesApi'
import '../styles/SalesAnalysis.css'

const COLORS = ['#0d9488', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function SalesAnalysis() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const [activeMetricTab, setActiveMetricTab] = useState('daily')
    const [trendData, setTrendData] = useState({ daily: [], monthly: [], yearly: [] })
    const [topProducts, setTopProducts] = useState([])
    const [profitability, setProfitability] = useState([])
    const [lowStock, setLowStock] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const [trend, top, profit, low] = await Promise.all([
                salesApi.getTrends(),
                salesApi.getTopProducts(10),
                salesApi.getProfitability(),
                salesApi.getLowStock()
            ])
            setTrendData(trend)
            setTopProducts(Array.isArray(top) ? top : [])
            setProfitability(Array.isArray(profit) ? profit : [])
            setLowStock(Array.isArray(low) ? low : [])
        } catch (err) {
            setError(err.message || 'Failed to load analysis data')
        } finally {
            setLoading(false)
        }
    }, [])

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

    // --- Profitability Chart ---
    const profitabilityChartData = profitability
        .filter(p => p.profit > 0)
        .map(p => ({
            name: p.categoryName,
            value: Math.round(Number(p.profit))
        }))

    // Best Category
    const sortedProfit = [...profitabilityChartData].sort((a, b) => b.value - a.value)
    const bestCat = sortedProfit[0]?.name || 'N/A'
    const totalRevenue = profitability.reduce((s, p) => s + p.revenue, 0)
    const totalProfit = profitability.reduce((s, p) => s + p.profit, 0)
    const avgMargin = totalRevenue > 0 ? Math.round((totalProfit / totalRevenue) * 100) : 0

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

    return (
        <div className="analysis-container">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Sales Analysis</h1>
                    <p className="page-subtitle">Fancy Shop — Performance & Growth Insights</p>
                </div>
                <div className="header-actions">
                    <select
                        className="year-select"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <button type="button" className="btn-refresh" onClick={fetchData} disabled={loading}>
                        {loading ? '⟳ Updating...' : '⟳ Refresh'}
                    </button>
                </div>
            </div>

            {error && <div className="analysis-error">⚠️ {error}</div>}

            {/* KPI Summary Cards */}
            <div className="analysis-stats-row">
                <div className="stat-card primary">
                    <span className="stat-label">📅 Today's Sales</span>
                    <span className="stat-value">{formatCurrency(todaySales)}</span>
                    <span className="stat-footer">{today}</span>
                </div>
                <div className="stat-card secondary">
                    <span className="stat-label">📆 This Month ({new Date().toLocaleString('default', { month: 'long' })})</span>
                    <span className="stat-value">{formatCurrency(monthSales)}</span>
                    <span className="stat-footer">Monthly revenue</span>
                </div>
                <div className="stat-card tertiary">
                    <span className="stat-label">📊 Year Total ({selectedYear})</span>
                    <span className="stat-value">{formatCurrency(yearSales)}</span>
                    <span className="stat-footer">Cumulative sales</span>
                </div>
            </div>

            <div className="analysis-grid">

                {/* ======= Sales Performance Metrics - Daily / Monthly / Yearly ======= */}
                <section className="analysis-card wide">
                    <div className="card-header">
                        <h3>📈 Sales Performance Metrics</h3>
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
                        <ResponsiveContainer width="100%" height="100%">
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
                        <h3>🏆 Top Selling Products</h3>
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

                {/* ======= Profitability Analysis ======= */}
                <section className="analysis-card">
                    <div className="card-header">
                        <h3>💰 Profitability Analysis</h3>
                        <span className="card-badge orange">By Category</span>
                    </div>
                    {profitabilityChartData.length === 0 ? (
                        <div className="no-data">No profitability data available</div>
                    ) : (
                        <>
                            <div style={{ height: '220px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={profitabilityChartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={55}
                                            outerRadius={85}
                                            paddingAngle={3}
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            labelLine={false}
                                        >
                                            {profitabilityChartData.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(v) => [formatCurrency(v), 'Profit']}
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="retail-metrics">
                                <div className="retail-metric-item">
                                    <span className="retail-metric-label">Best Category</span>
                                    <span className="retail-metric-value" style={{ color: COLORS[0], fontSize: '13px' }}>{bestCat}</span>
                                </div>
                                <div className="retail-metric-item">
                                    <span className="retail-metric-label">Total Profit</span>
                                    <span className="retail-metric-value" style={{ fontSize: '13px' }}>{formatCurrency(totalProfit)}</span>
                                </div>
                                <div className="retail-metric-item">
                                    <span className="retail-metric-label">Avg Margin</span>
                                    <span className="retail-metric-value" style={{ color: avgMargin >= 20 ? '#059669' : '#dc2626', fontSize: '13px' }}>{avgMargin}%</span>
                                </div>
                            </div>
                        </>
                    )}
                </section>

                {/* ======= Low Stock Alerts ======= */}
                <section className="analysis-card wide">
                    <div className="card-header">
                        <h3>🚨 Low Stock Alerts</h3>
                        <span className="card-badge red">{lowStock.length} Items Need Restocking</span>
                    </div>
                    {lowStock.length === 0 ? (
                        <div className="no-data">✅ All inventory levels are healthy</div>
                    ) : (
                        <div className="low-stock-grid">
                            {lowStock.slice(0, 8).map(item => (
                                <div key={item.id} className="low-stock-item">
                                    <div className="item-info">
                                        <span className="item-name">{item.productName}</span>
                                        <span className="item-cat">{item.category?.categoryName || 'Uncategorized'}</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                                        <span className="item-qty-badge">Stock: {item.stockQty}</span>
                                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>Min: {item.minStockLevel}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {lowStock.length > 8 && (
                        <p style={{ textAlign: 'center', fontSize: '12px', color: '#dc2626', marginTop: '12px' }}>
                            + {lowStock.length - 8} more items critically low
                        </p>
                    )}
                </section>

            </div>

            <div className="bottom-accent-line"></div>
        </div>
    )
}

export default SalesAnalysis
