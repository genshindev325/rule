'use client';

import React from 'react';

const MainPanel = () => {
  return (
    // <div className="p-4 bg-white shadow-md rounded-md flex flex-wrap">
      <div className="w-40 sm:w-48 md:w-56 bg-white">
        <div className="border-gray-200 border-solid border-2 p-4 rounded-md text-center">
          <div className='text-sm md:text-md text-gray-400 py-2'>Total sales</div>
          <div className="text-md sm:text-xl md:text-2xl font-bold py-2">123,45 yen</div>
        </div>
      </div>
    // </div>
  );
};

export default MainPanel;
