import ExcelJS from 'exceljs'

/**
 * Common Excel Export Utility (uses ExcelJS – no known high-severity vulnerabilities).
 * @param {Object} options
 * @param {string} options.title - Document title (sheet name)
 * @param {Array<string>} options.columns - Column headers
 * @param {Array<Array<any>>} options.rows - Data rows
 * @param {string} options.filename - Filename to save as
 */
export async function downloadTableExcel({ title = 'Sheet1', columns = [], rows = [], filename = 'export.xlsx' }) {
  try {
    const data = [columns, ...rows]
    const workbook = new ExcelJS.Workbook()
    const sheetName = title.substring(0, 31)
    const worksheet = workbook.addWorksheet(sheetName, { views: [{ state: 'frozen', ySplit: 1 }] })
    worksheet.addRows(data)
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Excel export failed:', error)
    alert('Failed to export Excel file')
  }
}
