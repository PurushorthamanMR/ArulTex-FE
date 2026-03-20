import { useState, useEffect, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faMinus, faTrash, faPrint, faArrowLeft, faChevronRight, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { getCategoryIcon } from '../utils/categoryIcons'
import POSHeader from '../components/POSHeader'
import POSSidebar from '../components/POSSidebar'
import * as productApi from '../api/productApi'
import * as categoryApi from '../api/categoryApi'
import * as salesApi from '../api/salesApi'
import * as shiftApi from '../api/shiftApi'
import * as customerApi from '../api/customerApi'
import { getPhoneValidationError } from '../utils/phoneValidation'
import Swal from 'sweetalert2'
import { downloadZReportPdf } from '../utils/pdfExport'
import TransactionReport from './TransactionReport'
import ZReportPage from './ZReportPage'
import BarcodePage from './BarcodePage'
import StockPage from './StockPage'
import CustomerList from './CustomerList'
import NewCustomer from './NewCustomer'

// Staff-specific POS management pages (do not reuse dashboard customer components).
import PosCustomerList from './pos/PosCustomerList'
import PosCustomerNew from './pos/PosCustomerNew'
import PosCustomerEdit from './pos/PosCustomerEdit'
import '../styles/POSPage.css'

function POSPage() {
  const location = useLocation()
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
  const [showPaymentPopup, setShowPaymentPopup] = useState(false)
  const [cashGiven, setCashGiven] = useState('')
  const [paymentError, setPaymentError] = useState('')
  const [cartDiscountPercent, setCartDiscountPercent] = useState('')
  const [lastPrintPayment, setLastPrintPayment] = useState(null) // { paymentMethod, cashReceived, balanceAmount }
  const [draftInvoiceNo, setDraftInvoiceNo] = useState(() => `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(Date.now()).slice(-6)}`)
  const [posShift, setPosShift] = useState(null)
  const [shiftLoading, setShiftLoading] = useState(true)
  const [openingShift, setOpeningShift] = useState(false)
  const [zCloseLoading, setZCloseLoading] = useState(false)
  const searchInputRef = useRef(null)
  const orderToastTimerRef = useRef(null)
  const searchErrorTimerRef = useRef(null)
  const barcodeAutoAddTimerRef = useRef(null)
  const lastAutoAddedBarcodeRef = useRef('')
  const lastAutoAddedAtRef = useRef(0)
  const globalBarcodeBufferRef = useRef('')
  const globalBarcodeTimerRef = useRef(null)

  const generateNewInvoiceNo = () => `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(Date.now()).slice(-6)}`

  const posPath = location.pathname || ''
  const userRole = (localStorage.getItem('userRole') || '').toUpperCase()
  const isStaff = userRole === 'STAFF'
  const adminView = (() => {
    if (isStaff) {
      if (posPath === '/pos/customer') return { key: 'pos-customer-list', node: <PosCustomerList /> }
      if (posPath === '/pos/customer/new') return { key: 'pos-customer-new', node: <PosCustomerNew /> }
      if (posPath.startsWith('/pos/customer/edit/')) return { key: 'pos-customer-edit', node: <PosCustomerEdit /> }
      return null
    }

    if (posPath === '/pos/customer') return { key: 'customer-list', node: <CustomerList /> }
    if (posPath.startsWith('/pos/customer/')) return { key: 'customer-edit', node: <NewCustomer /> }
    if (posPath === '/pos/transaction') return { key: 'transaction', node: <TransactionReport /> }
    if (posPath === '/pos/z-report') return { key: 'z-report', node: <ZReportPage /> }
    if (posPath === '/pos/barcode') return { key: 'barcode', node: <BarcodePage /> }
    if (posPath === '/pos/stock') return { key: 'stock', node: <StockPage /> }
    return null
  })()

  /** No selling until shift status is known and a shift is open */
  const posSalesLocked = shiftLoading || !posShift?.id

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

  const loadPosShift = useCallback(async () => {
    setShiftLoading(true)
    try {
      const s = await shiftApi.getCurrent()
      setPosShift(s && s.id ? s : null)
    } catch {
      setPosShift(null)
    } finally {
      setShiftLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
    fetchCategories()
    loadPosShift()
  }, [fetchProducts, fetchCategories, loadPosShift])

  const handleOpenShift = async () => {
    setOpeningShift(true)
    try {
      const s = await shiftApi.openShift()
      setPosShift(s && s.id ? s : null)
      showOrderToast('success', 'Shift opened — you can take sales.')
    } catch (e) {
      showOrderToast('error', e.message || 'Could not open shift.')
    } finally {
      setOpeningShift(false)
    }
  }

  const handleCloseShift = useCallback(async () => {
    if (!posShift?.id || zCloseLoading) return
    const cartNote =
      cart.length > 0
        ? `<p style="margin:0 0 12px;text-align:left">Your cart still has <strong>${cart.length}</strong> line(s). Sales will lock until you open a new shift.</p>`
        : ''
    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      title: 'Close shift (Z Report)?',
      html: `${cartNote}<p style="margin:0;text-align:left">This <strong>saves the Z report</strong>, <strong>closes the register shift</strong>, and downloads the PDF. Use <strong>Open shift</strong> to sell again.</p>`,
      showCancelButton: true,
      confirmButtonText: 'Yes, close shift',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b'
    })
    if (!isConfirmed) return
    setZCloseLoading(true)
    try {
      const saved = await salesApi.closeZReport()
      const subtitle = posShift.openedAt
        ? `Shift #${posShift.id} · ${new Date(posShift.openedAt).toLocaleString()}`
        : `Shift #${posShift.id}`
      downloadZReportPdf(saved, `Archived #${saved.id} | ${subtitle}`)
      await loadPosShift()
      setCart([])
      setCartDiscountPercent('')
      setShowCustomerModal(false)
      setShowPaymentPopup(false)
      await Swal.fire({
        icon: 'success',
        title: 'Shift closed',
        text: `Z Report #${saved.id} saved. Open a new shift to continue selling.`,
        confirmButtonColor: '#0d9488'
      })
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Could not close shift',
        text: err?.message || 'Z Report failed. Try Sales Analysis or check permissions.',
        confirmButtonColor: '#0d9488'
      })
    } finally {
      setZCloseLoading(false)
    }
  }, [posShift, zCloseLoading, cart.length, loadPosShift])

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
    if (posSalesLocked) {
      showOrderToast(
        'error',
        shiftLoading ? 'Checking shift…' : 'Open a shift before adding items (use Open shift above or in the sidebar).'
      )
      return
    }
    const pid = normId(product.id)
    const purchasedPrice = Number(product.purchasedPrice ?? 0) // original unit selling price
    const discountPercent = Number(product.discountPercent ?? 0)
    // Cart/receipt must match the UI calculation (final price after product discount).
    const fallbackPrice = Number(product.pricePerUnit ?? 0)
    const price = purchasedPrice > 0
      ? Number(productApi.calcFinalPrice(purchasedPrice, discountPercent))
      : fallbackPrice
    const costPrice = purchasedPrice > 0 ? purchasedPrice : fallbackPrice
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
      setCart((prev) =>
        prev.map((c) =>
          c.productId === pid
            ? {
                ...c,
                quantity: c.quantity + qty,
                lineTotal: (c.quantity + qty) * c.price
              }
            : c
        )
      )
    } else {
      setCart((prev) => [
        ...prev,
        {
          productId: pid,
          productName: name,
          barcode: product.barcode,
          price,                 // selling price
          costPrice,             // original cost price (for crossed-out display)
          quantity: qty,
          lineTotal: qty * price
        }
      ])
    }
  }

  const updateQty = (productId, delta) => {
    if (posSalesLocked) return
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
    if (posSalesLocked) return
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
    if (posSalesLocked) {
      showOrderToast(
        'error',
        shiftLoading ? 'Checking shift…' : 'Open a shift before scanning or searching products.'
      )
      return
    }
    const q = searchTrimmed
    if (!q) return
    if (searchErrorTimerRef.current) {
      clearTimeout(searchErrorTimerRef.current)
      searchErrorTimerRef.current = null
    }
    setSearchError('')

    // Safer search: only auto-add on exact barcode
    let product = products.find((p) => getProductBarcode(p) === q)

    if (!product) {
      try {
        const byBarcodeList = await productApi.search({ barCode: q, isActive: true })
        const exactBarcode = Array.isArray(byBarcodeList)
          ? byBarcodeList.find((p) => getProductBarcode(p) === q)
          : null
        product = exactBarcode || null
        if (product) {
          setProducts((prev) => (prev.some((p) => normId(p.id) === normId(product.id)) ? prev : [product, ...prev]))
        }
      } catch {
        product = null
      }
    }

    if (product) {
      addToCart(product)
      // Keep scanned barcode visible in the input.
      lastAutoAddedBarcodeRef.current = q
      lastAutoAddedAtRef.current = Date.now()
      // Re-focus/select so the next scan replaces the existing text.
      requestAnimationFrame(() => {
        searchInputRef.current?.focus()
        searchInputRef.current?.select?.()
      })
    } else {
      setSearchError('No product found for this barcode')
      searchErrorTimerRef.current = setTimeout(() => setSearchError(''), 3000)
    }
    searchInputRef.current?.focus()
  }

  const handleSearchChange = (e) => {
    const nextValue = e.target.value
    setSearchQuery(nextValue)
    if (searchError) setSearchError('')

    // Auto-add when an exact barcode scan happens.
    if (posSalesLocked) return

    const q = String(nextValue || '').trim()
    if (!q || q.length < 4) return
    const now = Date.now()
    if (lastAutoAddedBarcodeRef.current === q && now - lastAutoAddedAtRef.current < 800) return
    if (/\s/.test(q)) return

    // Fast path: try exact match from existing products list.
    const localExact = products.find((p) => getProductBarcode(p) === q)
    if (localExact) {
      addToCart(localExact)
      lastAutoAddedBarcodeRef.current = q
      lastAutoAddedAtRef.current = Date.now()
      requestAnimationFrame(() => {
        searchInputRef.current?.focus()
        searchInputRef.current?.select?.()
      })
      return
    }

    // Debounced fallback: scan usually types fast; wait a bit for completion.
    if (barcodeAutoAddTimerRef.current) clearTimeout(barcodeAutoAddTimerRef.current)
    barcodeAutoAddTimerRef.current = setTimeout(async () => {
      if (posSalesLocked) return
      const currentInputValue = (searchInputRef.current?.value || '').trim()
      if (currentInputValue !== q) return

      try {
        const byBarcodeList = await productApi.search({ barCode: q, isActive: true })
        const exact = Array.isArray(byBarcodeList)
          ? byBarcodeList.find((p) => getProductBarcode(p) === q)
          : null

        if (!exact) return

        // Ensure the product exists in the local list for proper UI search results.
        setProducts((prev) => (prev.some((p) => normId(p.id) === normId(exact.id)) ? prev : [exact, ...prev]))

        addToCart(exact)
        lastAutoAddedBarcodeRef.current = q
        lastAutoAddedAtRef.current = Date.now()
        setSearchError('')
        requestAnimationFrame(() => {
          searchInputRef.current?.focus()
          searchInputRef.current?.select?.()
        })
      } catch {
        // Ignore errors during auto-scan; user can still press Add/Enter to search.
      }
    }, 250)
  }

  const addBarcodeToCart = async (barcode) => {
    if (posSalesLocked) return

    const q = String(barcode || '').trim()
    if (!q || q.length < 4) return
    const now = Date.now()
    if (lastAutoAddedBarcodeRef.current === q && now - lastAutoAddedAtRef.current < 800) return

    // Prefer local match first (faster + avoids extra requests).
    const localExact = products.find((p) => getProductBarcode(p) === q)
    if (localExact) {
      addToCart(localExact)
      lastAutoAddedBarcodeRef.current = q
      lastAutoAddedAtRef.current = Date.now()
      setSearchQuery(q)
      setSearchError('')
      requestAnimationFrame(() => {
        searchInputRef.current?.focus()
        searchInputRef.current?.select?.()
      })
      return
    }

    // Backend fallback.
    try {
      const byBarcodeList = await productApi.search({ barCode: q, isActive: true })
      const exact = Array.isArray(byBarcodeList)
        ? byBarcodeList.find((p) => getProductBarcode(p) === q)
        : null

      if (!exact) {
        setSearchError('No product found for this barcode')
        searchErrorTimerRef.current = setTimeout(() => setSearchError(''), 3000)
        return
      }

      setProducts((prev) => (prev.some((p) => normId(p.id) === normId(exact.id)) ? prev : [exact, ...prev]))
      addToCart(exact)
      lastAutoAddedBarcodeRef.current = q
      lastAutoAddedAtRef.current = Date.now()
      setSearchQuery(q)
      setSearchError('')

      requestAnimationFrame(() => {
        searchInputRef.current?.focus()
        searchInputRef.current?.select?.()
      })
    } catch {
      // Ignore errors during scanner input; user can still manually search.
    }
  }

  const showCategoryBoxes = selectedCategory === null

  // Global barcode capture:
  // Many scanners type keystrokes; if the scan input loses focus, cart won't update.
  // This listener captures the barcode even when focus isn't on `pos-search-input`,
  // then it auto-adds to cart/bill and re-focuses the input for next scan.
  useEffect(() => {
    const isTypingElement = (el) => {
      if (!el) return false
      const tag = (el.tagName || '').toLowerCase()
      return tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable
    }

    const onKeyDown = (e) => {
      // Only when POS is active and no customer/payment modal is open.
      if (posSalesLocked) return
      if (showPaymentPopup || showCustomerModal) return

      // If user is typing into some other input, don't interfere.
      if (isTypingElement(e.target)) return

      // If focus is already in the POS input, we already handle it via onChange/onSubmit.
      if (searchInputRef.current && document.activeElement === searchInputRef.current) return

      if (e.key === 'Escape') {
        globalBarcodeBufferRef.current = ''
        if (globalBarcodeTimerRef.current) clearTimeout(globalBarcodeTimerRef.current)
        return
      }

      if (e.key === 'Enter' || e.key === 'Tab') {
        if (globalBarcodeTimerRef.current) clearTimeout(globalBarcodeTimerRef.current)
        const code = globalBarcodeBufferRef.current.trim()
        globalBarcodeBufferRef.current = ''
        if (!code || code.length < 4) return
        addBarcodeToCart(code)
        return
      }

      // Accept common barcode characters.
      if (e.key.length === 1 && /[0-9a-zA-Z-]/.test(e.key)) {
        globalBarcodeBufferRef.current += e.key
      } else {
        return
      }

      if (globalBarcodeTimerRef.current) clearTimeout(globalBarcodeTimerRef.current)
      globalBarcodeTimerRef.current = setTimeout(() => {
        const code = globalBarcodeBufferRef.current.trim()
        globalBarcodeBufferRef.current = ''
        if (!code || code.length < 4) return
        addBarcodeToCart(code)
      }, 350)
    }

    const onPaste = (e) => {
      if (posSalesLocked) return
      if (showPaymentPopup || showCustomerModal) return

      const text = e.clipboardData?.getData('text') || ''
      const cleaned = String(text).replace(/[^0-9a-zA-Z]/g, '').trim()
      if (!cleaned || cleaned.length < 4) return

      // Clear buffer + add immediately (some scanners paste the whole barcode)
      globalBarcodeBufferRef.current = ''
      if (globalBarcodeTimerRef.current) clearTimeout(globalBarcodeTimerRef.current)
      addBarcodeToCart(cleaned)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('paste', onPaste)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('paste', onPaste)
    }
  }, [posSalesLocked, showPaymentPopup, showCustomerModal, addBarcodeToCart])

  // Totals
  // subtotal: based on sellingPrice (already in lineTotal)
  const subtotal = cart.reduce((sum, c) => sum + c.lineTotal, 0)
  // rawSubtotal: before any cart-level discount (same as subtotal when product discounts are baked into sellingPrice)
  const rawSubtotal = cart.reduce((sum, c) => {
    return sum + c.quantity * c.price
  }, 0)
  const productDiscountTotal = rawSubtotal - subtotal
  // Cart-level discount: user enters % (e.g. 10), applied on subtotal
  const discountPercentNum = Math.min(100, Math.max(0, Number(cartDiscountPercent) || 0))
  const discountAmount = Math.round(subtotal * (discountPercentNum / 100) * 100) / 100
  const discountTotal = productDiscountTotal + discountAmount
  const total = Math.round((subtotal - discountAmount) * 100) / 100

  const handleClearCart = () => {
    if (cart.length === 0 || isPlacingOrder) return
    setCart([])
    setCartDiscountPercent('')
  }

  const handlePrint = () => {
    window.print()
  }

  const handleNextClick = () => {
    if (cart.length === 0 || isPlacingOrder) return
    if (!posShift?.id) {
      showOrderToast('error', 'No open shift. Tap “Open shift” above before taking payment.')
      return
    }
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

    const phoneTrimmed = (newCustomerForm.phone || '').trim()
    if (phoneTrimmed) {
      const phoneError = getPhoneValidationError(phoneTrimmed)
      if (phoneError) {
        setCreateCustomerError(phoneError)
        return
      }
    }

    setCreatingCustomer(true)
    setCreateCustomerError('')
    try {
      const saved = await customerApi.save({
        customerName: name,
        phone: phoneTrimmed || null,
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

  const doPlaceOrder = async (customerId, paymentInfo) => {
    if (cart.length === 0 || isPlacingOrder) return
    if (!posShift?.id) {
      showOrderToast('error', 'No open shift — cannot complete sale.')
      setShowPaymentPopup(false)
      setShowCustomerModal(false)
      return
    }
    setIsPlacingOrder(true)
    try {
      const saleData = {
        invoiceNo: draftInvoiceNo,
        paymentMethod: paymentInfo?.paymentMethod ?? paymentMethod,
        ...(customerId != null && { customerId }),
        totalAmount: total,
        discountPercentage: discountPercentNum,
        cashReceived: paymentInfo?.cashReceived ?? null,
        balanceAmount: paymentInfo?.balanceAmount ?? null,
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
      loadPosShift()
      // Full POS reset after successful transaction
      setCart([])
      setPaymentMethod('cash')
      setCartDiscountPercent('')
      setSearchQuery('')
      setSelectedCategory(null)
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
    setShowCustomerModal(false)
    setCashGiven('')
    setPaymentError('')
    setShowPaymentPopup(true)
  }

  return (
    <div className="pos-page">
      {orderToast && (
        <div className={`pos-order-toast pos-order-toast-${orderToast.type}`} role="alert">
          <span className="pos-order-toast-message">{orderToast.message}</span>
          <button type="button" className="pos-order-toast-dismiss" onClick={dismissOrderToast} aria-label="Dismiss">×</button>
        </div>
      )}
      <POSHeader
        openShift={posShift}
        shiftLoading={shiftLoading}
        onCloseShift={handleCloseShift}
        closingShift={zCloseLoading}
      />
      <div className={`pos-shift-bar ${posShift ? 'pos-shift-bar--open' : 'pos-shift-bar--closed'}`}>
        {shiftLoading ? (
          <span className="pos-shift-bar-text">Checking shift…</span>
        ) : posShift ? (
          <>
            <span className="pos-shift-bar-text">
              <strong>Shift #{posShift.id}</strong> open · since {posShift.openedAt ? new Date(posShift.openedAt).toLocaleString() : '—'}
              {posShift.openedBy && ` · ${posShift.openedBy.firstName} ${posShift.openedBy.lastName}`}
            </span>
            <span className="pos-shift-bar-hint">Close with Z Report (Sales Analysis) when done.</span>
          </>
        ) : (
          <>
            <span className="pos-shift-bar-text"><strong>No open shift</strong> — open before selling.</span>
            <button type="button" className="pos-shift-open-btn" onClick={handleOpenShift} disabled={openingShift}>
              {openingShift ? 'Opening…' : 'Open shift'}
            </button>
          </>
        )}
      </div>
      <div className="pos-layout">
        <POSSidebar
          shift={posShift}
          shiftLoading={shiftLoading}
          openingShift={openingShift}
          onOpenShift={handleOpenShift}
        />
        <main className="pos-main">
          <div className={`pos-content${posSalesLocked ? ' pos-content--sales-locked' : ''}`}>
            {posSalesLocked && !adminView && (
              <div
                className="pos-shift-lock-overlay"
                role="alertdialog"
                aria-live="polite"
                aria-labelledby="pos-shift-lock-title"
                aria-describedby="pos-shift-lock-desc"
              >
                <div className="pos-shift-lock-card">
                  <h2 id="pos-shift-lock-title" className="pos-shift-lock-title">
                    {shiftLoading ? 'Checking register…' : 'POS locked'}
                  </h2>
                  <p id="pos-shift-lock-desc" className="pos-shift-lock-text">
                    {shiftLoading
                      ? 'Please wait while we verify the register shift.'
                      : 'Open a register shift before scanning, adding to cart, or taking payment. Use Open shift in the bar above or in the left sidebar.'}
                  </p>
                  {!shiftLoading && (
                    <button
                      type="button"
                      className="pos-shift-lock-open-btn"
                      onClick={handleOpenShift}
                      disabled={openingShift}
                    >
                      {openingShift ? 'Opening…' : 'Open shift'}
                    </button>
                  )}
                </div>
              </div>
            )}
            {adminView ? (
              <div className="pos-admin-view">
                {adminView.node}
              </div>
            ) : (
              <>
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
                      placeholder={posSalesLocked ? 'Open shift to scan or search…' : 'Scan barcode or search by name...'}
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => setSearchError('')}
                      autoComplete="off"
                      autoFocus={!posSalesLocked}
                      disabled={posSalesLocked}
                      aria-label="Scan barcode or search by product name"
                      aria-disabled={posSalesLocked}
                    />
                  </div>
                  <button type="submit" className="pos-search-add-btn" disabled={posSalesLocked}>
                    Add
                  </button>
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
                    <button
                      type="button"
                      className="pos-back-categories"
                      onClick={() => setSelectedCategory(null)}
                      title="Back to categories"
                      disabled={posSalesLocked}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} /> Back to categories
                    </button>
                  )}
                </div>
                {searchTrimmed ? (
                  <div className="pos-product-grid">
                    {filteredProducts.map((p) => {
                      const pid = normId(p.id)
                      const inCart = cart.find((c) => c.productId === pid)
                      const remainingQty = Math.max(0, (p.quantity ?? 0) - (inCart?.quantity ?? 0))
                      return (
                        <button
                          type="button"
                          key={pid}
                          className={`pos-product-card ${inCart ? 'pos-product-in-cart' : ''}`}
                          onClick={() => addToCart(p)}
                          disabled={posSalesLocked}
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
                            <span className="pos-product-price">
                              <span className="pos-product-price-original">{p.purchasedPrice}</span>
                              <span className="pos-product-price-final">
                                {productApi.calcFinalPrice(p.purchasedPrice, p.discountPercent || 0)}
                              </span>
                            </span>
                            <span className={`pos-product-stock ${remainingQty <= (p.lowStock || 0) ? 'low' : ''}`}>
                              Qty: {remainingQty}
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
                        disabled={posSalesLocked}
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
                      const remainingQty = Math.max(0, (p.quantity ?? 0) - (inCart?.quantity ?? 0))
                      return (
                        <button
                          type="button"
                          key={pid}
                          className={`pos-product-card ${inCart ? 'pos-product-in-cart' : ''}`}
                          onClick={() => addToCart(p)}
                          disabled={posSalesLocked}
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
                            <span className="pos-product-price">
                              <span className="pos-product-price-original">{p.purchasedPrice}</span>
                              <span className="pos-product-price-final">
                                {productApi.calcFinalPrice(p.purchasedPrice, p.discountPercent || 0)}
                              </span>
                            </span>
                            <span className={`pos-product-stock ${remainingQty <= (p.lowStock || 0) ? 'low' : ''}`}>
                              Qty: {remainingQty}
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
                  <div className="pos-receipt-title">
                    <div className="pos-receipt-label">Sales Receipt</div>
                  </div>
                </div>

                <div className="pos-orders-list-head">
                  <span className="pos-orders-list-label">Orders List</span>
                  <button
                    type="button"
                    className="pos-cart-clear-btn-inline"
                    onClick={handleClearCart}
                    disabled={cart.length === 0 || isPlacingOrder}
                    title="Clear cart"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    <span>Clear cart</span>
                  </button>
                </div>
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
                                <button type="button" onClick={() => updateQty(c.productId, -1)} disabled={posSalesLocked} aria-label="Decrease quantity"><FontAwesomeIcon icon={faMinus} /></button>
                                <span>{c.quantity}</span>
                                <button type="button" onClick={() => updateQty(c.productId, 1)} disabled={posSalesLocked} aria-label="Increase quantity"><FontAwesomeIcon icon={faPlus} /></button>
                              </div>
                              <div className="pos-item-price">
                                <span className="pos-item-price-original">
                                  {(Number(c.costPrice ?? c.price) * c.quantity).toLocaleString('en-LK', {
                                    minimumFractionDigits: 2
                                  })}
                                </span>
                                <span className="pos-item-price-final">
                                  {c.lineTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                                </span>
                              </div>
                              <button
                                type="button"
                                className="pos-item-remove-btn"
                                onClick={() => removeFromCart(c.productId)}
                                title="Remove item"
                                disabled={posSalesLocked}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
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
                    <span>{rawSubtotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
                  </div>
                  {productDiscountTotal > 0 && (
                    <div className="pos-summary-row pos-summary-row--discount">
                      <span>Product discount</span>
                      <span>- {productDiscountTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div className="pos-summary-row pos-summary-row-discount-pct">
                    <span>Discount %</span>
                    <input
                      type="number"
                      className="pos-discount-pct-input"
                      placeholder="0"
                      min={0}
                      max={100}
                      step={0.5}
                      value={cartDiscountPercent}
                      onChange={(e) => setCartDiscountPercent(e.target.value.replace(/[^0-9.]/g, ''))}
                      aria-label="Discount percentage"
                      disabled={posSalesLocked}
                    />
                  </div>
                  <div className="pos-summary-row pos-summary-row--discount">
                    <span>Discount</span>
                    <span>- {discountTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="pos-summary-row total">
                    <span>Total</span>
                    <span>{total.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div className="pos-cart-actions-row">
                  <button
                    className="pos-place-order-btn"
                    disabled={cart.length === 0 || isPlacingOrder || !posShift?.id}
                    onClick={handleNextClick}
                    title={!posShift?.id ? 'Open a shift first' : ''}
                  >
                    <div className="pos-btn-circle">
                      {isPlacingOrder ? <div className="pos-spinner" /> : <FontAwesomeIcon icon={faChevronRight} />}
                    </div>
                    <span>{isPlacingOrder ? 'Processing...' : `Next ${total.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`}</span>
                    <div className="pos-btn-arrows">
                      <FontAwesomeIcon icon={faChevronRight} />
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
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

      {showPaymentPopup && (
        <div className="pos-payment-popup-overlay" role="dialog" aria-modal="true">
          <div className="pos-payment-popup" onClick={(e) => e.stopPropagation()}>
            <h2 className="pos-payment-popup-title">Payment</h2>

            <div className="pos-payment-popup-tabs">
              <button
                type="button"
                className={`pos-payment-popup-tab ${paymentMethod === 'cash' ? 'active' : ''}`}
                onClick={() => { setPaymentMethod('cash'); setPaymentError(''); }}
              >
                Cash
              </button>
              <button
                type="button"
                className={`pos-payment-popup-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => { setPaymentMethod('card'); setCashGiven(''); setPaymentError(''); }}
              >
                Card
              </button>
            </div>

            <div className="pos-payment-popup-row">
              <span>Total amount</span>
              <span>{total.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
            </div>

            {paymentMethod === 'cash' && (
              <>
                <div className="pos-payment-popup-row">
                  <label className="pos-payment-popup-label">
                    Cash received
                    <input
                      type="number"
                      className="pos-payment-popup-input"
                      value={cashGiven}
                      onChange={(e) => {
                        setCashGiven(e.target.value)
                        setPaymentError('')
                      }}
                      min="0"
                    />
                  </label>
                </div>

                {cashGiven !== '' && (
                  <div className="pos-payment-popup-row">
                    <span>Balance</span>
                    <span>
                      {(() => {
                        const cash = Number(cashGiven) || 0
                        const bal = cash - total
                        const safeBal = bal < 0 ? 0 : bal
                        return safeBal.toLocaleString('en-LK', { minimumFractionDigits: 2 })
                      })()}
                    </span>
                  </div>
                )}
              </>
            )}

            {paymentError && (
              <p className="pos-payment-popup-error" role="alert">
                {paymentError}
              </p>
            )}

            <div className="pos-payment-popup-actions">
              <button
                type="button"
                className="pos-payment-popup-cancel"
                onClick={() => setShowPaymentPopup(false)}
              >
                Back
              </button>
              <button
                type="button"
                className="pos-payment-popup-confirm"
                onClick={() => {
                  if (paymentMethod === 'cash') {
                    const cash = Number(cashGiven) || 0
                    if (cash < total) {
                      setPaymentError('Cash received is less than total.')
                      return
                    }
                    const balance = cash - total
                    const payment = {
                      paymentMethod: 'cash',
                      cashReceived: cash,
                      balanceAmount: balance
                    }
                    setLastPrintPayment(payment)
                    setShowPaymentPopup(false)
                    doPlaceOrder(selectedCustomerId ?? null, payment)
                  } else {
                    const payment = {
                      paymentMethod: 'card',
                      cashReceived: null,
                      balanceAmount: null
                    }
                    setLastPrintPayment(payment)
                    setShowPaymentPopup(false)
                    doPlaceOrder(selectedCustomerId ?? null, payment)
                  }
                }}
              >
                Confirm &amp; Print
              </button>
            </div>
          </div>
        </div>
      )}

      <div id="pos-invoice-print" className="pos-invoice-print" aria-hidden="true">
        <div className="pos-invoice-paper">
          <div className="pos-invoice-header">
            <img src="/ATF.png" alt="Logo" className="pos-invoice-logo" />
            <h1 className="pos-invoice-store-name">ArulTex & Fancy Palace</h1>
            <p className="pos-invoice-address">Nelliady, Jaffna, Sri Lanka (40000)</p>
            <p className="pos-invoice-tin">TIN: 1234567</p>
          </div>

          <div className="pos-invoice-divider" />

          <div className="pos-invoice-meta">
            <span>Date: {new Date().toLocaleDateString('en-LK')}</span>
            <span>Time: {new Date().toLocaleTimeString('en-LK', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            <span>Bill # {draftInvoiceNo.split('-').pop()}</span>
          </div>

          <div className="pos-invoice-divider" />

          <table className="pos-invoice-table">
            <thead>
              <tr>
                <th>Item</th>
                <th className="pos-invoice-th-qty">Qty</th>
                <th className="pos-invoice-th-amt">Amount</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((c) => (
                <tr key={c.productId}>
                  <td className="pos-invoice-item-name">{c.productName}</td>
                  <td className="pos-invoice-td-qty">{c.quantity}</td>
                  <td className="pos-invoice-td-amt">
                    <div className="pos-invoice-amt-wrapper">
                      <div className="pos-invoice-amt-original">
                        {(Number(c.costPrice ?? c.price) * c.quantity).toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="pos-invoice-amt-final">
                        {c.lineTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pos-invoice-divider" />

          <div className="pos-invoice-totals">
            <div className="pos-invoice-total-row">
              <span>Sub Total</span>
              <span>{rawSubtotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
            </div>
            {discountTotal > 0 && (
              <div className="pos-invoice-total-row">
                <span>Discount</span>
                <span>- {discountTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="pos-invoice-total-row pos-invoice-grand">
              <span>Total</span>
              <span>{total.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="pos-invoice-divider" />

          <div className="pos-invoice-payment">
            {(() => {
              const method = lastPrintPayment?.paymentMethod || paymentMethod || 'cash'
              const isCash = method === 'cash'
              return (
                <>
                  <div className="pos-invoice-payment-row">
                    <span>Payment</span>
                    <span>{isCash ? 'Cash' : 'Card'}</span>
                  </div>
                  {isCash && lastPrintPayment && lastPrintPayment.cashReceived != null && (
                    <>
                      <div className="pos-invoice-payment-row">
                        <span>Cash Received</span>
                        <span>{Number(lastPrintPayment.cashReceived).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="pos-invoice-payment-row">
                        <span>Balance</span>
                        <span>{Number(lastPrintPayment.balanceAmount ?? 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </>
                  )}
                </>
              )
            })()}
          </div>

          <div className="pos-invoice-divider" />

          <p className="pos-invoice-thanks">Thank you for your purchase</p>
        </div>
      </div>
    </div>
  )
}

export default POSPage
