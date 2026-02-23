/**
 * Mock data for frontend testing (Dashboard, Reports, etc.)
 */

export const dashboardMock = {
  totalSales: 125430.50,
  totalPurchases: 89200.00,
  lowStockCount: 5,
  profitLoss: 36230.50, // totalSales - totalPurchases (simplified)
  // Analysis graphs data
  salesByCategory: [
    { category: 'Electronics', sales: 65000, color: '#0d9488' },
    { category: 'Baby Needs', sales: 35430.50, color: '#0ea5e9' },
    { category: 'Fancy Shop', sales: 28000, color: '#8b5cf6' },
    { category: 'Plastic Items', sales: 22000, color: '#f59e0b' },
    { category: 'Aluminum Items', sales: 18000, color: '#ec4899' }
  ],
  salesTrend: [
    { month: 'Sep', sales: 92000 },
    { month: 'Oct', sales: 98000 },
    { month: 'Nov', sales: 105000 },
    { month: 'Dec', sales: 112000 },
    { month: 'Jan', sales: 118000 },
    { month: 'Feb', sales: 125430.50 }
  ],
  salesVsPurchases: [
    { label: 'Sales', value: 125430.50, type: 'sales' },
    { label: 'Purchases', value: 89200.00, type: 'purchases' }
  ],
  recentSales: [
    { id: 1, invoiceNo: 'INV-001', date: '2025-02-22', customer: 'Walk-in', amount: 1250.00 },
    { id: 2, invoiceNo: 'INV-002', date: '2025-02-22', customer: 'John Doe', amount: 890.50 },
    { id: 3, invoiceNo: 'INV-003', date: '2025-02-21', customer: 'Jane Smith', amount: 2340.00 },
    { id: 4, invoiceNo: 'INV-004', date: '2025-02-21', customer: 'Walk-in', amount: 456.00 },
    { id: 5, invoiceNo: 'INV-005', date: '2025-02-20', customer: 'ABC Corp', amount: 5670.00 }
  ]
}

