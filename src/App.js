import React from 'react';
import './App.css';

import BaseLayout from './components/layouts/BaseLayout'
import ContentContainer from './components/layouts/ContentContainer';
import Main from './components/main';

// redux
import { Provider } from 'react-redux';
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <BaseLayout>
        <ContentContainer>
          <Main />
        </ContentContainer>
      </BaseLayout >
    </Provider>
  );
}

export default App;
