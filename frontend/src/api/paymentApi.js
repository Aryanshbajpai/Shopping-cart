import axios from "axios";

const API_URL = "http://localhost:3000/api/payments";

export const createPaymentOrder = async (paymentData) => {
  const response = await axios.post(`${API_URL}/create-order`, paymentData);
  return response.data;
};

export const verifyPayment = async (verifyData) => {
  const response = await axios.post(`${API_URL}/verify`, verifyData);
  return response.data;
};

export const getPaymentHistory = async () => {
  const response = await axios.get(`${API_URL}/history`);
  return response.data;
};