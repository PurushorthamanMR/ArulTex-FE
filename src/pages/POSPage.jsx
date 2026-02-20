import POSHeader from '../components/POSHeader'
import POSSidebar from '../components/POSSidebar'
import '../styles/POSPage.css'

function POSPage() {
  return (
    <div className="pos-page">
      <POSHeader />
      <div className="pos-layout">
        <POSSidebar />
        <main className="pos-main">
          <div className="pos-content-placeholder">
            <h2>POS</h2>
            <p>Point of Sale content will appear here.</p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default POSPage
