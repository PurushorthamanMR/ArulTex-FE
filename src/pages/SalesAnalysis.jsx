import { useState, useEffect, useCallback } from 'react'
import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts'
import * as salesApi from '../api/salesApi'
import '../styles/SalesAnalysis.css'

function SalesAnalysis() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const [trendData, setTrendData] = useState({ daily: [], monthly: [], yearly: [] })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchTrends = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await salesApi.getTrends()
            setTrendData(data)
        } catch (err) {
            setError(err.message || 'Failed to load trend data')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchTrends()
    }, [fetchTrends])

    // Formatter for Currency
    const formatCurrency = (val) => `LKR ${Number(val).toLocaleString('en-LK')}`

    // Daily Trend Processing (Show last 30 days)
    const dailyData = (trendData.daily || []).map(d => ({
        name: d.date ? new Date(d.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) : '-',
        sales: Number(d.totalAmount)
    }))

    // Monthly Trend Processing (Filtered by selected year)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const monthlyData = (trendData.monthly || [])
        .filter(m => m.year === selectedYear)
        .map(m => ({
            name: monthNames[m.month - 1],
            sales: Number(m.totalAmount)
        }))

    // Yearly Trend Processing
    const yearlyData = (trendData.yearly || []).map(y => ({
        name: String(y.year),
        sales: Number(y.totalAmount)
    }))

    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)

    return (
        <div className="analysis-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Sales Analysis</h1>
                    <p className="page-subtitle">Visual performance trends and analytics</p>
                </div>
                <div className="header-actions">
                    <select
                        className="year-select"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <button type="button" className="btn-refresh" onClick={fetchTrends} disabled={loading}>
                        {loading ? 'Updating...' : 'Refresh Data'}
                    </button>
                </div>
            </div>

            {error && <div className="analysis-error">{error}</div>}

            <div className="analysis-grid">
                {/* Daily Sales Trend */}
                <section className="analysis-card wide">
                    <div className="card-header">
                        <h3>Daily Sales Trend (Last 30 Days)</h3>
                        <span className="card-badge">Daily</span>
                    </div>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={dailyData}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(v) => `LKR ${v / 1000}k`} />
                                <Tooltip
                                    formatter={(v) => [formatCurrency(v), 'Sales']}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="sales" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                {/* Sales Summary Table */}
                <section className="analysis-card wide">
                    <div className="card-header">
                        <h3>Daily Sales Summary</h3>
                        <span className="card-badge">Recent History</span>
                    </div>
                    <div className="analysis-table-wrapper">
                        <table className="analysis-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Total Revenue</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trendData.daily.length === 0 ? (
                                    <tr><td colSpan="3" className="no-data">No data available</td></tr>
                                ) : (
                                    [...trendData.daily].reverse().slice(0, 7).map((d, i) => (
                                        <tr key={i}>
                                            <td className="date-cell">{new Date(d.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                            <td className="amount-cell">{formatCurrency(d.totalAmount)}</td>
                                            <td><span className="status-indicator">Settled</span></td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Monthly Sales Comparison */}
                <section className="analysis-card">
                    <div className="card-header">
                        <h3>Monthly Growth</h3>
                        <span className="card-badge purple">Monthly</span>
                    </div>
                    <div className="chart-wrapper">
                        {/* ... (previous BarChart code) ... */}
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(v) => `LKR ${v / 1000}k`} />
                                <Tooltip
                                    formatter={(v) => [formatCurrency(v), 'Sales']}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                {/* Yearly Overview */}
                <section className="analysis-card">
                    <div className="card-header">
                        <h3>Yearly Overview</h3>
                        <span className="card-badge orange">Yearly</span>
                    </div>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={yearlyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(v) => `LKR ${v / 1000}k`} />
                                <Tooltip
                                    formatter={(v) => [formatCurrency(v), 'Sales']}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Line type="stepAfter" dataKey="sales" stroke="#f59e0b" strokeWidth={4} dot={{ r: 6, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </section>
            </div>

            <div className="bottom-accent-line"></div>
        </div>
    )
}

export default SalesAnalysis
