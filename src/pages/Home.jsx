import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="login-form homepage">
      <div className="flex items-center justify-center h-32 bg-gray-100">
        <h2 className="text-2xl font-bold">Welcome to the Home Page</h2>
      </div> <br />
      <div className='flex justify-center'>
        <Link to='/listings' className='link'>Property Listings</Link>
      </div>
    </div>
  );
};

export default Home;
