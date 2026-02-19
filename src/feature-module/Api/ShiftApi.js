import { BASE_BACKEND_URL } from "./config";
import axios from "axios";

export const fetchShifts = async (pageNumber = 1, pageSize = 100, status = true) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) return { payload: [], totalRecords: 0 };
        const response = await axios.get(
            `${BASE_BACKEND_URL}/shifts/getAllPage?pageNumber=${pageNumber}&pageSize=${pageSize}&status=${status}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return {
            payload: response.data.responseDto?.payload || [],
            totalRecords: response.data.responseDto?.totalRecords || 0
        };
    } catch (error) {
        console.error('Error fetching shifts:', error);
        return { payload: [], totalRecords: 0 };
    }
};

export const saveShift = async (shiftData) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Authentication required");
        const response = await axios.post(
            `${BASE_BACKEND_URL}/shifts/save`,
            shiftData,
            { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } }
        );
        return response.data;
    } catch (error) {
        console.error('Error saving shift:', error);
        throw error;
    }
};

export const updateShift = async (shiftData) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Authentication required");
        const response = await axios.post(
            `${BASE_BACKEND_URL}/shifts/update`,
            shiftData,
            { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating shift:', error);
        throw error;
    }
};

export const getShiftsByDateRange = async (startDate, endDate) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) return [];
        const response = await axios.get(
            `${BASE_BACKEND_URL}/shifts/getAllByDateRange?startDate=${startDate}&endDate=${endDate}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return response.data.responseDto || [];
    } catch (error) {
        console.error('Error fetching shifts by date range:', error);
        return [];
    }
}; 