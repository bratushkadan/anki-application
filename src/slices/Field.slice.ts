// @ts-nocheck
import {createSlice, nanoid} from '@reduxjs/toolkit';

import * as highlightSyntax from '../modules/anki/highlight';

const fieldSlice = createSlice({
  name: 'inputFields',
  initialState: [],
  reducers: {
    addField: {
      reducer: (state, action) => {
        let backFieldIndex = state.findIndex(field => field.side === 'back');

        if (action.payload.side === 'back' || !~backFieldIndex) state.push(action.payload);
        else state.push(action.payload, ...state.splice(backFieldIndex, Infinity));
      },
      prepare: ({type, language, side, highlightedMarkup}) => ({payload: {type, language, side, value: '', highlightedMarkup, id: nanoid()}})
    },
    modifyField: (state, action) => state.map(field => {
      if (field.id !== action.payload.id) return field;
      return {...field, value: action.payload.value, highlightedMarkup: action.payload.highlightedMarkup}
    }),
    moveFieldUp: (state, {payload: id}) => {
      let field = state.findIndex(field => field.id === id);
      if (field > 0 && state[field].side === state[field - 1].side) {
        [state[field - 1], state[field]] = [state[field], state[field - 1]]
      }
      return state;
    },
    moveFieldDown: (state, {payload: id}) => {
      let field = state.findIndex(field => field.id === id);
      if (field !== -1  && (state.length - 1) !== field && state[field].side === state[field + 1].side) {
        [state[field], state[field + 1]] = [state[field + 1], state[field]]
      }
      return state;
    },
    removeField: (state, action) => state.filter(field => field.id !== action.payload),
    wipeFields: (state, action) => action.payload
  }
});

const {
  addField: addFieldAction,
  modifyField: modifyFieldAction,
  wipeFields: wipeFieldsAction,
} = fieldSlice.actions;
export const {removeField, moveFieldUp, moveFieldDown} = fieldSlice.actions;
export default fieldSlice.reducer;

/* addField-thunk consuming highlightSyntax Promise API */
export function addField({type, language = null, side}) {
  return function (dispatch) {
    if (type === 'comment') language = 'comment';
    let highlightedMarkup = highlightSyntax[language]('');
    return dispatch(addFieldAction({type, language, side, highlightedMarkup}));
  }
}

/* modifyField-thunk consuming highlightSyntax Promise API */
export function modifyField({id, value}) {
  return function (dispatch, getState) {
    let fieldLanguage = getState().inputFields.find(field => field.id === id).language;
    let highlightedMarkup = highlightSyntax[fieldLanguage](value);
    return dispatch(modifyFieldAction({id, value, highlightedMarkup}));
  }
}

/* wipeFields-thunk consuming highlightSyntax Promise API */
export function wipeFields() {
  return function (dispatch) {
    let commentField = {type: 'comment', language: 'comment', value: '', side: 'front', highlightedMarkup: highlightSyntax['comment'](''), id: nanoid()};
    return dispatch(wipeFieldsAction([commentField]));
  }
}
