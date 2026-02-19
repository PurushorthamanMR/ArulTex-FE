import { BASE_BACKEND_URL } from "./config";
import axios from "axios";

export const saveTransaction = async (transactionData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return { success: false, error: "No access token" };
    }

    const response = await axios.post(
      `${BASE_BACKEND_URL}/transaction/save`,
      transactionData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAllTransactions = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return { success: false, error: "No access token" };
    }

    const response = await axios.get(
      `${BASE_BACKEND_URL}/transaction/getAll`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.data.status) {
      return { success: false, error: "Failed to fetch transactions" };
    }

    return { 
      success: true, 
      data: response.data.responseDto || [] 
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchTransactions = async (pageNumber = 1, pageSize = 10) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return { content: [], totalElements: 0 };
    }

    const response = await axios.get(
      `${BASE_BACKEND_URL}/transaction/getAllPage?pageNumber=${pageNumber}&pageSize=${pageSize}`, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.data.status || !response.data.responseDto) {
      return { content: [], totalElements: 0 };
    }

    return {
      content: response.data.responseDto.payload || [],
      totalElements: response.data.responseDto.totalRecords || 0,
      pageNumber: response.data.responseDto.pageNumber,
      pageSize: response.data.responseDto.pageSize
    };
  } catch (error) {
    return { content: [], totalElements: 0 };
  }
};

export const fetchZReport = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return { success: false, error: "No access token" };
    }

    const userId = localStorage.getItem("userId");
    
    const response = await axios.get(`${BASE_BACKEND_URL}/transaction/zReport`, {
      params: { userId },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchXReport = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return { success: false, error: "No access token" };
    }

    const userId = localStorage.getItem("userId");

    const response = await axios.get(`${BASE_BACKEND_URL}/transaction/xReport`, {
      params: { userId },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchCashTotal = async (userId = 1) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return { success: false, error: "No access token" };
    }

    const response = await axios.get(`${BASE_BACKEND_URL}/transaction/getCashTotal`, {
      params: { userId },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};