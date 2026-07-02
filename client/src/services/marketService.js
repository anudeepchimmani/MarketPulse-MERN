import api from "./api";

// ================= Get All Markets =================
export const getAllMarkets = async () => {
  const response = await api.get("/markets/all");
  return response.data;
};

// ================= Add Market =================
export const addMarket = async (marketData) => {
  const response = await api.post(
    "/markets/add",
    marketData
  );

  return response.data;
};

// ================= Update Market =================
export const updateMarket = async (
  id,
  marketData
) => {
  const response = await api.put(
    `/markets/${id}`,
    marketData
  );

  return response.data;
};

// ================= Delete Market =================
export const deleteMarket = async (id) => {
  const response = await api.delete(
    `/markets/${id}`
  );

  return response.data;
};