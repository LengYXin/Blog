// Action 只是描述了有事情发生了这一事实，并没有指明应用如何更新 state。而这正是 reducer 要做的事情。
import { combineReducers } from 'redux'
import { GET_USER, LOGIN } from '../../Actions'
export function user(state = {
  state: false,//登录状态
  inLoad: true,//是否在加载中
}, action) {
  console.log("action", action);
  switch (action.type) {
    case GET_USER:
      return Object.assign({}, action.data);
    case LOGIN:
      return Object.assign({}, action.data);
    default:
      return state;
  }
}
