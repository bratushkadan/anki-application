import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: '',
  reducers: {
    pickLanguage: (state, action) => action.payload
  }
})

export const { pickLanguage } = languageSlice.actions;
export default languageSlice.reducer;
