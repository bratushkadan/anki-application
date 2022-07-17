import {useCallback} from 'react';
import styled from 'styled-components';

import {addField} from "../../../slices/Field.slice";
import {useSelector, useDispatch} from "react-redux";
import CodeIcon from '@mui/icons-material/Code';
import CommentIcon from '@mui/icons-material/Comment';

const addIconStyle = { width: 24, height: 24 };

const StyledAddSection = styled(AddSection)`
  padding-top: 8px;
  & > *:nth-child(n+2) {
    margin-left: 1em;
  }
  & > * {
    cursor: pointer;
  }
`

function AddSection({className}: {className?: string}) {
  const cardSide = useSelector((state: any) => state.cardSide);
  const language = useSelector((state: any) => state.language);
  const dispatch = useDispatch();

  const addComment = useCallback(() => {
    dispatch(addField({type: 'comment', side: cardSide}))
  }, [cardSide, language])

  const addSnippet = useCallback(() => {
    if (language !== '') {
      dispatch(addField({type: 'code', language, side: cardSide}));
    }
  }, [cardSide, language])

  return <div className={className}>
      <span title="Add comment">
        <CommentIcon style={addIconStyle} onClick={addComment} />
      </span>
      <span title="Add code snippet">
        <CodeIcon style={addIconStyle} onClick={addSnippet} />  
      </span>
  </div>
}

export default StyledAddSection