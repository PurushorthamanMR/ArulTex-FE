import { BASE_BACKEND_URL } from "./config";
import axios from "axios";

export const registerDevice = async (deviceData) => {
    try {
        console.log('%c 📤 Register Device Request:', 'color: #2196F3; font-weight: bold;', deviceData);
        
        const response = await axios.post(
            `${BASE_BACKEND_URL}/deviceAuth/register`,
            deviceData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        console.log('%c ✅ Register Device Response:', 'color: #4CAF50; font-weight: bold;', response.data);
        return response.data;
    } catch (error) {
        console.error('%c ❌ Register Device Error:', 'color: #F44336; font-weight: bold;', error.response?.data || error.message);
        throw error;
    }
};

export const approveDevice = async (deviceId) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        return null;
    }

    const response = await axios.put(
        `${BASE_BACKEND_URL}/deviceAuth/approve?id=${deviceId}`,
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

export const declineDevice = async (deviceId) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        return null;
    }

    const response = await axios.put(
        `${BASE_BACKEND_URL}/deviceAuth/decline?id=${deviceId}`,
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

export const blockDevice = async (deviceId) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        return null;
    }

    const response = await axios.put(
        `${BASE_BACKEND_URL}/deviceAuth/block?id=${deviceId}`,
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

export const loginDevice = async (deviceId) => {
    try {
        console.log('%c 📤 Login Device Request:', 'color: #2196F3; font-weight: bold;', { deviceId });
        
        const response = await axios.post(
            `${BASE_BACKEND_URL}/deviceAuth/login?tillId=${deviceId}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        console.log('%c ✅ Login Device Response:', 'color: #4CAF50; font-weight: bold;', response.data);
        return response.data;
    } catch (error) {
        console.error('%c ❌ Login Device Error:', 'color: #F44336; font-weight: bold;', error.response?.data || error.message);
        throw error;
    }
};

export const getAllPendingDevices = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        return null;
    }

    try {
        console.log('%c 📤 Get All Pending Devices Request:', 'color: #2196F3; font-weight: bold;');
        
        const response = await axios.get(
            `${BASE_BACKEND_URL}/deviceAuth/getAllPending`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log('%c ✅ Get All Pending Devices Response:', 'color: #4CAF50; font-weight: bold;', response.data);
        return response.data;
    } catch (error) {
        console.error('%c ❌ Get All Pending Devices Error:', 'color: #F44336; font-weight: bold;', error.response?.data || error.message);
        throw error;
    }
};

export const getAllDevices = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        return null;
    }

    try {
        console.log('%c 📤 Get All Devices Request:', 'color: #2196F3; font-weight: bold;');
        
        const response = await axios.get(
            `${BASE_BACKEND_URL}/deviceAuth/getAll`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log('%c ✅ Get All Devices Response:', 'color: #4CAF50; font-weight: bold;', response.data);
        return response.data;
    } catch (error) {
        console.error('%c ❌ Get All Devices Error:', 'color: #F44336; font-weight: bold;', error.response?.data || error.message);
        throw error;
    }
};

export const getDeviceByTillName = async (tillName) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        return null;
    }

    try {
        console.log('%c 📤 Get Device By Till Name Request:', 'color: #2196F3; font-weight: bold;', { tillName });
        
        const response = await axios.get(
            `${BASE_BACKEND_URL}/deviceAuth/getByTillName?tillName=${encodeURIComponent(tillName)}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log('%c ✅ Get Device By Till Name Response:', 'color: #4CAF50; font-weight: bold;', response.data);
        return response.data;
    } catch (error) {
        console.error('%c ❌ Get Device By Till Name Error:', 'color: #F44336; font-weight: bold;', error.response?.data || error.message);
        throw error;
    }
};

export const getDeviceByTillId = async (tillId) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        return null;
    }

    try {
        console.log('%c 📤 Get Device By Till ID Request:', 'color: #2196F3; font-weight: bold;', { tillId });
        
        const response = await axios.get(
            `${BASE_BACKEND_URL}/deviceAuth/getByTillId?tillId=${tillId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log('%c ✅ Get Device By Till ID Response:', 'color: #4CAF50; font-weight: bold;', response.data);
        return response.data;
    } catch (error) {
        console.error('%c ❌ Get Device By Till ID Error:', 'color: #F44336; font-weight: bold;', error.response?.data || error.message);
        throw error;
    }
};

export const updateTillName = async (deviceId, tillName) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        return null;
    }

    try {
        console.log('%c 📤 Update Till Name Request:', 'color: #2196F3; font-weight: bold;', { deviceId, tillName });
        
        const response = await axios.put(
            `${BASE_BACKEND_URL}/deviceAuth/updateTillName?id=${deviceId}&tillName=${encodeURIComponent(tillName)}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log('%c ✅ Update Till Name Response:', 'color: #4CAF50; font-weight: bold;', response.data);
        return response.data;
    } catch (error) {
        console.error('%c ❌ Update Till Name Error:', 'color: #F44336; font-weight: bold;', error.response?.data || error.message);
        throw error;
    }
};
