import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="flex items-center justify-center h-32 bg-gray-100">
        <h2 className="text-2xl font-bold">Welcome to the Home Page</h2>
      </div>
      <div className='flex justify-center'>
        <Link to='/listings' className='m-4 p-4 px-8 bg-green-500 rounded-lg shadow-2xl'>Property Listings</Link>
      </div>
    </>
  );
};

export default Home;
