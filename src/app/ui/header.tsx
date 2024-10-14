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
    <header className="flex items-center justify-between p-4 bg-gray-700">
      <h1 className="text-xl font-bold text-white">Uniswap V3 Data Visualizer</h1>
      <button 
        className="ml-4 p-2 bg-blue-500 text-white rounded" 
        onClick={handleButtonClick}
      >
        Requirements Configuration
      </button>
      {isPromptOpen && <PromptBox onClose={handlePromptClose} />}
    </header>
  );
}