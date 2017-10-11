import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
// import '../node_modules/antd/dist/antd.css'
// import { RootApp } from './containers';
// import { ObservableUserContextStore } from './store/userContext';
// import Routers from "./routers"
render(
  <Provider >
     <div>
       哈哈
     </div>
  </Provider>,
  document.getElementById('root')
);
/**
 * time  多少秒后执行
 * count  多少秒执行一次
//  */
// (function (time, count) {
//   var start = 0;
//   function create(Callback) {
//     return setTimeout(function () {
//       console.log("start", start);
//       if (start >= time) {
//         Callback();
//       } else {
//         create(Callback);
//       }
//       start += count;
//     }, count);
//   }
//   var Timeout = create(function () {
//     console.log("Timeout");
//   });
// })(1000, 100)
