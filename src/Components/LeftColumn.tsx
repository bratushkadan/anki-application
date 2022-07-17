import styled from 'styled-components'

const StyledLeftColumn = styled(LeftColumn)`
  overflow-y: hidden;
`;

function LeftColumn(props: any) {
  return (<div className={props.className}>{props.children}</div>)
}

export default StyledLeftColumn
