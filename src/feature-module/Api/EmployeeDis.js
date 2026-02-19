import { BASE_BACKEND_URL } from "./config";
import axios from "axios";

export const saveEmployeeDiscount = async (discountData) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        return null;
    }

    const response = await axios.post(`${BASE_BACKEND_URL}/employeeDiscount/save`, discountData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export const updateEmployeeDiscount = async (discountData) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        return null;
    }

    const response = await axios.put(`${BASE_BACKEND_URL}/employeeDiscount/update`, discountData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export const fetchEmployeeDiscounts = async (isActive = true) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        return [];
    }

    const response = await axios.get(`${BASE_BACKEND_URL}/employeeDiscount/getAll`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        params: {
            isActive: isActive
        }
    });

    const data = response.data.responseDto || [];
    return isActive ? data.filter(item => item.isActive === true || item.isActive === 1) : data;
};
