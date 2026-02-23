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
