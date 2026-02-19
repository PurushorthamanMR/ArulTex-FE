import { BASE_BACKEND_URL } from "./config";
import axios from "axios";

export const fetchStocks = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return [];
    }

    const response = await axios.get(`${BASE_BACKEND_URL}/stock/getAll`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.responseDto || [];
  } catch (error) {
    console.error("Error fetching stocks:", error.response?.status, error.response?.data);
    return [];
  }
};

export const saveStock = async (stockData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return null;
    }

    const response = await axios.post(`${BASE_BACKEND_URL}/stock/save`, stockData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error saving stock:", error.response?.status, error.response?.data);
    return null;
  }
};

export const updateStock = async (stockData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found. Please log in.");
    }

    console.log("Making API call with data:", stockData);

    const response = await axios.post(`${BASE_BACKEND_URL}/stock/update`, stockData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("API response:", response);
    return response;
  } catch (error) {
    console.error("Error in updateStock:", error.response?.data || error.message);
    throw error;
  }
};

export const updateStockStatus = async (stockId, status = 0) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      return null;
    }

    const response = await axios.put(
      `${BASE_BACKEND_URL}/stock/updateStatus?stockId=${stockId}&status=${status}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating stock status:", error.response?.status, error.response?.data);
    return null;
  }
};

export const getStockByName = async (name) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return null;
    }

    const response = await axios.get(
      `${BASE_BACKEND_URL}/stock/getByName?name=${name}&isActive=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching stock by name:", error.response?.status, error.response?.data);
    return null;
  }
};

export const getStockByBarcode = async (barcode) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return null;
    }

    const response = await axios.get(
      `${BASE_BACKEND_URL}/stock/getByBarcode?barcode=${barcode}&isActive=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching stock by barcode:", error.response?.status, error.response?.data);
    return null;
  }
};
