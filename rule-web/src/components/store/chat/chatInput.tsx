// components/store/chat/chatInput.tsx

import React, { useState, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const ChatInput: React.FC<{ sendMessage: (message: string) => void }> = ({ sendMessage }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput(''); // Clear input after sending
      // Reset height to one line after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = '1.5em'; // Set to the height of a single line
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.altKey) {
        // Allow Alt + Enter for a new line
        e.preventDefault(); // Prevent the default action
        setInput((prev) => prev + '\n'); // Add a newline character
      } else {
        // Send message if Enter is pressed without Alt
        handleSend();
        e.preventDefault(); // Prevent adding a new line
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex items-center p-4 border-gray-300 border-t-2 border-solid text-gray-800">
      <textarea
        ref={textareaRef} // Reference for the textarea
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="flex-1 p-2 rounded bg-gray-200 focus:outline-none resize-none overflow-hidden"
        placeholder="メッセージ"
        rows={1} // Set initial rows to 1 for a single line
        style={{ 
          height: `2.5em`,
          minHeight: '2.5em', // Set minimum height
          maxHeight: '5em' // Set maximum height to limit expansion
        }}
        onInput={(e) => {
          // Adjust height based on content
          e.currentTarget.style.height = 'auto'; // Reset height
          e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // Set to scroll height
        }}
      />
      <button
        onClick={handleSend}
        className="ml-4 p-2 bg-blue-500 text-white rounded"
      >
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default ChatInput;
