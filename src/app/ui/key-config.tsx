import React, { useState } from 'react';

interface PromptBoxProps {
  onClose: (input: string) => void;
}

const PromptBox: React.FC<PromptBoxProps> = ({ onClose }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    onClose(input);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-2">Key Configuration</h2>
        <p>[Instructions here.]</p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PromptBox;