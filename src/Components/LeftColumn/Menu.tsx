import styled from 'styled-components';

import LanguagePicker from "./Menu/LanguagePicker";
import AddSection from "./Menu/AddSection";
import CardSidePicker from "./Menu/CardSidePicker";

const StyledMenu = styled(Menu)`
  display: flex;
  justify-content: flex-start;

  & > *:nth-child(n+2) {
    margin-left: 1em;
  }

  & > * {
    margin: 1em 0;
  }
`

function Menu({className}: {className?: string}) {
  return <div className={className}>
    <LanguagePicker/>
    <CardSidePicker/>
    <AddSection/>
  </div>
}

export default StyledMenu
