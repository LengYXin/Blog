// Action 只是描述了有事情发生了这一事实，并没有指明应用如何更新 state。而这正是 reducer 要做的事情。
import { combineReducers } from 'redux'
import { ADD_TODO, GET_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from '../../Actions'
const { SHOW_ALL } = VisibilityFilters

export function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

export function todos(state = [], action) {
  switch (action.type) {
    case GET_TODO:
      return [
        ...action.data
      ]
    case ADD_TODO:
      return [
        ...state,
        {
          Name: action.text,
          completed: false
        }
      ]
    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: !state[action.index].completed
        }),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}

// const todoApp = combineReducers({
//   visibilityFilter,
//   todos
// })

// export default todoApp