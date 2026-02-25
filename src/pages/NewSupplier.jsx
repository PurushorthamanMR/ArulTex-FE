import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as supplierApi from '../api/supplierApi'
import '../styles/NewSupplier.css'

function NewSupplier() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  const [formData, setFormData] = useState({
    supplierName: '',
    email: '',
    mobileNumber: '',
    address: '',
    isActive: true
  })
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState(null)
  const [saveError, setSaveError] = useState(null)

  useEffect(() => {
    if (!isEdit) return
    let cancelled = false
    setLoadError(null)
    supplierApi.getById(id).then((s) => {
      if (!cancelled) {
        setFormData({
          supplierName: s.supplierName || '',
          email: s.email || '',
          mobileNumber: s.phone || '',
          address: s.address || '',
          isActive: s.isActive !== false
        })
      }
    }).catch((err) => {
      if (!cancelled) setLoadError(err.message || 'Failed to load supplier')
    })
    return () => { cancelled = true }
  }, [id, isEdit])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'isActive') {
      setFormData((prev) => ({ ...prev, isActive: value === 'true' }))
      return
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaveError(null)
    setLoading(true)
    try {
      const payload = {
        supplierName: formData.supplierName,
        email: formData.email,
        phone: formData.mobileNumber,
        address: formData.address,
        isActive: formData.isActive
      }
      if (isEdit) await supplierApi.update(id, payload)
      else await supplierApi.save(payload)
      navigate('/suppliers')
    } catch (err) {
      setSaveError(err.message || 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="new-supplier-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">{isEdit ? 'Edit Supplier' : 'New Supplier'}</h1>
          <p className="page-subtitle">{isEdit ? 'Update supplier' : 'Create new supplier'}</p>
        </div>
        <button type="button" className="back-btn" onClick={() => navigate('/suppliers')}>← Back to Supplier</button>
      </div>

      {loadError && <div className="supplier-form-error">{loadError}</div>}

      <form className="supplier-form" onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="supplierName">Supplier Name</label>
          <input type="text" id="supplierName" name="supplierName" value={formData.supplierName} onChange={handleInputChange} placeholder="Enter Supplier Name" className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter Email" className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Phone / Mobile</label>
          <input type="tel" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} placeholder="Enter Mobile Number" className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter Address" className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="isActive">Status</label>
          <select id="isActive" name="isActive" value={formData.isActive ? 'true' : 'false'} onChange={handleInputChange} className="form-select">
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        {saveError && <div className="supplier-form-error">{saveError}</div>}
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate('/suppliers')}>Cancel</button>
          <button type="submit" className="save-btn" disabled={loading}>{loading ? 'Saving...' : isEdit ? 'Update Supplier' : 'Save Supplier'}</button>
        </div>
      </form>
    </div>
  )
}

export default NewSupplier
