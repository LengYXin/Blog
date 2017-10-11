import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
// import '../node_modules/antd/dist/antd.css'
// import { RootApp } from './containers';
import UserContextStore from './store/userContext';
import recommendStore from './store/recommend';

import Routers from "./routers"
render(
  <Provider UserContextStore={UserContextStore} recommendStore={recommendStore}>
    <Routers />
  </Provider>,
  document.getElementById('root')
);
