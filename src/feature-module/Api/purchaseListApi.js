import { BASE_BACKEND_URL } from "./config";
import axios from "axios";

export const fetchPurchases = async (pageNumber = 1, pageSize = 10) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return {
                pageNumber: pageNumber,
                pageSize: pageSize,
                totalRecords: 0,
                payload: []
            };
        }

        const response = await axios.get(`${BASE_BACKEND_URL}/purchaseList/getAllPage`, {
            params: {
                pageNumber,
                pageSize
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data.responseDto || {
            pageNumber: pageNumber,
            pageSize: pageSize,
            totalRecords: 0,
            payload: []
        };
    } catch (error) {
        return {
            pageNumber: pageNumber,
            pageSize: pageSize,
            totalRecords: 0,
            payload: []
        };
    }
};

export const savePurchase = async (purchaseData) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw new Error("Authentication required: No access token found");
    }

    const existingPurchases = await fetchPurchases();
    if (existingPurchases.some((purchase) => purchase.barcode === purchaseData.barcode)) {
        throw new Error("Barcode already exists in the purchase list");
    }

    const response = await axios.post(
        `${BASE_BACKEND_URL}/purchaseList/save?barcode=${purchaseData.barcode}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;

};

export const deleteAllPurchases = async () => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return null;
        }

        const response = await axios.delete(`${BASE_BACKEND_URL}/purchaseList/deleteAll`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        return null;
    }
};