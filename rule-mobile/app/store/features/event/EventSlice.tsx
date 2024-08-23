// store/features/event/EventSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EventProps {
  eventName: string;
  eventDate: string;
  coverImage: string;
  maleFee: number;
  maleTotal: number;
  males: number;
  femaleFee: number;
  femaleTotal: number;
  females: number;
}

interface EventState {
  selectedEvent: EventProps | null;
}

const initialState: EventState = {
  selectedEvent: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setSelectedEvent: (state, action: PayloadAction<EventProps>) => {
      state.selectedEvent = action.payload;
    },
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
    },
  },
});

export const { setSelectedEvent, clearSelectedEvent } = eventSlice.actions;
export default eventSlice.reducer;
