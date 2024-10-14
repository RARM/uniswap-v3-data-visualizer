/**
 * @file req-prompt.tsx
 * @description This file contains the PromptBox component which provides a
 * configuration panel for users to update or upload requirements for queries,
 * such as API keys and secrets.
**/

import React, { useState } from 'react';

/**
 * Properties for the PromptBox component.
 * 
 * @interface PromptBoxProps
 * @property {function} onClose - Callback function to handle the closing of
 * the PromptBox with the input values.
 */
interface PromptBoxProps {
  onClose: (input: string) => void;
}

/**
 * PromptBox Component
 * 
 * This component renders a modal dialog that allows users to input and submit
 * configuration data, such as API keys and secrets. 
 * 
 * The component is not complete. Input fields should change based on the
 * requirements for the queries.
 * 
 * @param {PromptBoxProps} props - The properties for the PromptBox component.
 * @returns {JSX.Element} The rendered PromptBox component.
**/
const PromptBox: React.FC<PromptBoxProps> = ({ onClose }: PromptBoxProps): React.JSX.Element => {
  const [input, setInput] = useState('');

  /**
   * Handles the submission of the input.
  **/
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