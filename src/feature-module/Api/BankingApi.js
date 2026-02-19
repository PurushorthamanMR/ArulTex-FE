import { BASE_BACKEND_URL } from "./config";
import axios from "axios";

export const saveBanking = async (bankingData) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return { success: false, error: "No access token" };
  }

  try {
    const response = await axios.post(
      `${BASE_BACKEND_URL}/banking/save`,
      bankingData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error saving banking data:", error);
    return { success: false, error: error.message };
  }
};

export const fetchBanking = async (pageNumber = 1, pageSize = 10) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return { content: [], totalElements: 0 };
    }

    const response = await axios.get(
      `${BASE_BACKEND_URL}/banking/getAllPage?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
    console.error("Error fetching banking data:", error);
    return { content: [], totalElements: 0 };
  }
};