import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, register } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('All fields are required');
      return;
    }
    try {
      await register(name, email, password);
      navigate('/login', { state: { fromRegister: true } });
    } catch (error) {
      console.log('request failed, full error - ' + error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold">Register</h2>
        <div className="mb-4">
          <label>Name</label>
          <input
            type="text"
            value={name}
            minLength={3}
            maxLength={32}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            value={password}
            minLength={8}
            maxLength={32}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Register
        </button>
        <h5 className='mt-4'>Already have an account? <Link to='/login' className='bg-green-400 shadow-lg p-2 rounded-lg'>Login</Link></h5>
      </form>
    </div>
  );
};

export default Register;
