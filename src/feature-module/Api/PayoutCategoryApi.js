import { BASE_BACKEND_URL } from "./config";
import axios from "axios";

export const fetchPayoutCategories = async (pageNumber = 1, pageSize = 10, status = true) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return [];
    }

    const response = await axios.get(
      `${BASE_BACKEND_URL}/payoutCategory/getAllPage?pageNumber=${pageNumber}&pageSize=${pageSize}&status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data?.responseDto?.payload) {
      return response.data.responseDto.payload.map(category => ({
        id: category.id,
        payoutCategory: category.payoutCategory,
        isActive: category.isActive,
        createdDate: category.createdDate
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching payout categories:", error.response?.status, error.response?.data);
    return [];
  }
};

export const savePayoutCategory = async (categoryData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return null;
    }

    console.log("Sending category data:", categoryData);
    
    const response = await axios.post(`${BASE_BACKEND_URL}/payoutCategory/save`, categoryData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error saving payout category:", error.response?.status, error.response?.data);
    return null;
  }
};

export const updatePayoutCategory = async (categoryData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return null;
    }

    const response = await axios.post(`${BASE_BACKEND_URL}/payoutCategory/update`, categoryData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating payout category:", error.response?.status, error.response?.data);
    return null;
  }
};

export const updatePayoutCategoryStatus = async (categoryId, status = 0) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return null;
    }

    const response = await axios.put(
      `${BASE_BACKEND_URL}/payoutCategory/updateStatus?id=${categoryId}&status=${status}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    
    if (!response.data) {
      throw new Error("No response data received from server");
    }
    
    return response.data;
  } catch (error) {
    console.error("Error updating payout category status:", error.response?.status, error.response?.data);
    throw new Error(error.response?.data?.message || "Failed to update payout category status");
  }
};

export const getPayoutCategoryByName = async (categoryName) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return null;
    }

    const response = await axios.get(
      `${BASE_BACKEND_URL}/payoutCategory/getByName?name=${encodeURIComponent(categoryName)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching payout category by name:",
      error.response?.status,
      error.response?.data
    );
    return null;
  }
};
