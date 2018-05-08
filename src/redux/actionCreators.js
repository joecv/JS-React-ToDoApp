import actionTypes from './actionTypes'

const { DELETE_TODO, INSERT_TODO, FETCH_POSTS, TOGGLE_TODO } = actionTypes

export const deleteTodo = index => ({
  type: DELETE_TODO,
  payload: { index },
})

export const insertTodo = todo => ({
  type: INSERT_TODO,
  payload: { todo },
})

export const toggleTodo = index => ({
  type: TOGGLE_TODO,
  payload: { index },
})

export const fetchPosts = () => ({
  type: FETCH_POSTS,
})
