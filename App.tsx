
import React from 'react';
import { Provider } from 'react-redux';
import StackNavigation from './src/navigations/stack_navigation';
import store from './src/redux/store/store';

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
        <StackNavigation />
    </Provider>
  );
}

export default App;