// 50 mock products across Baby Needs, Fancy Shop, Electronics, Plastic Items, Aluminum Items
export const productsMock = [
  // Baby Needs - Baby Clothing (1-2)
  { id: 1, productName: 'Baby Cotton Onesie Set', barcode: '8901000000001', category: 'Baby Clothing', purchasedPrice: 120, pricePerUnit: 199, quantity: 25, lowStock: 5, discountPercent: 10, isActive: true },
  { id: 2, productName: 'Infant Romper 0-12M', barcode: '8901000000002', category: 'Baby Clothing', purchasedPrice: 180, pricePerUnit: 299, quantity: 18, lowStock: 5, discountPercent: 0, isActive: true },
  // Baby Needs - Diapers & Wipes (3-5)
  { id: 3, productName: 'Baby Diapers Pack M', barcode: '8901000000003', category: 'Diapers & Wipes', purchasedPrice: 350, pricePerUnit: 499, quantity: 40, lowStock: 10, discountPercent: 5, isActive: true },
  { id: 4, productName: 'Wet Wipes 80 Sheets', barcode: '8901000000004', category: 'Diapers & Wipes', purchasedPrice: 60, pricePerUnit: 99, quantity: 60, lowStock: 15, discountPercent: 0, isActive: true },
  { id: 5, productName: 'Newborn Diaper Pack', barcode: '8901000000005', category: 'Diapers & Wipes', purchasedPrice: 280, pricePerUnit: 399, quantity: 22, lowStock: 8, discountPercent: 8, isActive: true },
  // Baby Needs - Feeding (6-7)
  { id: 6, productName: 'Baby Feeding Bottle 250ml', barcode: '8901000000006', category: 'Feeding Items', purchasedPrice: 150, pricePerUnit: 249, quantity: 35, lowStock: 8, discountPercent: 0, isActive: true },
  { id: 7, productName: 'Sippy Cup with Handle', barcode: '8901000000007', category: 'Feeding Items', purchasedPrice: 80, pricePerUnit: 129, quantity: 42, lowStock: 10, discountPercent: 12, isActive: true },
  // Baby Needs - Bath & Care (8-9)
  { id: 8, productName: 'Baby Shampoo 200ml', barcode: '8901000000008', category: 'Bath & Care', purchasedPrice: 90, pricePerUnit: 149, quantity: 30, lowStock: 8, discountPercent: 5, isActive: true },
  { id: 9, productName: 'Baby Lotion Gentle', barcode: '8901000000009', category: 'Bath & Care', purchasedPrice: 110, pricePerUnit: 179, quantity: 28, lowStock: 8, discountPercent: 0, isActive: true },
  // Baby Needs - Toys (10-11)
  { id: 10, productName: 'Soft Rattle Toy', barcode: '8901000000010', category: 'Toys', purchasedPrice: 45, pricePerUnit: 79, quantity: 50, lowStock: 12, discountPercent: 10, isActive: true },
  { id: 11, productName: 'Teether Set 3pcs', barcode: '8901000000011', category: 'Toys', purchasedPrice: 65, pricePerUnit: 99, quantity: 38, lowStock: 10, discountPercent: 0, isActive: true },
  // Baby Needs - Accessories, Bedding, Gear (12-14)
  { id: 12, productName: 'Baby Bib Pack 5pcs', barcode: '8901000000012', category: 'Baby Accessories', purchasedPrice: 70, pricePerUnit: 119, quantity: 45, lowStock: 10, discountPercent: 5, isActive: true },
  { id: 13, productName: 'Cotton Baby Blanket', barcode: '8901000000013', category: 'Baby Bedding', purchasedPrice: 220, pricePerUnit: 349, quantity: 20, lowStock: 5, discountPercent: 8, isActive: true },
  { id: 14, productName: 'Baby Stroller Cap', barcode: '8901000000014', category: 'Baby Gear', purchasedPrice: 95, pricePerUnit: 159, quantity: 15, lowStock: 5, discountPercent: 0, isActive: true },
  // Fancy Shop - Hair, Jewellery, Bags (15-18)
  { id: 15, productName: 'Hair Clip Set 10pcs', barcode: '8901000000015', category: 'Hair Accessories', purchasedPrice: 40, pricePerUnit: 79, quantity: 55, lowStock: 12, discountPercent: 15, isActive: true },
  { id: 16, productName: 'Artificial Pearl Necklace', barcode: '8901000000016', category: 'Artificial Jewellery', purchasedPrice: 85, pricePerUnit: 149, quantity: 32, lowStock: 8, discountPercent: 10, isActive: true },
  { id: 17, productName: 'Ladies Handbag Medium', barcode: '8901000000017', category: 'Handbags & Purses', purchasedPrice: 350, pricePerUnit: 549, quantity: 18, lowStock: 5, discountPercent: 5, isActive: true },
  { id: 18, productName: 'Gift Box Set Small', barcode: '8901000000018', category: 'Gift Items', purchasedPrice: 120, pricePerUnit: 199, quantity: 25, lowStock: 6, discountPercent: 0, isActive: true },
  // Fancy Shop - Cosmetics, Stationery, Party (19-22)
  { id: 19, productName: 'Lipstick Set 3 Shades', barcode: '8901000000019', category: 'Cosmetics & Beauty', purchasedPrice: 180, pricePerUnit: 299, quantity: 28, lowStock: 8, discountPercent: 12, isActive: true },
  { id: 20, productName: 'Notebook A5 Pack 3', barcode: '8901000000020', category: 'Stationery', purchasedPrice: 90, pricePerUnit: 149, quantity: 40, lowStock: 10, discountPercent: 5, isActive: true },
  { id: 21, productName: 'Party Balloons Pack 20', barcode: '8901000000021', category: 'Party Items', purchasedPrice: 55, pricePerUnit: 89, quantity: 50, lowStock: 12, discountPercent: 0, isActive: true },
  { id: 22, productName: 'Ladies Wallet', barcode: '8901000000022', category: 'Ladies Accessories', purchasedPrice: 140, pricePerUnit: 229, quantity: 22, lowStock: 6, discountPercent: 8, isActive: true },
  // Electronics (23-30)
  { id: 23, productName: 'Mobile Charger 2A', barcode: '8901000000023', category: 'Mobile Accessories', purchasedPrice: 120, pricePerUnit: 199, quantity: 45, lowStock: 10, discountPercent: 10, isActive: true },
  { id: 24, productName: 'USB Cable Type C 1m', barcode: '8901000000024', category: 'Mobile Accessories', purchasedPrice: 60, pricePerUnit: 99, quantity: 60, lowStock: 15, discountPercent: 0, isActive: true },
  { id: 25, productName: 'Earphones Wired', barcode: '8901000000025', category: 'Mobile Accessories', purchasedPrice: 180, pricePerUnit: 299, quantity: 35, lowStock: 8, discountPercent: 5, isActive: true },
  { id: 26, productName: 'Electric Kettle 1.5L', barcode: '8901000000026', category: 'Small Home Appliances', purchasedPrice: 450, pricePerUnit: 649, quantity: 20, lowStock: 5, discountPercent: 8, isActive: true },
  { id: 27, productName: 'Iron Box Compact', barcode: '8901000000027', category: 'Small Home Appliances', purchasedPrice: 380, pricePerUnit: 549, quantity: 18, lowStock: 5, discountPercent: 0, isActive: true },
  { id: 28, productName: 'LED Bulb 9W Warm White', barcode: '8901000000028', category: 'LED Bulbs & Lights', purchasedPrice: 80, pricePerUnit: 129, quantity: 55, lowStock: 12, discountPercent: 10, isActive: true },
  { id: 29, productName: 'AA Batteries Pack 4', barcode: '8901000000029', category: 'Batteries', purchasedPrice: 70, pricePerUnit: 119, quantity: 48, lowStock: 12, discountPercent: 0, isActive: true },
  { id: 30, productName: 'Extension Cord 3m 6A', barcode: '8901000000030', category: 'Extension Cords', purchasedPrice: 150, pricePerUnit: 249, quantity: 30, lowStock: 8, discountPercent: 5, isActive: true },
  { id: 31, productName: 'Bluetooth Speaker Small', barcode: '8901000000031', category: 'Speakers', purchasedPrice: 420, pricePerUnit: 599, quantity: 15, lowStock: 5, discountPercent: 12, isActive: true },
  { id: 32, productName: 'Table Fan 400mm', barcode: '8901000000032', category: 'Electric Fans', purchasedPrice: 650, pricePerUnit: 899, quantity: 12, lowStock: 4, discountPercent: 5, isActive: true },
  // Plastic Items (33-38)
  { id: 33, productName: 'Plastic Bucket 12L', barcode: '8901000000033', category: 'Plastic Buckets & Tubs', purchasedPrice: 85, pricePerUnit: 139, quantity: 40, lowStock: 10, discountPercent: 0, isActive: true },
  { id: 34, productName: 'Water Bottle 1L', barcode: '8901000000034', category: 'Water Bottles', purchasedPrice: 95, pricePerUnit: 159, quantity: 38, lowStock: 8, discountPercent: 10, isActive: true },
  { id: 35, productName: 'Storage Container Set 5', barcode: '8901000000035', category: 'Storage Containers', purchasedPrice: 220, pricePerUnit: 349, quantity: 22, lowStock: 6, discountPercent: 5, isActive: true },
  { id: 36, productName: 'Plastic Chair Stackable', barcode: '8901000000036', category: 'Plastic Chairs', purchasedPrice: 180, pricePerUnit: 279, quantity: 28, lowStock: 8, discountPercent: 8, isActive: true },
  { id: 37, productName: 'Kitchen Storage Box 3pcs', barcode: '8901000000037', category: 'Kitchen Plastic Items', purchasedPrice: 110, pricePerUnit: 179, quantity: 35, lowStock: 8, discountPercent: 0, isActive: true },
  { id: 38, productName: 'Laundry Basket Large', barcode: '8901000000038', category: 'Laundry Baskets', purchasedPrice: 140, pricePerUnit: 229, quantity: 25, lowStock: 6, discountPercent: 10, isActive: true },
  // Aluminum Items (39-50)
  { id: 39, productName: 'Aluminum Cooking Pot 3L', barcode: '8901000000039', category: 'Cooking Pots', purchasedPrice: 280, pricePerUnit: 429, quantity: 20, lowStock: 5, discountPercent: 5, isActive: true },
  { id: 40, productName: 'Non-Stick Frying Pan 26cm', barcode: '8901000000040', category: 'Frying Pans', purchasedPrice: 320, pricePerUnit: 499, quantity: 18, lowStock: 5, discountPercent: 10, isActive: true },
  { id: 41, productName: 'Aluminum Plate Set 6', barcode: '8901000000041', category: 'Aluminum Plates', purchasedPrice: 180, pricePerUnit: 279, quantity: 30, lowStock: 8, discountPercent: 0, isActive: true },
  { id: 42, productName: 'Kitchen Ladle Set 3pcs', barcode: '8901000000042', category: 'Kitchen Utensils', purchasedPrice: 95, pricePerUnit: 149, quantity: 42, lowStock: 10, discountPercent: 8, isActive: true },
  { id: 43, productName: 'Water Pot 2L Aluminum', barcode: '8901000000043', category: 'Water Pots', purchasedPrice: 150, pricePerUnit: 239, quantity: 28, lowStock: 6, discountPercent: 5, isActive: true },
  { id: 44, productName: 'Lunch Box 3 Compartment', barcode: '8901000000044', category: 'Lunch Boxes', purchasedPrice: 120, pricePerUnit: 199, quantity: 35, lowStock: 8, discountPercent: 12, isActive: true },
  { id: 45, productName: 'Baby Bottle Brush Set', barcode: '8901000000045', category: 'Feeding Items', purchasedPrice: 35, pricePerUnit: 59, quantity: 48, lowStock: 12, discountPercent: 0, isActive: true },
  { id: 46, productName: 'Hair Band Pack 12', barcode: '8901000000046', category: 'Hair Accessories', purchasedPrice: 55, pricePerUnit: 89, quantity: 52, lowStock: 12, discountPercent: 10, isActive: true },
  { id: 47, productName: 'LED Tube Light 18W', barcode: '8901000000047', category: 'LED Bulbs & Lights', purchasedPrice: 140, pricePerUnit: 229, quantity: 24, lowStock: 6, discountPercent: 5, isActive: true },
  { id: 48, productName: 'Plastic Tub 20L', barcode: '8901000000048', category: 'Plastic Buckets & Tubs', purchasedPrice: 120, pricePerUnit: 189, quantity: 26, lowStock: 6, discountPercent: 0, isActive: true },
  { id: 49, productName: 'Aluminum Kadai 24cm', barcode: '8901000000049', category: 'Cooking Pots', purchasedPrice: 260, pricePerUnit: 399, quantity: 22, lowStock: 5, discountPercent: 8, isActive: true },
  { id: 50, productName: 'Ceiling Fan 48 inch', barcode: '8901000000050', category: 'Electric Fans', purchasedPrice: 980, pricePerUnit: 1399, quantity: 8, lowStock: 3, discountPercent: 5, isActive: true }
]

