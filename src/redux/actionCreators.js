import axios from 'axios'
import actionTypes from './actionTypes'

const {
  UPDATE_TODO,
  DELETE_TODO,
  INSERT_TODO,
  FETCH_POSTS,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_SUCCESS,
  TOGGLE_TODO,
  TOGGLE_ALL,
  SET_FILTER,
} = actionTypes

export const updateTodo = todo => ({
  type: UPDATE_TODO,
  payload: {
    todo
  },
})
export const deleteTodo = index => ({
  type: DELETE_TODO,
  payload: {
    index
  },
})

export const insertTodo = todo => ({
  type: INSERT_TODO,
  payload: {
    todo
  },
})

export const toggleTodo = index => ({
  type: TOGGLE_TODO,
  payload: {
    index
  },
})

export const toggleAll = index => ({
  type: TOGGLE_ALL,
  payload: {},
})

export const setFilter = filter => ({
  type: SET_FILTER,
  payload: {
    filter
  },
})

const timeout = msec =>
  new Promise(resolve => {
    window.setTimeout(() => resolve(), msec)
  })

export const fetchPostsAsync = () => dispatch => {
  dispatch(fetchPosts())

  Promise.all([
      axios.get('https://jsonplaceholder.typicode.com/posts', {
        headers: {
          'X-Garglkarg-With': 'XMLHttpRequest'
        },
      }),
      timeout(2000),
    ])
    .then(([response]) => dispatch(fetchPostsSuccess(response.data)))
    .catch(error => dispatch(fetchPostsFailure(error)))
}

export const fetchPosts = () => ({
  type: FETCH_POSTS,
})

export const fetchPostsSuccess = data => ({
  type: FETCH_POSTS_SUCCESS,
  payload: data,
})

export const fetchPostsFailure = error => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
  error: true,
})