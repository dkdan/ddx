import React from 'react';
import { Bitcoin } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="bg-blue-50 p-4 rounded-full mb-4 animate-pulse">
        <Bitcoin size={40} className="text-blue-500" />
      </div>
      <h1 className="text-xl font-semibold mb-2">Loading...</h1>
      <p className="text-gray-500">Please wait while we set things up</p>
    </div>
  );
};

export default LoadingScreen;