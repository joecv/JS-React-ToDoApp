import actionTypes from '../actionTypes'

const { FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE } = actionTypes

const initialState = {
  posts: [],
  isLoading: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, isLoading: true }
    case FETCH_POSTS_SUCCESS:
      return { ...state, isLoading: false, posts: action.payload }
    case FETCH_POSTS_FAILURE:
      return { ...state, isLoading: false }
    default:
      return state
  }
}

export default reducer
