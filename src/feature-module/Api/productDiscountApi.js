import { BASE_BACKEND_URL } from "./config";
import axios from "axios";

export const fetchProductDiscounts = async (pageNumber = 1, pageSize = 10, status = true) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found. Please log in.");
      throw new Error("Authentication required");
    }

    // Build query parameters dynamically
    const queryParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    // Add status only if it's not null
    if (status !== null) {
      queryParams.append("status", status.toString());
    }

    const response = await axios.get(
      `${BASE_BACKEND_URL}/productDiscount/getAllPage?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = response.data;

    if (data.responseDto && Array.isArray(data.responseDto.payload)) {
      return data.responseDto.payload;
    }
    return [];
  } catch (error) {
    console.error("Error fetching product discounts:", error.response?.status, error.response?.data || error.message);
    throw error;
  }
};

export const saveProductDiscount = async (discountData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return null;
    }
    const response = await axios.post(`${BASE_BACKEND_URL}/productDiscount/save`, discountData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error saving product discount:", error.response?.status, error.response?.data);
    return null;
  }
};

export const updateProductDiscount = async (discountData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return null;
    }
    const response = await axios.post(`${BASE_BACKEND_URL}/productDiscount/update`, discountData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product discount:", error.response?.status, error.response?.data);
    return null;
  }
};

export const updateProductDiscountStatus = async (discountId, status = 0) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return null;
    }
    const response = await axios.put(
      `${BASE_BACKEND_URL}/productDiscount/updateStatus?id=${discountId}&status=${status}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product discount status:", error.response?.status, error.response?.data);
    return null;
  }
};