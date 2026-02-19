import { BASE_BACKEND_URL } from "./config";
import axios from "axios";

export const fetchProducts = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return [];
    }

    const response = await axios.get(`${BASE_BACKEND_URL}/product/getAll`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.responseDto || [];
  } catch (error) {
    console.error("Error fetching products:", error.response?.status, error.response?.data);
    return [];
  }
};

export const saveProduct = async (productData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return null;
    }

    const response = await axios.post(`${BASE_BACKEND_URL}/product/save`, productData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error saving product:", error.response?.status, error.response?.data);
    return null;
  }
};

export const updateProduct = async (productData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return null;
    }

    const response = await axios.post(`${BASE_BACKEND_URL}/product/update`, productData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.response?.status, error.response?.data);
    return null;
  }
};

export const updateProductStatus = async (productId, status = 0) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      return null;
    }

    const response = await axios.put(
      `${BASE_BACKEND_URL}/product/updateStatus?productId=${productId}&status=${status}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating product status:", error.response?.status, error.response?.data);
    return null;
  }
};

export const getProductByName = async (name) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return null;
    }

    const response = await axios.get(
      `${BASE_BACKEND_URL}/product/getByName?name=${name}&isActive=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching product by name:", error.response?.status, error.response?.data);
    return null;
  }
};

export const getProductByBarcode = async (barcode) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return null;
    }

    const response = await axios.get(
      `${BASE_BACKEND_URL}/product/getByBarcode?barcode=${barcode}&isActive=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching product by barcode:", error.response?.status, error.response?.data);
    return null;
  }
};

export const getAllProductsPage = async (pageNumber = 1, pageSize = 10, status = '') => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return null;
    }

    const response = await axios.get(
      `${BASE_BACKEND_URL}/product/getAllPage?pageNumber=${pageNumber}&pageSize=${pageSize}&status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching products with pagination:", error.response?.status, error.response?.data);
    return null;
  }
};

export const getProductsByCategoryName = async (pageNumber = 1, pageSize = 10, categoryName, status = '') => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return null;
    }

    const response = await axios.get(
      `${BASE_BACKEND_URL}/product/getByProductCategoryName?pageNumber=${pageNumber}&pageSize=${pageSize}&categoryName=${categoryName}&status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error.response?.status, error.response?.data);
    return null;
  }
};

export const getProductsByTaxPercentage = async (pageNumber = 1, pageSize = 10, taxPercentage, status = '') => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found. Please log in.");
      return null;
    }

    const response = await axios.get(
      `${BASE_BACKEND_URL}/product/getByTaxPercentage?pageNumber=${pageNumber}&pageSize=${pageSize}&taxPercentage=${taxPercentage}&status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching products by tax percentage:", error.response?.status, error.response?.data);
    return null;
  }
};
