import styled from 'styled-components'

import LeftColumn from "./Components/LeftColumn";
import RightColumn from "./Components/RightColumn";
import RendererField from "./Components/RightColumn/RendererField";
import Menu from "./Components/LeftColumn/Menu";
import FormField from "./Components/LeftColumn/FormField";
import {useSyncTheme} from './hooks/useThemeLoader';

const AppContainer = styled.div`
  margin: .3rem;

  min-height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 100vh;
  grid-column-gap: 2px;

  & > div {
    margin: 0 1vw;
  }
`;

function App() {
  useSyncTheme()
  
  return (
    <AppContainer>
      <LeftColumn>
        <Menu/>
        <FormField/>
      </LeftColumn>
      <RightColumn>
        <RendererField/>
      </RightColumn>
    </AppContainer>

  );
}

export default App;
