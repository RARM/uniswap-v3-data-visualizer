'use client'
import React, { useState } from 'react';
import PromptBox from '@/app/ui/req-prompt';

export default function Header() {
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPromptOpen(true);
  };

  const handlePromptClose = (input: string) => {
    console.log(input);
    setIsPromptOpen(false);
  };

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Uniswap V3 Data Visualizer</h1>
        <button 
          className="ml-4 p-2 bg-gray-200 text-gray-900 rounded dark:bg-gray-700 dark:text-gray-100" 
          onClick={handleButtonClick}
        >
          Requirements Configuration
        </button>
      </header>
      {isPromptOpen && <PromptBox onClose={handlePromptClose} />}
    </>
  );
}