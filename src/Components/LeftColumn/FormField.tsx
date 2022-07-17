import {useEffect, useRef, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components'

import {Form} from "./Form";
import {addField} from "../../slices/Field.slice";
import {useTopWindowOffset} from "../../hooks";

const StyleFormField = styled(FormField)`
  overflow-y: auto;
  box-sizing: border-box;
  padding: 0 .3em .6em 0;

  &::-webkit-scrollbar {
    width: .5rem;
    background: hsl(170, 20%, 70%);
  }

  &::-webkit-scrollbar-button {
    height: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: hsl(170, 20%, 50%);
  }
`

function FormField({className}: {className?: string}) {
  const inputFields = useSelector<any>(state => state.inputFields) as any[];
  const currentCardSide = useSelector<any>(state => state.cardSide);
  const dispatch = useDispatch();

  const formFieldRef = useRef(null);
  const fieldOffset = useTopWindowOffset('20vh', formFieldRef);

  useEffect(() => {
    dispatch(addField({type: 'comment', side: 'front'}));
  }, [dispatch]);

  const processInputFields = useCallback(() => {
    return inputFields
      .filter(field => field.side === currentCardSide)
      .map(field => <Form key={field.id} {...field}/>)
  }, [inputFields])

  return <div ref={formFieldRef} className={className} style={{height: `calc(100vh - ${fieldOffset})`}}>
    {processInputFields()}
  </div>
}

export default StyleFormField;
