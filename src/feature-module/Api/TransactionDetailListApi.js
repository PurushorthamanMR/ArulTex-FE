import { BASE_BACKEND_URL } from "./config";
import axios from "axios";

// Get All Transaction Details Api
export const fetchTransactionDetails = async () => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            console.error("No access token found. Please log in.");
            return [];
        }

        const response = await axios.get(`${BASE_BACKEND_URL}/transactionDetailsList/getAll`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // Store the transaction details in localStorage
        if (response.data && response.data.responseDto) {
            localStorage.setItem('transactionDetails', JSON.stringify(response.data.responseDto));
        }

        return response.data.responseDto || [];
    } catch (error) {
        console.error("Error fetching transaction details:", error.response?.status, error.response?.data);
        return [];
    }
};
