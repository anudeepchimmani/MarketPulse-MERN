import api from "./api";

// ================= Get All Products =================
export const getAllProducts = async () => {
  const response = await api.get("/products/all");
  return response.data;
};

// ================= Get Single Product =================
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// ================= Add Product =================
export const addProduct = async (productData) => {
  const response = await api.post(
    "/products/add",
    productData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ================= Update Product =================
export const updateProduct = async (
  id,
  productData
) => {
  const response = await api.put(
    `/products/${id}`,
    productData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ================= Delete Product =================
export const deleteProduct = async (id) => {
  const response = await api.delete(
    `/products/${id}`
  );

  return response.data;
};