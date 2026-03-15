import { useState, useEffect, useCallback, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faMinus, faTrash, faPrint, faArrowLeft, faEllipsisH, faChevronRight, faChevronLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { getCategoryIcon } from '../utils/categoryIcons'
import POSHeader from '../components/POSHeader'
import POSSidebar from '../components/POSSidebar'
import * as productApi from '../api/productApi'
import * as categoryApi from '../api/categoryApi'
import * as salesApi from '../api/salesApi'
import * as customerApi from '../api/customerApi'
import '../styles/POSPage.css'

function POSPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null) // null = show category boxes; string = show products for that category
  const [cart, setCart] = useState([]) // { productId, productName, barcode, price, quantity, lineTotal }
  const [searchQuery, setSearchQuery] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [searchError, setSearchError] = useState('')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [customers, setCustomers] = useState([])
  const [customerSearch, setCustomerSearch] = useState('')
  const [selectedCustomerId, setSelectedCustomerId] = useState(null)
  const [customersLoading, setCustomersLoading] = useState(false)
  const [showCreateCustomerForm, setShowCreateCustomerForm] = useState(false)
  const [newCustomerForm, setNewCustomerForm] = useState({ customerName: '', phone: '', email: '', address: '' })
  const [createCustomerError, setCreateCustomerError] = useState('')
  const [creatingCustomer, setCreatingCustomer] = useState(false)
  const [orderToast, setOrderToast] = useState(null) // { type: 'success'|'error', message: string }
  const [draftInvoiceNo, setDraftInvoiceNo] = useState(() => `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(Date.now()).slice(-6)}`)
  const searchInputRef = useRef(null)
  const orderToastTimerRef = useRef(null)
  const searchErrorTimerRef = useRef(null)

  const generateNewInvoiceNo = () => `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(Date.now()).slice(-6)}`

  const fetchProducts = useCallback(async () => {
    try {
      const res = await productApi.getAll({ page: 1, pageSize: 500, isActive: true })
      setProducts(res.content || [])
    } catch {
      setProducts([])
    }
  }, [])

  const fetchCategories = useCallback(async () => {
    try {
      const list = await categoryApi.getAll()
      setCategories(Array.isArray(list) ? list.filter((c) => c.isActive !== false) : [])
    } catch {
      setCategories([])
    }
  }, [])

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [fetchProducts, fetchCategories])

  useEffect(() => {
    return () => {
      if (searchErrorTimerRef.current) clearTimeout(searchErrorTimerRef.current)
      if (orderToastTimerRef.current) clearTimeout(orderToastTimerRef.current)
    }
  }, [])

  const showOrderToast = (type, message) => {
    if (orderToastTimerRef.current) clearTimeout(orderToastTimerRef.current)
    setOrderToast({ type, message })
    orderToastTimerRef.current = setTimeout(() => {
      setOrderToast(null)
      orderToastTimerRef.current = null
    }, 4500)
  }

  const dismissOrderToast = () => {
    if (orderToastTimerRef.current) clearTimeout(orderToastTimerRef.current)
    orderToastTimerRef.current = null
    setOrderToast(null)
  }

  const normId = (id) => (id != null ? Number(id) : null)
  const normName = (p) => (p && (p.productName ?? p.name)) || 'Product'
  const getProductBarcode = (p) => {
    const raw = p.barcode ?? p.barCode
    if (raw == null || raw === '') return ''
    const s = String(raw).trim()
    return s
  }

  const addToCart = (product, qty = 1) => {
    const pid = normId(product.id)
    const price = productApi.calcFinalPrice(product.pricePerUnit, product.discountPercent || 0)
    const name = normName(product)

    // Check if enough stock available
    const stockAvailable = product.quantity ?? 0
    const existing = cart.find((c) => c.productId === pid)
    const currentInCart = existing ? existing.quantity : 0

    if (currentInCart + qty > stockAvailable) {
      setSearchError(`Insufficient stock! (Available: ${stockAvailable})`)
      if (searchErrorTimerRef.current) clearTimeout(searchErrorTimerRef.current)
      searchErrorTimerRef.current = setTimeout(() => setSearchError(''), 3000)
      return
    }

    if (existing) {
      setCart((prev) => prev.map((c) => c.productId === pid ? { ...c, quantity: c.quantity + qty, lineTotal: (c.quantity + qty) * c.price } : c))
    } else {
      setCart((prev) => [...prev, { productId: pid, productName: name, barcode: product.barcode, price, quantity: qty, lineTotal: qty * price }])
    }
  }

  const updateQty = (productId, delta) => {
    const pid = normId(productId)
    const product = products.find(p => normId(p.id) === pid)
    const stockAvailable = product ? (product.quantity ?? 0) : 999999

    setCart((prev) => prev.map((c) => {
      if (c.productId !== pid) return c
      const q = Math.max(0, c.quantity + delta)

      if (delta > 0 && q > stockAvailable) {
        setSearchError(`Insufficient stock! (Available: ${stockAvailable})`)
        if (searchErrorTimerRef.current) clearTimeout(searchErrorTimerRef.current)
        searchErrorTimerRef.current = setTimeout(() => setSearchError(''), 3000)
        return c
      }

      if (q === 0) return null
      return { ...c, quantity: q, lineTotal: q * c.price }
    }).filter(Boolean))
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((c) => c.productId !== normId(productId)))
  }

  const categoryFiltered = selectedCategory
    ? products.filter((p) => (p.category || '') === selectedCategory)
    : products

  const searchTrimmed = searchQuery.trim()
  const searchLower = searchTrimmed.toLowerCase()

  const filteredProducts = searchTrimmed
    ? products.filter((p) => {
      const name = (p.productName ?? p.name) || ''
      const barcode = getProductBarcode(p)
      const matchName = name.toLowerCase().includes(searchLower)
      const matchBarcode = barcode !== '' && (barcode.toLowerCase().includes(searchLower) || barcode === searchTrimmed)
      return matchName || matchBarcode
    })
    : categoryFiltered

  const filteredCategories = searchTrimmed && !selectedCategory
    ? categories.filter((c) => (c.categoryName || '').toLowerCase().includes(searchLower))
    : categories

  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    const q = searchTrimmed
    if (!q) return
    if (searchErrorTimerRef.current) {
      clearTimeout(searchErrorTimerRef.current)
      searchErrorTimerRef.current = null
    }
    setSearchError('')
    let product = products.find((p) => getProductBarcode(p) === q) || filteredProducts[0]
    if (!product) {
      try {
        const [byBarcodeList, byNameList] = await Promise.all([
          productApi.search({ barCode: q, isActive: true }),
          productApi.search({ productName: q, isActive: true })
        ])
        const merged = [...byBarcodeList]
        byNameList.forEach((p) => {
          if (!merged.some((x) => normId(x.id) === normId(p.id))) merged.push(p)
        })
        const exactBarcode = merged.find((p) => getProductBarcode(p) === q)
        const exactName = merged.find((p) => (p.productName ?? p.name ?? '').toLowerCase() === searchLower)
        product = exactBarcode || exactName || merged[0]
        if (product) {
          setProducts((prev) => (prev.some((p) => normId(p.id) === normId(product.id)) ? prev : [product, ...prev]))
        }
      } catch {
        product = null
      }
    }
    if (product) {
      addToCart(product)
      setSearchQuery('')
    } else {
      setSearchError('No product found')
      searchErrorTimerRef.current = setTimeout(() => setSearchError(''), 3000)
    }
    searchInputRef.current?.focus()
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    if (searchError) setSearchError('')
  }

  const showCategoryBoxes = selectedCategory === null

  const subtotal = cart.reduce((sum, c) => sum + c.lineTotal, 0)
  const total = subtotal

  const handlePrint = () => {
    window.print()
  }

  const handleNextClick = () => {
    if (cart.length === 0 || isPlacingOrder) return
    setSelectedCustomerId(null)
    setCustomerSearch('')
    setShowCreateCustomerForm(false)
    setNewCustomerForm({ customerName: '', phone: '', email: '', address: '' })
    setCreateCustomerError('')
    setShowCustomerModal(true)
    setCustomersLoading(true)
    customerApi.getAll().then((list) => {
      setCustomers(Array.isArray(list) ? list.filter((c) => c.isActive !== false) : [])
    }).catch(() => setCustomers([])).finally(() => setCustomersLoading(false))
  }

  const handleNewCustomerChange = (e) => {
    const { name, value } = e.target
    setNewCustomerForm((prev) => ({ ...prev, [name]: value }))
    if (createCustomerError) setCreateCustomerError('')
  }

  const handleCreateCustomer = async () => {
    const name = (newCustomerForm.customerName || '').trim()
    if (!name) {
      setCreateCustomerError('Customer name is required.')
      return
    }
    setCreatingCustomer(true)
    setCreateCustomerError('')
    try {
      const saved = await customerApi.save({
        customerName: name,
        phone: (newCustomerForm.phone || '').trim() || null,
        email: (newCustomerForm.email || '').trim() || null,
        address: (newCustomerForm.address || '').trim() || null,
        isActive: true
      })
      setCustomers((prev) => [...prev, saved])
      setSelectedCustomerId(saved.id)
      setShowCreateCustomerForm(false)
      setNewCustomerForm({ customerName: '', phone: '', email: '', address: '' })
    } catch (err) {
      setCreateCustomerError(err.message || 'Failed to create customer.')
    } finally {
      setCreatingCustomer(false)
    }
  }

  const filteredCustomers = customerSearch.trim()
    ? customers.filter(
        (c) =>
          (c.customerName || '').toLowerCase().includes(customerSearch.trim().toLowerCase()) ||
          (c.phone || '').includes(customerSearch.trim()) ||
          (c.email || '').toLowerCase().includes(customerSearch.trim().toLowerCase())
      )
    : customers

  const doPlaceOrder = async (customerId) => {
    if (cart.length === 0 || isPlacingOrder) return
    setShowCustomerModal(false)
    setIsPlacingOrder(true)
    try {
      const saleData = {
        invoiceNo: draftInvoiceNo,
        paymentMethod,
        ...(customerId != null && { customerId }),
        items: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.price,
          discountAmount: 0
        }))
      }
      await salesApi.save(saleData)
      showOrderToast('success', 'Order placed successfully!')
      handlePrint()
      setCart([])
      setPaymentMethod('cash')
      setDraftInvoiceNo(generateNewInvoiceNo())
      fetchProducts()
    } catch (error) {
      console.error('Error placing order:', error)
      showOrderToast('error', error.message || 'Failed to place order. Please try again.')
    } finally {
      setIsPlacingOrder(false)
    }
  }

  const handleCustomerConfirm = () => {
    doPlaceOrder(selectedCustomerId ?? null)
  }

  return (
    <div className="pos-page">
      {orderToast && (
        <div className={`pos-order-toast pos-order-toast-${orderToast.type}`} role="alert">
          <span className="pos-order-toast-message">{orderToast.message}</span>
          <button type="button" className="pos-order-toast-dismiss" onClick={dismissOrderToast} aria-label="Dismiss">×</button>
        </div>
      )}
      <POSHeader />
      <div className="pos-layout">
        <POSSidebar />
        <main className="pos-main">
          <div className="pos-content">
            <div className="pos-left">
              <div className="pos-inputs-card">
                <h3 className="pos-section-label">Scan or search</h3>
                <form onSubmit={handleSearchSubmit} className="pos-search-form">
                  <div className="pos-search-wrap">
                    <span className="pos-search-icon-wrap" aria-hidden="true">
                      <FontAwesomeIcon icon={faSearch} className="pos-search-icon" />
                    </span>
                    <input
                      ref={searchInputRef}
                      type="text"
                      className="pos-search-input"
                      placeholder="Scan barcode or search by name..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => setSearchError('')}
                      autoComplete="off"
                      autoFocus
                      aria-label="Scan barcode or search by product name"
                    />
                  </div>
                  <button type="submit" className="pos-search-add-btn">Add</button>
                </form>
                {searchError && (
                  <p className="pos-search-error" role="alert">
                    {searchError}
                  </p>
                )}
              </div>

              <div className="pos-products-section">
                <div className="pos-products-section-head">
                  <h3 className="pos-section-label">
                    {searchTrimmed ? 'Search results' : showCategoryBoxes ? 'Categories' : 'Products'}
                  </h3>
                  {searchTrimmed ? null : !showCategoryBoxes && (
                    <button type="button" className="pos-back-categories" onClick={() => setSelectedCategory(null)} title="Back to categories">
                      <FontAwesomeIcon icon={faArrowLeft} /> Back to categories
                    </button>
                  )}
                </div>
                {searchTrimmed ? (
                  <div className="pos-product-grid">
                    {filteredProducts.map((p) => {
                      const pid = normId(p.id)
                      const inCart = cart.find((c) => c.productId === pid)
                      return (
                        <button
                          type="button"
                          key={pid}
                          className={`pos-product-card ${inCart ? 'pos-product-in-cart' : ''}`}
                          onClick={() => addToCart(p)}
                        >
                          {p.categoryId != null && (
                            <span className="pos-product-category-icon" title={p.category || ''}>
                              <FontAwesomeIcon icon={getCategoryIcon(p.categoryId)} />
                            </span>
                          )}
                          {(p.discountPercent != null && Number(p.discountPercent) > 0) && (
                            <span className="pos-product-discount-badge">{p.discountPercent}% OFF</span>
                          )}
                          {inCart && <span className="pos-product-cart-badge">In cart: {inCart.quantity}</span>}
                          <span className="pos-product-name">{normName(p)}</span>
                          <div className="pos-product-footer-info">
                            <span className="pos-product-price">LKR {productApi.calcFinalPrice(p.pricePerUnit, p.discountPercent || 0)}</span>
                            <span className={`pos-product-stock ${p.quantity <= (p.lowStock || 0) ? 'low' : ''}`}>
                              Stock: {p.quantity}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                    {filteredProducts.length === 0 && (
                      <p className="pos-no-items">No products found</p>
                    )}
                  </div>
                ) : showCategoryBoxes ? (
                  <div className="pos-category-grid">
                    {filteredCategories.map((c) => (
                      <button
                        type="button"
                        key={c.id}
                        className="pos-category-box"
                        onClick={() => setSelectedCategory(c.categoryName)}
                      >
                        <span className="pos-category-box-icon-wrap">
                          <FontAwesomeIcon icon={getCategoryIcon(c.id)} className="pos-category-box-icon" />
                        </span>
                        <span className="pos-category-box-name">{c.categoryName}</span>
                      </button>
                    ))}
                    {filteredCategories.length === 0 && (
                      <p className="pos-no-items">No categories found</p>
                    )}
                  </div>
                ) : (
                  <div className="pos-product-grid">
                    {filteredProducts.map((p) => {
                      const pid = normId(p.id)
                      const inCart = cart.find((c) => c.productId === pid)
                      return (
                        <button
                          type="button"
                          key={pid}
                          className={`pos-product-card ${inCart ? 'pos-product-in-cart' : ''}`}
                          onClick={() => addToCart(p)}
                        >
                          {p.categoryId != null && (
                            <span className="pos-product-category-icon" title={p.category || ''}>
                              <FontAwesomeIcon icon={getCategoryIcon(p.categoryId)} />
                            </span>
                          )}
                          {(p.discountPercent != null && Number(p.discountPercent) > 0) && (
                            <span className="pos-product-discount-badge">{p.discountPercent}% OFF</span>
                          )}
                          {inCart && <span className="pos-product-cart-badge">In cart: {inCart.quantity}</span>}
                          <span className="pos-product-name">{normName(p)}</span>
                          <div className="pos-product-footer-info">
                            <span className="pos-product-price">LKR {productApi.calcFinalPrice(p.pricePerUnit, p.discountPercent || 0)}</span>
                            <span className={`pos-product-stock ${p.quantity <= (p.lowStock || 0) ? 'low' : ''}`}>
                              Stock: {p.quantity}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                    {filteredProducts.length === 0 && (
                      <p className="pos-no-items">No products in this category</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="pos-right">
              <div className="pos-cart-container">
                <div className="pos-cart-header-new">
                  <button className="pos-header-icon-btn"><FontAwesomeIcon icon={faChevronLeft} /></button>
                  <div className="pos-receipt-title">
                    <div className="pos-receipt-label">Purchase Receipt</div>
                    <div className="pos-receipt-id">#{draftInvoiceNo.split('-').pop()}</div>
                  </div>
                  <button className="pos-header-icon-btn"><FontAwesomeIcon icon={faEllipsisH} /></button>
                </div>

                <div className="pos-payment-tabs">
                  <button
                    className={`pos-payment-tab ${paymentMethod === 'cash' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('cash')}
                  >Cash</button>
                  <button
                    className={`pos-payment-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >Card</button>
                </div>

                <div className="pos-orders-list-label">Orders List</div>
                <div className="pos-orders-scroll-area">
                  {cart.length === 0 ? (
                    <p className="pos-cart-empty">Cart is empty</p>
                  ) : (
                    <div className="pos-cart-items-list">
                      {cart.map((c) => (
                        <div key={c.productId} className="pos-cart-item-card">
                          <div className="pos-item-info">
                            <div className="pos-item-name">{c.productName}</div>
                            <div className="pos-item-footer">
                              <div className="pos-item-qty-picker">
                                <button type="button" onClick={() => updateQty(c.productId, -1)}><FontAwesomeIcon icon={faMinus} /></button>
                                <span>{c.quantity}</span>
                                <button type="button" onClick={() => updateQty(c.productId, 1)}><FontAwesomeIcon icon={faPlus} /></button>
                              </div>
                              <div className="pos-item-price">LKR {c.lineTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pos-payment-summary">
                  <div className="pos-summary-header">Payment Details</div>
                  <div className="pos-summary-row">
                    <span>Subtotal</span>
                    <span>LKR {subtotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="pos-summary-row total">
                    <span>Total</span>
                    <span>LKR {subtotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div className="pos-cart-actions-row">
                  <button
                    className="pos-place-order-btn"
                    disabled={cart.length === 0 || isPlacingOrder}
                    onClick={handleNextClick}
                  >
                    <div className="pos-btn-circle">
                      {isPlacingOrder ? <div className="pos-spinner" /> : <FontAwesomeIcon icon={faChevronRight} />}
                    </div>
                    <span>{isPlacingOrder ? 'Processing...' : `Next LKR ${subtotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`}</span>
                    <div className="pos-btn-arrows">
                      <FontAwesomeIcon icon={faChevronRight} />
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </button>
                  <button type="button" className="pos-cart-print-icon-btn" onClick={handlePrint} disabled={cart.length === 0} title="Print Invoice">
                    <FontAwesomeIcon icon={faPrint} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showCustomerModal && (
        <div className="pos-customer-modal-overlay" onClick={() => setShowCustomerModal(false)} role="dialog" aria-modal="true" aria-labelledby="pos-customer-modal-title">
          <div className="pos-customer-modal" onClick={(e) => e.stopPropagation()}>
            <h2 id="pos-customer-modal-title" className="pos-customer-modal-title">
              {showCreateCustomerForm ? 'Create Customer' : 'Select Customer'}
            </h2>
            <p className="pos-customer-modal-subtitle">
              {showCreateCustomerForm ? 'Add a new customer and use for this sale.' : 'Choose a customer for this sale or continue as walk-in.'}
            </p>

            {showCreateCustomerForm ? (
              <div className="pos-customer-create-form">
                <div className="pos-customer-create-field">
                  <label htmlFor="pos-new-customer-name">Customer Name *</label>
                  <input
                    id="pos-new-customer-name"
                    type="text"
                    name="customerName"
                    value={newCustomerForm.customerName}
                    onChange={handleNewCustomerChange}
                    placeholder="Enter name"
                    className="pos-customer-modal-input"
                    autoFocus
                  />
                </div>
                <div className="pos-customer-create-field">
                  <label htmlFor="pos-new-customer-phone">Phone</label>
                  <input
                    id="pos-new-customer-phone"
                    type="text"
                    name="phone"
                    value={newCustomerForm.phone}
                    onChange={handleNewCustomerChange}
                    placeholder="Phone number"
                    className="pos-customer-modal-input"
                  />
                </div>
                <div className="pos-customer-create-field">
                  <label htmlFor="pos-new-customer-email">Email</label>
                  <input
                    id="pos-new-customer-email"
                    type="email"
                    name="email"
                    value={newCustomerForm.email}
                    onChange={handleNewCustomerChange}
                    placeholder="Email"
                    className="pos-customer-modal-input"
                  />
                </div>
                <div className="pos-customer-create-field">
                  <label htmlFor="pos-new-customer-address">Address</label>
                  <textarea
                    id="pos-new-customer-address"
                    name="address"
                    value={newCustomerForm.address}
                    onChange={handleNewCustomerChange}
                    placeholder="Address"
                    className="pos-customer-modal-input pos-customer-create-textarea"
                    rows={2}
                  />
                </div>
                {createCustomerError && (
                  <p className="pos-customer-create-error" role="alert">{createCustomerError}</p>
                )}
                <div className="pos-customer-create-form-actions">
                  <button type="button" className="pos-customer-modal-cancel" onClick={() => { setShowCreateCustomerForm(false); setCreateCustomerError(''); }}>
                    Back
                  </button>
                  <button type="button" className="pos-customer-modal-confirm" onClick={handleCreateCustomer} disabled={creatingCustomer}>
                    {creatingCustomer ? 'Saving...' : 'Save & Use'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="pos-customer-modal-search">
                  <input
                    type="text"
                    className="pos-customer-modal-input"
                    placeholder="Search by name, phone or email..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    autoFocus
                  />
                </div>
                <button
                  type="button"
                  className={`pos-customer-modal-walkin ${selectedCustomerId === null ? 'selected' : ''}`}
                  onClick={() => setSelectedCustomerId(null)}
                >
                  Walk-in (No customer)
                </button>
                <button
                  type="button"
                  className="pos-customer-modal-create-btn"
                  onClick={() => setShowCreateCustomerForm(true)}
                >
                  <FontAwesomeIcon icon={faUserPlus} />
                  <span>Create new customer</span>
                </button>
                <div className="pos-customer-modal-list">
                  {customersLoading ? (
                    <p className="pos-customer-modal-loading">Loading customers...</p>
                  ) : (
                    filteredCustomers.slice(0, 50).map((c) => (
                      <button
                        type="button"
                        key={c.id}
                        className={`pos-customer-modal-item ${selectedCustomerId === c.id ? 'selected' : ''}`}
                        onClick={() => setSelectedCustomerId(c.id)}
                      >
                        <span className="pos-customer-modal-item-name">{c.customerName}</span>
                        {(c.phone || c.email) && (
                          <span className="pos-customer-modal-item-meta">{[c.phone, c.email].filter(Boolean).join(' · ')}</span>
                        )}
                      </button>
                    ))
                  )}
                  {!customersLoading && filteredCustomers.length === 0 && customers.length > 0 && (
                    <p className="pos-customer-modal-no-match">No customers match your search.</p>
                  )}
                  {!customersLoading && customers.length === 0 && (
                    <p className="pos-customer-modal-empty">No customers yet. Create one below or add from the Customer page.</p>
                  )}
                </div>
                <div className="pos-customer-modal-actions">
                  <button type="button" className="pos-customer-modal-cancel" onClick={() => setShowCustomerModal(false)}>
                    Cancel
                  </button>
                  <button type="button" className="pos-customer-modal-confirm" onClick={handleCustomerConfirm} disabled={isPlacingOrder}>
                    {isPlacingOrder ? 'Processing...' : 'Confirm & Place Order'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div id="pos-invoice-print" className="pos-invoice-print" aria-hidden="true">
        <div className="pos-invoice-paper">
          <div className="pos-invoice-header-center">
            <img src="/ATF.png" alt="Logo" className="pos-invoice-logo-center" />
            <p className="pos-invoice-welcome">Welcome to ArulTex</p>
            <h1 className="pos-invoice-store-name">ArulTex & Fancy Palace</h1>
            <p className="pos-invoice-address">
              Nelliady, Jaffna,<br />
              Sri Lanka (40000)<br />
              tin no 1234567
            </p>
            <p className="pos-invoice-meta-info">
              Date : {new Date().toLocaleDateString('en-LK')} Time: {new Date().toLocaleTimeString('en-LK', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}<br />
              Order Id #{draftInvoiceNo.split('-').pop()}
            </p>
          </div>

          <table className="pos-invoice-table-new">
            <thead>
              <tr>
                <th>Product</th>
                <th className="text-center">Qty</th>
                <th className="text-right">Final Price</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((c) => (
                <tr key={c.productId}>
                  <td>{c.productName}</td>
                  <td className="text-center">{c.quantity}</td>
                  <td className="text-right">LKR {c.price.toLocaleString('en-LK', { minimumFractionDigits: 0 })}</td>
                  <td className="text-right">LKR {c.lineTotal.toLocaleString('en-LK', { minimumFractionDigits: 0 })}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pos-invoice-summary-new">
            <div className="pos-invoice-summary-row">
              <div className="pos-summary-left">
                <strong>Total Quantity</strong>
                <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <div className="pos-summary-right">
                <div className="pos-summary-line">
                  <strong>Sub-Total</strong>
                  <span>LKR {subtotal.toLocaleString('en-LK', { minimumFractionDigits: 0 })}</span>
                </div>
                <div className="pos-summary-line">
                  <strong>Grand-Total</strong>
                  <span>LKR {subtotal.toLocaleString('en-LK', { minimumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="pos-invoice-footer-msg">
            Please share your love again by visiting our store "arultex.com"
          </p>
        </div>
      </div>
    </div>
  )
}

export default POSPage
