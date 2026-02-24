import { useState, useEffect, useCallback, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faMinus, faTrash, faPrint, faArrowLeft, faEllipsisH, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { getCategoryIcon } from '../utils/categoryIcons'
import POSHeader from '../components/POSHeader'
import POSSidebar from '../components/POSSidebar'
import * as productApi from '../api/productApi'
import * as categoryApi from '../api/categoryApi'
import * as salesApi from '../api/salesApi'
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

  const invoiceNo = `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(Date.now()).slice(-6)}`

  const handlePrint = () => {
    window.print()
  }

  const handlePlaceOrder = async () => {
    if (cart.length === 0 || isPlacingOrder) return

    setIsPlacingOrder(true)
    try {
      const saleData = {
        invoiceNo,
        paymentMethod,
        items: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.price,
          discountAmount: 0 // Currently not handled individually
        }))
      }

      await salesApi.save(saleData)

      // Successfully saved!
      alert('Order Placed Successfully!')

      // Print the bill automatically
      handlePrint()

      // Clear cart for next sale
      setCart([])
      setPaymentMethod('cash')

      // REFRESH PRODUCTS to see updated stock
      fetchProducts()

    } catch (error) {
      console.error('Error placing order:', error)
      alert(error.message || 'Failed to place order. Please try again.')
    } finally {
      setIsPlacingOrder(false)
    }
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
                    <div className="pos-receipt-id">#546294</div>
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
                    onClick={handlePlaceOrder}
                  >
                    <div className="pos-btn-circle">
                      {isPlacingOrder ? <div className="pos-spinner" /> : <FontAwesomeIcon icon={faChevronRight} />}
                    </div>
                    <span>{isPlacingOrder ? 'Processing...' : `Place Order LKR ${subtotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`}</span>
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

      <div id="pos-invoice-print" className="pos-invoice-print" aria-hidden="true">
        <div className="pos-invoice-paper">
          <div className="pos-invoice-header-center">
            <img src="/logo.jpg" alt="Logo" className="pos-invoice-logo-center" />
            <p className="pos-invoice-welcome">Welcome to ArulTex</p>
            <h1 className="pos-invoice-store-name">ArulTex & Fancy Palace</h1>
            <p className="pos-invoice-address">
              Nelliady, Jaffna,<br />
              Sri Lanka (40000)<br />
              tin no 1234567
            </p>
            <p className="pos-invoice-meta-info">
              Date : {new Date().toLocaleDateString('en-LK')} Time: {new Date().toLocaleTimeString('en-LK', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}<br />
              Order Id #{invoiceNo.split('-').pop()}
            </p>
          </div>

          <table className="pos-invoice-table-new">
            <thead>
              <tr>
                <th>Product</th>
                <th className="text-center">Qty</th>
                <th className="text-right">Price</th>
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
