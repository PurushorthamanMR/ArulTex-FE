import { BASE_BACKEND_URL } from "./config";
import axios from "axios";

export const fetchSuppliers = async (pageNumber = 1, pageSize = 10, status = true) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return {
                status: false,
                errorCode: 401,
                errorDescription: "No access token found",
                responseDto: {
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    totalRecords: 0,
                    payload: []
                }
            };
        }

        const response = await axios.get(`${BASE_BACKEND_URL}/supplier/getAllPage?pageNumber=${pageNumber}&pageSize=${pageSize}&status=${status}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        return {
            status: false,
            errorCode: error.response?.status || 500,
            errorDescription: error.message,
            responseDto: {
                pageNumber: pageNumber,
                pageSize: pageSize,
                totalRecords: 0,
                payload: []
            }
        };
    }
};

export const saveSupplier = async (supplierData) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return null;
        }

        const response = await axios.post(`${BASE_BACKEND_URL}/supplier/save`, supplierData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        return null;
    }
};

export const updateSupplier = async (supplierData) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return null;
        }

        if (!supplierData.id) {
            return null;
        }

        const { ...updateData } = supplierData;
        const response = await axios.post(`${BASE_BACKEND_URL}/supplier/update`, updateData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        return null;
    }
};

export const updateSupplierStatus = async (supplierId, status) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return null;
        }

        const response = await axios.put(
            `${BASE_BACKEND_URL}/supplier/updateStatus?supplierId=${supplierId}&status=${status}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        return null;
    }
};