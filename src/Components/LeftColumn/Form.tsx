import React, {useCallback, memo} from 'react';
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

  :nth-child(n+2) {
    margin-top: .5rem;
  }
`

const FormRow = styled.div`
  display: flex;
`

// white-space: pre-wrap;       /* Since CSS 2.1 */
// white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
// white-space: -pre-wrap;      /* Opera 4-6 */
// white-space: -o-pre-wrap;    /* Opera 7 */

const ContentEditable = styled.pre`
  flex-grow: 2;

  min-height: 1rem;
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


  const changeTextArea = useCallback((content: string) => {
    dispatch(modifyField({value: content, id}))
  }, [id])

  const handleTextArea = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    changeTextArea(e.currentTarget.innerText)
    e.preventDefault();
  }, [id])

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
      <FormRow>
        <ContentEditable
          contentEditable
          onInput={handleTextArea}
          data-contenteditable-section-label={hint}
/*           onKeyDown={((e: any) => {
            if (e.code === "KeyC" && e.shiftKey && (e.ctrlKey || e.metaKey)) {
              console.log("Pressed C")
              e.preventDefault()

              const selection = window.getSelection()
              if (!selection) {
                return
              }

              changeTextArea(e.currentTarget.innerText)
              console.log(selection.focusOffset)
              console.log(selection.anchorOffset)
            }
          })} */

          // onFocus={() => console.log('focused')}
          // onBlur={() => console.log('blurred')}
        />
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
      </FormRow>
    </form>);
};

const MemoizedForm = memo(StyledForm);

export { MemoizedForm as Form };
