import actionTypes from '../actionTypes'

const { FETCH_POSTS } = actionTypes

const initialState = {
  posts: [],
  isLoading: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, isLoading: true }
    default:
      return state
  }
}

export default reducer
