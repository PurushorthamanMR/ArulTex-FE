import * as XLSX from 'xlsx'

/**
 * Common Excel Export Utility
 * @param {Object} options
 * @param {string} options.title - Document title (sheet name)
 * @param {Array<string>} options.columns - Column headers
 * @param {Array<Array<any>>} options.rows - Data rows
 * @param {string} options.filename - Filename to save as
 */
export function downloadTableExcel({ title = 'Sheet1', columns = [], rows = [], filename = 'export.xlsx' }) {
    try {
        // Combine columns and rows
        const data = [columns, ...rows]

        // Create worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(data)

        // Create workbook
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, title.substring(0, 31))

        // Generate and download file
        XLSX.writeFile(workbook, filename)
    } catch (error) {
        console.error('Excel export failed:', error)
        alert('Failed to export Excel file')
    }
}
