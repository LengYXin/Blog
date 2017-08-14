import { combineReducers } from 'redux'

import { visibilityFilter, todos } from './test'
import { user } from './user'

// export * from './user'
export default combineReducers({
  visibilityFilter,
  todos,
  user
})