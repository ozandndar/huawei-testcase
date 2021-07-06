import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

// redux config
import { Provider } from "react-redux";
import store from './redux/store/index';

// redux persist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('huawei-case-study')
);