export const suppliersMock = [
  { id: 1, supplierName: 'Supplier One', contactPerson: 'Raj', phone: '9876543210', email: 'raj@supplier1.com', address: 'Chennai', isActive: true },
  { id: 2, supplierName: 'Supplier Two', contactPerson: 'Kumar', phone: '9876543211', email: 'kumar@supplier2.com', address: 'Coimbatore', isActive: true },
  { id: 3, supplierName: 'Supplier Three', contactPerson: 'Anita', phone: '9876543212', email: 'anita@supplier3.com', address: 'Madurai', isActive: false }
]

export const stockMovementMock = [
  { id: 1, productName: 'Baby Cotton Onesie Set', type: 'IN', quantity: 20, date: '2025-02-22', reference: 'PUR-001' },
  { id: 2, productName: 'Baby Cotton Onesie Set', type: 'OUT', quantity: 5, date: '2025-02-22', reference: 'INV-001' },
  { id: 3, productName: 'Baby Diapers Pack M', type: 'OUT', quantity: 12, date: '2025-02-21', reference: 'INV-002' },
  { id: 4, productName: 'Mobile Charger 2A', type: 'IN', quantity: 30, date: '2025-02-21', reference: 'PUR-002' },
  { id: 5, productName: 'Plastic Bucket 12L', type: 'OUT', quantity: 8, date: '2025-02-20', reference: 'INV-003' },
  { id: 6, productName: 'LED Bulb 9W Warm White', type: 'IN', quantity: 50, date: '2025-02-20', reference: 'PUR-003' },
  { id: 7, productName: 'Hair Clip Set 10pcs', type: 'OUT', quantity: 15, date: '2025-02-19', reference: 'INV-004' },
  { id: 8, productName: 'Aluminum Cooking Pot 3L', type: 'IN', quantity: 10, date: '2025-02-19', reference: 'PUR-004' }
]

