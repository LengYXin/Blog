// http://www.redux.org.cn/docs/basics/Actions.html
import '../node_modules/antd/dist/antd.css'
import * as React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import RootRoutes from './routes/RootRoutes'
import todoApp from './reducers'
import { getUser } from './Actions'
// redux 调试工具
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
const store = createStore(todoApp, composeEnhancers(
    applyMiddleware(thunk)
));
// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
let unsubscribe = store.subscribe(() => {
}
);
console.log("store", store.getState());
store.dispatch(getUser());
render(
    <Provider store={store}>
        <RootRoutes />
    </Provider>,
    document.getElementById('root')
)