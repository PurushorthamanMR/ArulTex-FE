import { BASE_BACKEND_URL } from "./config";
import axios from "axios";

// Save Api
export const saveMinimamBanking = async (amount) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            return null;
        }

        const bankingData = {
            amount: Number(amount),
            isActive: true,
        };

        const response = await axios.post(`${BASE_BACKEND_URL}/minimamBanking/save`, bankingData, {
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

// Get All Api
export const fetchMinimamBanking = async () => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return [];
        }

        const response = await axios.get(`${BASE_BACKEND_URL}/minimamBanking/getAll`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data.responseDto || [];
    } catch (error) {
        return [];
    }
};

// Update Api
export const updateMinimamBanking = async (bankingId, updatedData) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            return null;
        }

        const response = await axios.put(
            `${BASE_BACKEND_URL}/minimamBanking/update`,
            { id: bankingId, ...updatedData },
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
