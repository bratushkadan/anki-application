import { createSlice } from '@reduxjs/toolkit';

const cardSideSlice = createSlice({
  name: 'cardSide',
  initialState: 'front',
  reducers: {
    switchCardSide: state => state === 'front' ? 'back' : 'front'
  }
})

export const { switchCardSide } = cardSideSlice.actions;

export default cardSideSlice.reducer;
