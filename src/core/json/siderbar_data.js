import * as Icon from 'react-feather';

const getUserRole = () => localStorage.getItem('userRole');

export const getSidebarData = () => {
  const userRole = getUserRole();
  
  return [
    {
      label: "Main",
      submenuOpen: true,
      showSubRoute: false,
      submenuHdr: "Main",
      submenuItems: [
        {
          label: "Dashboard",
          link: "/dashboard",
          icon: <Icon.Grid />,
          showSubRoute: false,
          submenu: false
        },
        {
          label: "POS",
          link: "/pos",
          icon: <Icon.ShoppingCart />,
          showSubRoute: false,
          submenu: false
        }
      ]
    },
    {
      label: "Inventory",
      submenuOpen: true,
      showSubRoute: false,
      submenuHdr: "Inventory",
      submenuItems: [
        { label: "Products", link: "/product-list", icon:<Icon.Box />,showSubRoute: false,submenu: false },
        { label: "Custom Categories", link: "/custom-products", icon:<Icon.Tool />,showSubRoute: false,submenu: false },
        { label: "Non Scan Products", link: "/nonsaleproduct", icon:  <Icon.BarChart2 />,showSubRoute: false,submenu: false },
        { label: "Low Stocks", link: "/low-stocks", icon: <Icon.TrendingDown  />,showSubRoute: false,submenu: false },
        { label: "Category", link: "/category-list", icon:  <Icon.Codepen />,showSubRoute: false,submenu: false },
        { label: "Tax", link: "/sub-categories", icon:  <Icon.Speaker  />,showSubRoute: false,submenu: false },
        { label: "Payout Category", link: "/brand-list", icon:  <Icon.Tag />,showSubRoute: false,submenu: false },
      ]
    },
    {
      label: "Discount",
      submenuOpen: true,
      submenuHdr: "Discount",
      submenu: true,
      showSubRoute: false,
      submenuItems: [
        { label: "Product Discount", link: "/productDiscount", icon:  <Icon.Tag />,showSubRoute: false,submenu: false },
      ]
    },
    {
      label: "Sales",
      submenuOpen: true,
      submenuHdr: "Sales",
      submenu: false,
      showSubRoute: false,
      submenuItems: [
        { label: "Transaction", link: "/invoice-report", icon:  <Icon.FileText />,showSubRoute: false,submenu: false },
        { label: "Banking", link: "/banking", icon: <Icon.CreditCard />, showSubRoute: false},
        { label: "Payout ", link: "/sales-returns", icon:  <Icon.Copy />,showSubRoute: false,submenu: false },
        { label: "Void History ", link: "/void-history", icon:  <Icon.Delete />,showSubRoute: false,submenu: false },
      ]
    },
    {
      label: "Purchases",
      submenuOpen: true,
      submenuHdr: "Purchases",
      showSubRoute: false,
      submenuItems: [
        { label: "Purchase List", link: "/purchase-list", icon:  <Icon.ShoppingBag />,showSubRoute: false,submenu: false },
      ]
    },
    {
      label: "People",
      submenuOpen: true,
      showSubRoute: false,
      submenuHdr: "People",
      submenuItems: [
        { label: "Customers", link: "/customers", icon:<Icon.User />,showSubRoute: false,submenu: false },
        { label: "Suppliers", link: "/suppliers", icon:  <Icon.Users />,showSubRoute: false, submenu: false },
        { label: "Branches", link: "/store-list", icon:  <Icon.Home  />,showSubRoute: false,submenu: false },
      ]
    },
    {
      label: "HRM",
      submenuOpen: true,
      showSubRoute: false,
      submenuHdr: "HRM",
      submenuItems: [
        { label: "Shifts", link: "/shift", icon: <Icon.Shuffle />,showSubRoute: false },
        { label: "Staff Leave", link: "/holidays", icon:  <Icon.CreditCard />,showSubRoute: false },
      ]
    },
    {
      label: "Reports",
      submenuOpen: true,
      showSubRoute: false,
      submenuHdr: "Reports",
      submenuItems: [
        { label: "Z Report", link: "/sales-report", icon:  <Icon.BarChart2 /> ,showSubRoute: false},
        { label: "X Report", link: "/purchase-report", icon:  <Icon.PieChart />,showSubRoute: false },
      ]
    },
    {
      label: "Settings",
      submenuOpen: true,
      submenuHdr: "Settings",
      submenu: true,
      showSubRoute: false,
      submenuItems: [
        { label: "Manager Settings", link: "/stock-adjustment", icon:  <Icon.Settings />,showSubRoute: false,submenu: false },
        ...(userRole === "ADMIN" ? [
          { label: "Admin Settings", link: "/admin-settings", icon:  <Icon.UserCheck />,showSubRoute: false,submenu: false }
        ] : []),
      ]
    },
    {
      label: "User Management",
      submenuOpen: true,
      showSubRoute: false,
      submenuHdr: "User Management",
      submenuItems: [
        { label: "Users", link: "/users", icon:  <Icon.UserCheck />,showSubRoute: false },
        { label: "Admin Details", link: "/roles-permissions", icon:  <Icon.UserCheck />,showSubRoute: false },
      ]
    },
    {
      label: "Documentation",
      submenuOpen: true,
      showSubRoute: false,
      submenuHdr: "Documentation",
      submenuItems: [
        { label: "User Manual", link: "/userManual", icon:  <Icon.Book />,showSubRoute: false },
      ]
    }
  ];
};
