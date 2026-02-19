import { BASE_BACKEND_URL } from "./config";
import axios from "axios";

export const saveProductCategory = async (categoryData) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return null;
        }

        const response = await axios.post(`${BASE_BACKEND_URL}/productCategory/save`, categoryData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        return response;
    } catch (error) {
        console.error('Save Product Category Error:', error.response || error);
        return null;
    }
};

export const fetchProductCategories = async () => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return [];
        }

        const response = await axios.get(`${BASE_BACKEND_URL}/productCategory/getAll`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data.responseDto || [];
    } catch (error) {
        console.error('Fetch Product Categories Error:', error.response || error);
        return [];
    }
};

export const updateProductCategory = async (categoryId, updatedData) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return null;
        }

        const response = await axios.put(`${BASE_BACKEND_URL}/productCategory/update`, 
            { id: categoryId, ...updatedData }, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response;
    } catch (error) {
        console.error('Update Product Category Error:', error.response || error);
        return null;
    }
};

export const updateProductCategoryStatus = async (categoryId, status = 0) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return null;
        }

        const response = await axios.put(
            `${BASE_BACKEND_URL}/productCategory/updateStatus?id=${categoryId}&status=${status}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Update Product Category Status Error:', error.response || error);
        return null;
    }
};

export const getProductCategoryByName = async (categoryName) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return null;
        }

        const response = await axios.get(
            `${BASE_BACKEND_URL}/productCategory/getByName?productCategoryName=${categoryName}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Get Product Category By Name Error:', error.response || error);
        return null;
    }
};

export const fetchProductCategoriesPages = async (pageNumber = 1, pageSize = 10, status = true) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return {
                pageNumber: 1,
                pageSize: pageSize,
                totalRecords: 0,
                payload: []
            };
        }

        const response = await axios.get(
            `${BASE_BACKEND_URL}/productCategory/getAllPage?pageNumber=${pageNumber}&pageSize=${pageSize}&status=${status}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data.responseDto || {
            pageNumber: 1,
            pageSize: pageSize,
            totalRecords: 0,
            payload: []
        };
    } catch (error) {
        console.error('Fetch Product Categories Pages Error:', error.response || error);
        return {
            pageNumber: 1,
            pageSize: pageSize,
            totalRecords: 0,
            payload: []
        };
    }
};