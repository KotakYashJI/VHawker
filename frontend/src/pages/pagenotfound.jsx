import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-md">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center cursor-pointer gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white text-lg font-medium rounded-xl transition-all duration-300"
      >
        <ArrowLeft size={20} />
        Back to Home
      </button>
    </div>
  );
};

export default PageNotFound;