import {useState, useRef, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Button, Switch } from '@mui/material';

import './RendererField.scss';

import MarkupContainer from "./MarkupContainer";

import {useTopWindowOffset} from "../../hooks";
import {wipeFields} from "../../slices/Field.slice";
import {useThemeSwitcher} from '../../hooks/useThemeLoader';

export default function RendererField() {
  const [isShowBoth, setIsShowBoth] = useState(true);
  const inputFields = useSelector((state: any) => state.inputFields);
  const currentCardSide = useSelector((state: any) => state.cardSide);
  const dispatch = useDispatch();
  const rendererFieldRef = useRef(null);
  const offset = useTopWindowOffset('20vh', rendererFieldRef);
  const switchTheme = useThemeSwitcher()

  // useShortcut(copyToClipboard, ['control', 'shift', 'u'], [inputFields]);
  // useShortcut(handleClear, ['control', 'shift', 'h'], []);

  const copyFrontToClipboard = useCallback((e: any) => {
    navigator.clipboard.writeText(inputFields.filter((field: any) => field.side === 'front').map((field: any) => field.highlightedMarkup).join(''));
    e?.preventDefault()
  }, [inputFields])

  const copyBackToClipboard = useCallback((e: any) => {
    navigator.clipboard.writeText(inputFields.filter((field: any) => field.side === 'back').map((field: any) => field.highlightedMarkup).join(''));
    e?.preventDefault()
  }, [inputFields])

  const copyToClipboard = useCallback((e: any) => {
    navigator.clipboard.writeText(inputFields.map((field: any) => field.highlightedMarkup).join(''));
    e?.preventDefault()
  }, [inputFields])

  const handleClear = useCallback((e: any) => {
    dispatch(wipeFields());
    e?.preventDefault();
  }, [])

  const toggleShowBoth = useCallback(() => setIsShowBoth(prevState => !prevState), [])

  function renderMarkupContainers(inputFields: any) {
    if (isShowBoth) {
      return inputFields.map((field: any) => <MarkupContainer key={field.id} value={field.highlightedMarkup}/>)
    }
    return inputFields.filter((field: any) => field.side === currentCardSide).map((field: any) => <MarkupContainer key={field.id} value={field.highlightedMarkup}/>)
  }

  return <>
    <p className="btnContainer">
      <label>
        Show Both Card Sides:
        <Switch
          checked={isShowBoth}
          onChange={toggleShowBoth}
        />
      </label>
      <Button variant="outlined" size="small" onClick={copyFrontToClipboard}>
        Copy Front{/* (ctrl+shift+u)*/}
      </Button>
      <Button variant="outlined" size="small" onClick={copyBackToClipboard}>
        Copy Back{/* (ctrl+shift+u)*/}
      </Button>
      <Button variant="outlined" size="small" onClick={copyToClipboard}>
        Copy Both{/* (ctrl+shift+u)*/}
      </Button>
      <Button variant="outlined" size="small" color="error" onClick={handleClear}>
        Clear{/* (ctrl + shift + h)*/}
      </Button>
      <Button variant="outlined" size="small" color="secondary" onClick={switchTheme}>
        Switch Theme
      </Button>
    </p>
    <div className="rendererField" ref={rendererFieldRef} style={{height: `calc(100vh - ${offset})`}}>
      {renderMarkupContainers(inputFields)}
    </div>
  </>
}