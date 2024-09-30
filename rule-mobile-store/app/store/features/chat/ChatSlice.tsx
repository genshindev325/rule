// store/features/event/ChatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  message: string;
  createdAt: string;
  relationship: 'a-s-r' | 'a-s-s' | 's-u-r' | 's-u-s';
}

interface Chat {
  id: string;
  name: string;
  date: string;
  lastMessage: string;
  avatar: string;
  messages: Message[];
}

interface ChatState {
  selectedChat: Chat | null;
}

const initialState: ChatState = {
  selectedChat: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<Chat>) => {
      state.selectedChat = action.payload;
    },
    clearChat: (state) => {
      state.selectedChat = null;
    },
  },
});

export const { setChat, clearChat } = chatSlice.actions;
export default chatSlice.reducer;