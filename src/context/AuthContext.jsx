import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();
axios.defaults.baseURL = 'http://localhost:5000';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/api/auth/check-auth', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser({ id: response.data.id, role: response.data.role });
        } catch (error) {
          setUser(null);
        }
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    console.log('inside backend login');
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      setUser({ id: data._id, role: data.role });
      console.log('Hello I am here');
      toast.success('Login successful');
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  const logout = async () => {
    await axios.post('/api/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    setUser(null);
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const register = async (name, email, password, role) => {
    try {
      await axios.post('/api/users/register', { name, email, password, role });
      toast.success('Registration successful');
    } catch (error) {
      toast.error('Registration failed');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
