// store/features/event/EventSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EventProps {
  _id: string,
  eventName: string,
  category: string,
  coverImage: string,
  description: string,
  eventDate: string,
  eventStartTime: string,
  eventEndTime: string,
  maleFee: number,
  maleTotal: number,
  males: number,
  femaleFee: number,
  femaleTotal: number,
  females: number,
  store: string,
  status: string,
  createdAt: string,
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
