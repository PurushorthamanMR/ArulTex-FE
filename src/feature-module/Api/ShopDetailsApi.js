import { BASE_BACKEND_URL } from "./config";
import axios from "axios";

// Save Shop Details Api
export const saveShopDetails = async (shopData) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return null;
        }

        const response = await axios.post(`${BASE_BACKEND_URL}/shopDetails/save`, shopData, {
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

// Get All Shop Details Api
export const fetchShopDetails = async () => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return [];
        }

        const response = await axios.get(`${BASE_BACKEND_URL}/shopDetails/getAll`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data.responseDto || [];
    } catch (error) {
        return [];
    }
};

// Update Shop Details Api
export const updateShopDetails = async (shopId, updatedData) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return null;
        }

        const response = await axios.put(`${BASE_BACKEND_URL}/shopDetails/update`, 
            { id: shopId, ...updatedData }, 
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

// Update Shop Details Status Api
export const updateShopDetailsStatus = async (shopId, status = 0) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return null;
        }

        const response = await axios.put(
            `${BASE_BACKEND_URL}/shopDetails/updateStatus?id=${shopId}&status=${status}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        return null;
    }
};

// Get Shop Details By Name Api
export const getShopDetailsByName = async (shopName) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return null;
        }

        const response = await axios.get(
            `${BASE_BACKEND_URL}/shopDetails/getByName?shopName=${shopName}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        return null;
    }
}; 