import {forwardRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import './RendererField.scss';

import MarkupContainer from "./MarkupContainer";

import {useTopWindowOffset, useShortcut} from "../../hooks/hooks";
import {wipeFields} from "../LeftColumn/FormField.slice";

function RendererField(props, ref) {
  const inputFields = useSelector(state => state.inputFields);
  const dispatch = useDispatch();
  const offset = useTopWindowOffset('20vh', ref);

  // useShortcut(handleClipboardCopying, ['control', 'shift', 'u'], [value]);
  // useShortcut(handleClear, ['control', 'shift', 'h'], []);

  function handleClipboardCopying(e) {
    navigator.clipboard.writeText(inputFields.map(field => field.highlightedMarkup).join(''));
    e?.preventDefault()
  }

  function handleClear(e) {
    dispatch(wipeFields());
    e?.preventDefault();
  }

  function renderMarkupContainers(inputFields) {
    return inputFields.map(field => <MarkupContainer key={field.id} value={field.highlightedMarkup}/>)
  }

  return <>
    <button onClick={handleClipboardCopying}>Скопировать{/* (ctrl+shift+u)*/}</button>
    <button onClick={handleClear}>Очистить{/* (ctrl + shift + h)*/}</button>
    <div className="rendererField" ref={ref} style={{height: `calc(100vh - ${offset})`}}>
      {renderMarkupContainers(inputFields)}
    </div>
  </>
}

export default forwardRef(RendererField);