export const dailyReportMock = {
  date: '2025-02-22',
  totalSales: 45230.50,
  totalTransactions: 28,
  byCategory: [
    { category: 'Mobile Accessories', sales: 28000, count: 12 },
    { category: 'Baby Clothing', sales: 12230.50, count: 10 },
    { category: 'Plastic Buckets & Tubs', sales: 5000, count: 6 },
    { category: 'Hair Accessories', sales: 4200, count: 5 }
  ]
}

export const monthlyReportMock = {
  month: 'February 2025',
  totalSales: 125430.50,
  totalPurchases: 89200.00,
  profit: 36230.50,
  byCategory: [
    { category: 'Electronics', sales: 65000, purchases: 48000 },
    { category: 'Baby Needs', sales: 35430.50, purchases: 25200 },
    { category: 'Fancy Shop', sales: 28000, purchases: 18000 },
    { category: 'Plastic Items', sales: 22000, purchases: 16000 },
    { category: 'Aluminum Items', sales: 18000, purchases: 12000 }
  ]
}

// Low Stocks: products where quantity <= lowStock (from productsMock + extra rows for demo)
const lowStockFromProducts = productsMock
  .filter((p) => p.quantity <= p.lowStock)
  .map((p) => ({ ...p, taxPercentage: 0 }))
