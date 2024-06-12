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
    <div className="login-form">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold">Register</h2>
        <div className="mb-4">
          <label htmlFor='name'>Name</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder='John Doe'
            minLength={3}
            maxLength={32}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor='email'>Email</label>
          <input
            type="email"
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='user@example.com'
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor='password'>Password</label>
          <input
            type="password"
            value={password}
            id='password'
            minLength={8}
            maxLength={32}
            placeholder='********'
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Register
        </button>
        <h5 className='mt-4'>Have an account? <Link to='/login' className='register'>Login</Link></h5>
      </form>
    </div>
  );
};

export default Register;
