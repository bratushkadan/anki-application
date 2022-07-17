import React, {useCallback, useRef, memo} from 'react';
import styled from 'styled-components'
import {useDispatch} from "react-redux";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete'; 

import { languageSelectOptions } from '../../common/languageSelectOptions';
import {modifyField, moveFieldDown, moveFieldUp, removeField} from "../../slices/Field.slice";

const StyledForm = styled(Form)`
  &__caption {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-flow: nowrap row-reverse;

    .controlsContainer > * {
      cursor: pointer;
    }
  }
`

const ContentEditable = styled.div`
  min-height: 1rem;
  word-wrap: break-word;
  transition: background-color .2s ease;
  outline: 0;

  &:hover:not(:focus), &:empty:not(:focus) {
    background-color: rgba(0, 0, 0, .07);
  }

  &:empty:before {
    content: attr(data-contenteditable-section-label);
  }
`;

const getLanguageAlias = (language: keyof typeof languageSelectOptions) => languageSelectOptions[language]

interface Props {
  language: keyof typeof languageSelectOptions
  side: 'front' | 'back'
  type: 'comment' | 'code'
  id: string
  value: string
  className?: string
}

function Form({
  id,
  language,
  type,
  side,
  className
}: Props): React.ReactElement<any, any>  {
  const dispatch = useDispatch();
  const hintRef = useRef<HTMLSpanElement>(null);

/*   const dndHandler = React.useCallback((e: MouseEvent) => {
    console.log(e.clientX, e.clientY);
  }, []);

  React.useEffect(() => {
    hintRef.current?.addEventListener('mousedown', dndHandler);
    hintRef.current?.addEventListener('mouseup', dndHandler);
    
    return () => {
      hintRef.current!.removeEventListener('mousedown', dndHandler);
      hintRef.current!.removeEventListener('mouseup', dndHandler);
    }
  }, []); */

  function handleTextarea(e: React.FormEvent<HTMLInputElement>) {
    dispatch(modifyField({value: e.currentTarget.innerText, id}))
    e.preventDefault();
  }

  const hint = type === 'comment' ? `Comment` : `Code (${getLanguageAlias(language)})`;

  const handleMoveFieldUp = useCallback(() => {
    dispatch(moveFieldUp(id))
  }, [id])

  const hanldeMoveFieldDown = useCallback(() => {
    dispatch(moveFieldDown(id))
  }, [id])

  const handleRemoveField = useCallback(() => {
    dispatch(removeField(id))
  }, [id])

  return (
    <form
      className={className}
      data-side={side}
    >
      <div className={`${className}__caption`}>
        <span className="controlsContainer">
          <span title="Move block upward">
            <ArrowUpwardIcon onClick={handleMoveFieldUp} />
          </span>
          <span title="Move block downward">
            <ArrowDownwardIcon onClick={hanldeMoveFieldDown} />
          </span>
          <span title="Remove block">
            <DeleteIcon onClick={handleRemoveField} />
          </span>
        </span>
      </div>
      <ContentEditable
        contentEditable
        onInput={handleTextarea}
        data-contenteditable-section-label={hint}
        // onFocus={() => console.log('focused')}
        // onBlur={() => console.log('blurred')}
        placeholder={hint}
      />
    </form>);
};

const MemoizedForm = memo(StyledForm);

export { MemoizedForm as Form };