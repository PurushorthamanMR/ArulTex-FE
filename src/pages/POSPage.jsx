import { useState, useEffect, useCallback, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faMinus, faTrash, faPrint, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { getCategoryIcon } from '../utils/categoryIcons'
import POSHeader from '../components/POSHeader'
import POSSidebar from '../components/POSSidebar'
import * as productApi from '../api/productApi'
import * as categoryApi from '../api/categoryApi'
import '../styles/POSPage.css'

function POSPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null) // null = show category boxes; string = show products for that category
  const [cart, setCart] = useState([]) // { productId, productName, barcode, price, quantity, lineTotal }
  const [searchQuery, setSearchQuery] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [searchError, setSearchError] = useState('')
  const searchInputRef = useRef(null)
  const searchErrorTimerRef = useRef(null)

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
    }
  }, [])

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
    const price = productApi.calcFinalPrice(product.pricePerUnit, 0)
    const name = normName(product)
    const existing = cart.find((c) => c.productId === pid)
    if (existing) {
      setCart((prev) => prev.map((c) => c.productId === pid ? { ...c, quantity: c.quantity + qty, lineTotal: (c.quantity + qty) * c.price } : c))
    } else {
      setCart((prev) => [...prev, { productId: pid, productName: name, barcode: product.barcode, price, quantity: qty, lineTotal: qty * price }])
    }
  }

  const updateQty = (productId, delta) => {
    const pid = normId(productId)
    setCart((prev) => prev.map((c) => {
      if (c.productId !== pid) return c
      const q = Math.max(0, c.quantity + delta)
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

  const invoiceNo = `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(Date.now()).slice(-6)}`

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="pos-page">
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
                          <span className="pos-product-price">₹{productApi.calcFinalPrice(p.pricePerUnit, p.discountPercent || 0)}</span>
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
                          <span className="pos-product-price">₹{productApi.calcFinalPrice(p.pricePerUnit, p.discountPercent || 0)}</span>
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
              <div className="pos-cart">
                <div className="pos-cart-header">
                  <h3 className="pos-cart-title">Current Sale</h3>
                  {cart.length > 0 && <span className="pos-cart-badge">{cart.length} item{cart.length !== 1 ? 's' : ''}</span>}
                </div>
                {cart.length === 0 ? (
                  <p className="pos-cart-empty">Cart is empty</p>
                ) : (
                  <div className="pos-cart-bill-wrap">
                    <table className="pos-cart-table">
                      <thead>
                        <tr>
                          <th className="pos-cart-th-item">Item</th>
                          <th className="pos-cart-th-qty">Qty</th>
                          <th className="pos-cart-th-price">Price</th>
                          <th className="pos-cart-th-total">Total</th>
                          <th className="pos-cart-th-action"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((c) => (
                          <tr key={c.productId} className="pos-cart-tr">
                            <td className="pos-cart-td-item">{c.productName}</td>
                            <td className="pos-cart-td-qty">
                              <div className="pos-cart-qty">
                                <button type="button" onClick={() => updateQty(c.productId, -1)} aria-label="Decrease"><FontAwesomeIcon icon={faMinus} /></button>
                                <span>{c.quantity}</span>
                                <button type="button" onClick={() => updateQty(c.productId, 1)} aria-label="Increase"><FontAwesomeIcon icon={faPlus} /></button>
                              </div>
                            </td>
                            <td className="pos-cart-td-price">₹{c.price.toFixed(2)}</td>
                            <td className="pos-cart-td-total">₹{c.lineTotal.toFixed(2)}</td>
                            <td className="pos-cart-td-action">
                              <button type="button" className="pos-cart-remove" onClick={() => removeFromCart(c.productId)} title="Remove"><FontAwesomeIcon icon={faTrash} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="pos-cart-footer">
                  <div className="pos-total-block">
                    <div className="pos-subtotal">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="pos-total">
                      <span>Total</span>
                      <span className="pos-total-amount">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="pos-payment-method">
                    <label>Payment method</label>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="pos-payment-select">
                      <option value="cash">Cash</option>
                      <option value="card">Card</option>
                      <option value="upi">UPI</option>
                    </select>
                  </div>
                  <div className="pos-cart-actions">
                    <button type="button" className="pos-complete-btn" disabled={cart.length === 0}>
                      Complete Sale
                    </button>
                    <button type="button" className="pos-print-btn" onClick={handlePrint} disabled={cart.length === 0}>
                      <FontAwesomeIcon icon={faPrint} /> Print Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <div id="pos-invoice-print" className="pos-invoice-print" aria-hidden="true">
        <div className="pos-invoice-paper">
          <div className="pos-invoice-head">
            <img src="/logo.jpg" alt="Logo" className="pos-invoice-logo" />
            <div className="pos-invoice-brand">
              <h1 className="pos-invoice-title">Aruntex & Fancy Palace</h1>
              <p className="pos-invoice-place">Nelliady</p>
            </div>
          </div>
          <div className="pos-invoice-meta">
            <div className="pos-invoice-meta-row">
              <span className="pos-invoice-label">Invoice No:</span>
              <span className="pos-invoice-value">{invoiceNo}</span>
            </div>
            <div className="pos-invoice-meta-row">
              <span className="pos-invoice-label">Date:</span>
              <span className="pos-invoice-value">{new Date().toLocaleDateString('en-IN')}</span>
            </div>
            <div className="pos-invoice-meta-row">
              <span className="pos-invoice-label">Time:</span>
              <span className="pos-invoice-value">{new Date().toLocaleTimeString('en-IN', { hour12: true, hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
          <table className="pos-invoice-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((c, idx) => (
                <tr key={c.productId}>
                  <td>{idx + 1}</td>
                  <td>{c.productName}</td>
                  <td>{c.quantity}</td>
                  <td>₹{c.price.toFixed(2)}</td>
                  <td>₹{c.lineTotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pos-invoice-totals">
            <div className="pos-invoice-total-row">
              <span className="pos-invoice-total-label">Subtotal</span>
              <span className="pos-invoice-total-value">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="pos-invoice-total-row pos-invoice-grand">
              <span className="pos-invoice-total-label">Total</span>
              <span className="pos-invoice-total-value">₹{total.toFixed(2)}</span>
            </div>
            <div className="pos-invoice-payment">
              <span className="pos-invoice-label">Payment:</span>
              <span className="pos-invoice-value">{paymentMethod.toUpperCase()}</span>
            </div>
          </div>
          <p className="pos-invoice-thanks">Thank you for your purchase</p>
        </div>
      </div>
    </div>
  )
}

export default POSPage
