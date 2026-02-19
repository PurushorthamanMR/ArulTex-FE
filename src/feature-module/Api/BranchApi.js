import { BASE_BACKEND_URL } from "./config";
import axios from "axios";

export const fetchBranches = async (pageNumber = 1, pageSize = 10, status = true) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("No access token found. Please log in.");
  }

  const response = await axios.get(`${BASE_BACKEND_URL}/branch/getAllPage`, {
    params: {
      pageNumber,
      pageSize,
      status
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.data.responseDto || { payload: [], totalRecords: 0 };
};

// Save Branch API
export const saveBranch = async (branchData) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw new Error("No access token found. Please log in.");
    }

    const response = await axios.post(`${BASE_BACKEND_URL}/branch/save`, branchData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

// Update Branch API
export const updateBranch = async (branchData) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw new Error("No access token found. Please log in.");
    }

    const response = await axios.post(`${BASE_BACKEND_URL}/branch/update`, branchData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export const updateBranchStatus = async (branchId, status = 0) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw new Error("No access token found. Please log in.");
    }

    const response = await axios.put(
        `${BASE_BACKEND_URL}/branch/updateStatus?branchId=${branchId}&status=${status}`,
        null,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.data.status) {
        throw new Error(response.data.errorDescription || "Failed to update branch status");
    }

    return response.data.responseDto;
};

export const getBranchByName = async (branchName) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw new Error("No access token found. Please log in.");
    }

    const response = await axios.get(`${BASE_BACKEND_URL}/branch/getByName`, {
        params: {
            branchName: branchName
        },
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    return response.data;
};