import api from "./api";

// ================= GET ALL PRICES =================
export const getAllPrices = async () => {
  const response = await api.get("/prices/all");
  return response.data;
};

// ================= GET PRICES BY PRODUCT =================
export const getPricesByProduct = async (productId) => {
  const response = await api.get(
    `/prices/product/${productId}`
  );

  return response.data;
};

// ================= GET PRICES BY MARKET =================
export const getPricesByMarket = async (marketId) => {
  const response = await api.get(
    `/prices/market/${marketId}`
  );

  return response.data;
};

// ================= COMPARE PRODUCT PRICES =================
export const compareProductPrices = async (
  productId
) => {
  const response = await api.get(
    `/prices/compare/${productId}`
  );

  return response.data;
};

// ================= ADD PRICE =================
export const addPrice = async (priceData) => {
  const response = await api.post(
    "/prices/add",
    priceData
  );

  return response.data;
};

// ================= UPDATE PRICE =================
export const updatePrice = async (
  id,
  priceData
) => {
  const response = await api.put(
    `/prices/${id}`,
    priceData
  );

  return response.data;
};

// ================= DELETE PRICE =================
export const deletePrice = async (id) => {
  const response = await api.delete(
    `/prices/${id}`
  );

  return response.data;
};