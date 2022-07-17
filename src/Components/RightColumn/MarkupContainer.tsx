import {memo} from 'react';

function MarkupContainer(props: any) {
  return <div className="markupContainer" dangerouslySetInnerHTML={{__html: props.value}} />
}

export default memo(MarkupContainer);