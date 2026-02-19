import { BASE_BACKEND_URL } from "./config";
import axios from "axios";

export const fetchPayouts = async (pageNumber = 1, pageSize = 10) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return { content: [], totalElements: 0 };
    }

    const response = await axios.get(
      `${BASE_BACKEND_URL}/payout/getAllPage?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
      pageSize: response.data.responseDto.pageSize,
    };
  } catch (error) {
    console.error("Error fetching payouts:", error.response?.status, error.response?.data);
    return { content: [], totalElements:0};}
};

export const savePayout = async (payoutData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return null;
    }

    const response = await axios.post(`${BASE_BACKEND_URL}/payout/save`, payoutData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error saving payout:", error.response?.status, error.response?.data);
    return null;
  }
};

export const updatePayout = async (payoutData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return null;
    }

    const response = await axios.post(`${BASE_BACKEND_URL}/payout/update`, payoutData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating payout:", error.response?.status, error.response?.data);
    return null;
  }
};

export const updatePayoutStatus = async (payoutId, status = 0) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return null;
    }

    const response = await axios.put(
      `${BASE_BACKEND_URL}/payout/updateStatus?payoutId=${payoutId}&status=${status}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating payout status:", error.response?.status, error.response?.data);
    return null;
  }
};
