import initialState from "./initial.value";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Product_list":
      return { ...state, product_list: action.payload };
    case "Dashbaord_RecentProduct":
      return { ...state, dashboard_recentproduct: action.payload };
    case "Dashbaord_ExpiredProduct":
      return { ...state, dashboard_expiredproduct: action.payload };
    case "Salesdashbaord_ExpiredProduct":
      return { ...state, saleshdashboard_recenttransaction: action.payload };
    case "Brand_list":
      return { ...state, brand_list: action.payload };

    case "Unit_Data":
      return { ...state, unit_data: action.payload };
    case "Variantattribute_Data":
      return { ...state, variantattributes_data: action.payload };
    case "Warranty_Data":
      return { ...state, warranty_data: action.payload };
    case "Barcode_Data":
      return { ...state, barcode_data: action.payload };
    case "Department_Data":
      return { ...state, departmentlist_data: action.payload };
    case "Designation_Data":
      return { ...state, designation_data: action.payload };
    case "Shiftlist_Data":
      return { ...state, shiftlist_data: action.payload };
    case "Attendenceemployee_Data":
      return { ...state, attendenceemployee_data: action.payload };
    case "toggle_header":
      return { ...state, toggle_header: action.payload };
    case "Invoicereport_Data":
      return { ...state, invoicereport_data: action.payload };
    case "Salesreturns_Data":
      return { ...state, salesreturns_data: action.payload };
    case "Quatation_Data":
      return { ...state, quotationlist_data: action.payload };
    case "customer_data":
      return { ...state, customerdata: action.payload };
    case "Userlist_data":
      return { ...state, userlist_data: action.payload };
    case "Rolesandpermission_data":
      return { ...state, rolesandpermission_data: action.payload };
    case "Deleteaccount_data":
      return { ...state, deleteaccount_data: action.payload };
    case "Attendenceadmin_data":
      return { ...state, attendanceadmin_data: action.payload };
    case "Leavesadmin_data":
      return { ...state, leavesadmin_data: action.payload };
    case "Leavestype_data":
      return { ...state, leavetypes_data: action.payload };
    case "Holiday_data":
      return { ...state, holiday_data: action.payload };
    case "Expiredproduct_data":
      return { ...state, expiredproduct_data: action.payload };
    case "Lowstock_data":
      return { ...state, lowstock_data: action.payload };
    case "Categotylist_data":
      return { ...state, categotylist_data: action.payload };
    case "Layoutstyle_data":
      return { ...state, layoutstyledata: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
