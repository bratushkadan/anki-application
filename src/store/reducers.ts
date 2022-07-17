import {combineReducers} from "@reduxjs/toolkit";

import formFieldReducer from '../slices/Field.slice';
import pickLanguageReducer from "../slices/Language.slice";
import cardSideReducer from '../slices/CardSide.slice';

export default combineReducers({
  inputFields: formFieldReducer,
  language: pickLanguageReducer,
  cardSide: cardSideReducer
})
