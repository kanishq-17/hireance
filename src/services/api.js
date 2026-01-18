import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    console.log('[API REQUEST]', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('[REQUEST ERROR]', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('[API RESPONSE]', response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('[RESPONSE ERROR]', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const submitApplication = async (applicationData) => {
  const response = await api.post('/api/applications/submit', applicationData);
  return response.data;
};

export const getApplication = async (applicationId) => {
  const response = await api.get(`/api/applications/${applicationId}`);
  return response.data;
};

export const createPaymentOrder = async (paymentData) => {
  const response = await api.post('/api/payments/create-order', paymentData);
  return response.data;
};

export const verifyPayment = async (orderId) => {
  const response = await api.post('/api/payments/verify', { order_id: orderId });
  return response.data;
};

export const getPaymentStatus = async (orderId) => {
  const response = await api.get(`/api/payments/status/${orderId}`);
  return response.data;
};

export default api;
