// components/store/chat/chatInput.tsx

import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const ChatInput: React.FC<{ sendMessage: (message: string) => void }> = ({
  sendMessage,
}) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex items-center p-4 border-gray-300 border-t-2 border-solid">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 px-2 text-lg rounded bg-gray-200 focus:outline-none"
        placeholder="メッセージ"
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
