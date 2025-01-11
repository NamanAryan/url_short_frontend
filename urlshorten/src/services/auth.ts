import axios from 'axios';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

interface LoginCredentials {
  email: string;
  password: string;
}

const API_BASE_URL = 'http://localhost:5000';

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/api/auth/login`, credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};