import { BASE_BACKEND_URL } from "./config";
import axios from "axios";

export const saveVoidHistory = async (voidData) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Authentication required");
        const response = await axios.post(
            `${BASE_BACKEND_URL}/voidHistory/save`,
            voidData,
            { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } }
        );
        return response.data;
    } catch (error) {
        console.error('Error saving void history:', error);
        throw error;
    }
};

export const getAllVoidHistory = async (pageNumber, pageSize) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Authentication required");
        const response = await axios.get(
            `${BASE_BACKEND_URL}/voidHistory/getAllPage?pageSize=${pageSize}&pageNumber=${pageNumber}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching void history:', error);
        throw error;
    }
};

export const getVoidHistoryByDate = async (pageNumber, pageSize, date) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Authentication required");
        const response = await axios.get(
            `${BASE_BACKEND_URL}/voidHistory/getAllPageByDate?pageSize=${pageSize}&pageNumber=${pageNumber}&date=${date}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching void history by date:', error);
        throw error;
    }
};

export const getVoidHistoryByUserId = async (pageNumber, pageSize, userId) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Authentication required");
        const response = await axios.get(
            `${BASE_BACKEND_URL}/voidHistory/getAllPageByUserId?pageSize=${pageSize}&pageNumber=${pageNumber}&userId=${userId}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching void history by user:', error);
        throw error;
    }
}; 