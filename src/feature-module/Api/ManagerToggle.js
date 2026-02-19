import axios from "axios";
import { BASE_BACKEND_URL } from "./config";

export const getAllManagerToggles = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(`${BASE_BACKEND_URL}/managerToggle/getAll`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching manager toggles:", error);
    throw error;
  }
};

export const updateManagerToggleStatus = async (id, status) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.put(
      `${BASE_BACKEND_URL}/managerToggle/updateStatus?id=${id}&status=${status}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating manager toggle status:", error);
    throw error;
  }
};

export const updateManagerToggleAdminStatus = async (id, status) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.put(
      `${BASE_BACKEND_URL}/managerToggle/updateAdminStatus?id=${id}&status=${status}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating manager toggle admin status:", error);
    throw error;
  }
};

export const saveManagerToggle = async (action) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${BASE_BACKEND_URL}/managerToggle/save`,
      {
        action: action,
        isActive: 1, // Default value
        adminActive: 1 // Default value
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error saving manager toggle:", error);
    throw error;
  }
};

export const getManagerToggleByName = async (action) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      `${BASE_BACKEND_URL}/managerToggle/getByName?action=${action}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching manager toggle by name:", error);
    throw error;
  }
};

export const updateManagerToggle = async (id, action, isActive, adminActive) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.put(
      `${BASE_BACKEND_URL}/managerToggle/update`,
      {
        id: id,
        action: action,
        isActive: isActive,
        adminActive: adminActive
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating manager toggle:", error);
    throw error;
  }
};
