import actionTypes from '../actionTypes'

const initialState = {
  todoList: [
    {
      id: 1,
      title: 'Task 1',
      inprogress: true,
    },
    {
      id: 2,
      title: 'Task 2',
      inprogress: true,
    },
    {
      id: 3,
      title: 'Task 3',
      inprogress: false,
    },
  ],
  filter: 'all',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_TODO:
      return {
        ...state,
        todoList: [
          ...state.todoList.slice(0, action.payload.index),
          ...state.todoList.slice(action.payload.index + 1),
        ],
      }
    case actionTypes.INSERT_TODO:
      return {
        ...state,
        todoList: [...state.todoList, action.payload.todo],
      }
    case actionTypes.TOGGLE_TODO:
      return {
        ...state,
        todoList: state.todoList.map(
          (todo, index) =>
            index === action.payload.index
              ? { ...todo, inprogress: !todo.inprogress }
              : todo
        ),
      }
    case actionTypes.TOGGLE_ALL:
      return {
        ...state,
        todoList: state.todoList.map(item => ({
          ...item,
          inprogress:
            state.todoList.filter(item => item.inprogress === true).length !==
            state.todoList.length,
        })),
      }
    case actionTypes.SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter,
      }
    default:
      return state
  }
}

export default reducer
