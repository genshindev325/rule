// components/chat/chatInput.tsx

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
    <div className="flex items-center p-4 border-t">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 p-2 border rounded"
        placeholder="Type a message..."
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
