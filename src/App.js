import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AllDevicesList from './AllDevicesList';

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div>
          <AllDevicesList path="/" />
        </div>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
