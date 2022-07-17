import { useSelector, useDispatch } from "react-redux";
import { Switch } from '@mui/material';

import {switchCardSide} from "../../../slices/CardSide.slice";

export default function CardSidePicker() {
  const cardSide = useSelector((state: any) => state.cardSide);
  const dispatch = useDispatch();

  function handleCheck(e: any) {
    if (cardSide !== e.currentTarget.value) dispatch(switchCardSide());
  }

  return (<div className="cardSidePickerContainer">
      <label>
        Front:
        <Switch
          value='front'
          checked={cardSide === 'front'}
          onChange={handleCheck}
        />
      </label>
      <label>
        Back:
        <Switch
          value='back'
          checked={cardSide === 'back'}
          onChange={handleCheck}
        />
      </label>
  </div>);
}