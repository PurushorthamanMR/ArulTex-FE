/**
 * Export table data to PDF using jsPDF + jspdf-autotable.
 * Usage: downloadTablePdf({ title, subtitle?, columns, rows, filename })
 * - columns: array of header strings
 * - rows: array of arrays (each row = array of cell values in same order as columns)
 */
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export function downloadTablePdf({ title, subtitle, columns, rows, filename }) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  doc.setFontSize(16)
  doc.text(title, 14, 15)
  if (subtitle) {
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(subtitle, 14, 22)
    doc.setTextColor(0, 0, 0)
  }
  const startY = subtitle ? 28 : 22
  autoTable(doc, {
    head: [columns],
    body: rows.length ? rows : [['No data']],
    startY,
    theme: 'grid',
    headStyles: { fillColor: [13, 148, 136], textColor: 255 },
    margin: { left: 14, right: 14 }
  })
  const finalY = doc.lastAutoTable.finalY || startY
  doc.setFontSize(9)
  doc.setTextColor(120, 120, 120)
  doc.text(`Generated on ${new Date().toLocaleString()}`, 14, finalY + 10)
  doc.save(filename || `${title.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`)
}

/**
 * Z Report PDF (daily totals + grand total). Use after close API returns saved record with id.
 * @param {object} zReport - { id?, fromDate, toDate, dailyTotals, grandTotal, transactionCount }
 * @param {string} [subtitle] - e.g. period or "Archived #12"
 */
export function downloadZReportPdf(zReport, subtitle) {
  const fmt = (n) => Number(n || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })
  const rows = [
    ...((zReport?.dailyTotals || []).map((d) => [
      d.date,
      String(d.transactionCount),
      fmt(d.totalSales),
      fmt(d.cashSales),
      fmt(d.cardSales)
    ])),
    [
      'TOTAL',
      String(zReport?.transactionCount || 0),
      fmt(zReport?.grandTotal),
      fmt(zReport?.totalCashSale),
      fmt(zReport?.totalCardSale)
    ]
  ]
  const idPart = zReport?.id != null ? ` #${zReport.id}` : ''
  const period =
    subtitle ||
    (zReport?.fromDate && zReport?.toDate ? `${zReport.fromDate} to ${zReport.toDate}` : '')
  downloadTablePdf({
    title: `Z Report${idPart}`,
    subtitle: period || undefined,
    columns: ['Date', 'Transactions', 'Total (LKR)', 'Cash (LKR)', 'Card (LKR)'],
    rows,
    filename: `Z_Report_${zReport?.id ?? 'new'}_${new Date().toISOString().slice(0, 10)}.pdf`
  })
}
