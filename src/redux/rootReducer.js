import { combineReducers } from 'redux'
import todoReducer from './reducers/todoReducer'
import postReducer from './reducers/postReducer'

export default combineReducers({
  todo: todoReducer,
  post: postReducer,
})