export const lowStocksMock = lowStockFromProducts.length > 0
  ? lowStockFromProducts
  : [
      { id: 14, productName: 'Baby Stroller Cap', barcode: '8901000000014', category: 'Baby Gear', purchasedPrice: 95, pricePerUnit: 159, quantity: 3, lowStock: 5, discountPercent: 0, isActive: true, taxPercentage: 0 },
      { id: 17, productName: 'Ladies Handbag Medium', barcode: '8901000000017', category: 'Handbags & Purses', purchasedPrice: 350, pricePerUnit: 549, quantity: 4, lowStock: 5, discountPercent: 5, isActive: true, taxPercentage: 5 },
      { id: 26, productName: 'Electric Kettle 1.5L', barcode: '8901000000026', category: 'Small Home Appliances', purchasedPrice: 450, pricePerUnit: 649, quantity: 3, lowStock: 5, discountPercent: 8, isActive: true, taxPercentage: 12 },
      { id: 31, productName: 'Bluetooth Speaker Small', barcode: '8901000000031', category: 'Speakers', purchasedPrice: 420, pricePerUnit: 599, quantity: 4, lowStock: 5, discountPercent: 12, isActive: true, taxPercentage: 12 },
      { id: 32, productName: 'Table Fan 400mm', barcode: '8901000000032', category: 'Electric Fans', purchasedPrice: 650, pricePerUnit: 899, quantity: 3, lowStock: 4, discountPercent: 5, isActive: true, taxPercentage: 18 },
      { id: 35, productName: 'Storage Container Set 5', barcode: '8901000000035', category: 'Storage Containers', purchasedPrice: 220, pricePerUnit: 349, quantity: 4, lowStock: 6, discountPercent: 5, isActive: true, taxPercentage: 0 },
      { id: 50, productName: 'Ceiling Fan 48 inch', barcode: '8901000000050', category: 'Electric Fans', purchasedPrice: 980, pricePerUnit: 1399, quantity: 2, lowStock: 3, discountPercent: 5, isActive: true, taxPercentage: 18 }
    ]

// Discount list mock
export const discountsMock = [
  { id: 1, discountLabel: 'Festival Sale', percentage: 15, isActive: true },
  { id: 2, discountLabel: 'Bulk Purchase', percentage: 10, isActive: true },
  { id: 3, discountLabel: 'Clearance', percentage: 25, isActive: true },
  { id: 4, discountLabel: 'New Customer', percentage: 5, isActive: true },
  { id: 5, discountLabel: 'End of Season', percentage: 30, isActive: false },
  { id: 6, discountLabel: 'Member Discount', percentage: 12, isActive: false }
]
