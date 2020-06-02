import React from 'react';
import './App.css';

import BaseLayout from './components/layouts/BaseLayout'
import ContentContainer from './components/layouts/ContentContainer';
import Main from './components/main';

function App() {
  return (
    <BaseLayout>
      <ContentContainer>
        <Main />
      </ContentContainer>
    </BaseLayout >
  );
}

export default App;
