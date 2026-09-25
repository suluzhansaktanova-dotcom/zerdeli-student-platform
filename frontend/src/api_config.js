const API_BASE_URL = 'http://127.0.0.1:5000/api/v1';

export const ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/health`,
  CALCULATE: `${API_BASE_URL}/calculate-grant`,
  MAJORS: `${API_BASE_URL}/majors`,
};

export default API_BASE_URL;
