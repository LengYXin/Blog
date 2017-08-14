// Action 描述一个事件的行为 就是  触发一个事件要干什么，
/*
 * action 类型
 */
import * as jquery from "jquery"

export const ADD_TODO = 'ADD_TODO';
export const GET_TODO = 'GET_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * 其它的常量
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action 创建函数
 */
export function getTodo() {
  // console.log("addTodo", text);
  // return { type: GET_TODO, text }
  return (dispatch, getState) => {
    jquery.get("/api/list").then(x => {
      dispatch({ type: GET_TODO, data: x.data })
    });
  }
}

export function addTodo(text, Callback?) {
  // console.log("addTodo", text);
  // return { type: ADD_TODO, text }
  return (dispatch, getState) => {
    jquery.get("/api/add/" + text).then(x => {
      Callback ? Callback(x) : undefined;
      dispatch({ type: ADD_TODO, text })
    });
  }
}

export function completeTodo(index,todo,Callback?) {
  // console.log("completeTodo", index);
  // return { type: COMPLETE_TODO, index }
    return (dispatch, getState) => {
    jquery.get("/api/updata/" + todo.Id).then(x => {
      Callback ? Callback(x) : undefined;
      dispatch({ type: COMPLETE_TODO, index })
    });
  }
}

export function setVisibilityFilter(filter) {
  // console.log("setVisibilityFilter", filter);
  return { type: SET_VISIBILITY_FILTER, filter }
}