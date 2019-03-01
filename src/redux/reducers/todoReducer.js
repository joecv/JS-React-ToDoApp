import actionTypes from '../actionTypes'
const initialTodo = [{
    id: 1,
    title: 'Get Up.',
    inprogress: true,
  },
  {
    id: 2,
    title: 'Drop kids to school.',
    inprogress: true,
  },
  {
    id: 3,
    title: 'Reach office before 8 AM.',
    inprogress: false,
  },
]

const todoAppState = JSON.parse(localStorage.getItem("todoappstate")) || {
  todoList: initialTodo,
  filter: 'all',
}

const initialState = todoAppState
console.log("initial State: ", initialState)

const storeState = (currentState) => {
  console.log("currentState: ", currentState)
  localStorage.setItem('todoappstate', JSON.stringify(currentState))
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_TODO:
      {
        const currentState = {
          ...state,
          todoList: state.todoList.map(
            (todo, index) =>
            todo.id === action.payload.todo.id ? {
              ...todo,
              title: action.payload.todo.title
            } :
            todo
          ),
        }
        storeState(currentState)
        return currentState
      }
    case actionTypes.DELETE_TODO:
      {
        const currentState = {
          ...state,
          todoList: [
            ...state.todoList.slice(0, action.payload.index),
            ...state.todoList.slice(action.payload.index + 1),
          ],
        }
        storeState(currentState)
        return currentState
      }
    case actionTypes.INSERT_TODO:
      {
        const currentState = {
          ...state,
          todoList: [...state.todoList, action.payload.todo],
        }
        storeState(currentState)
        return currentState
      }
    case actionTypes.TOGGLE_TODO:
      {
        const currentState = {
          ...state,
          todoList: state.todoList.map(
            (todo, index) =>
            index === action.payload.index ? {
              ...todo,
              inprogress: !todo.inprogress
            } :
            todo
          ),
        }
        storeState(currentState)
        return currentState
      }
    case actionTypes.TOGGLE_ALL:
      {
        const allItemsDone =
          state.todoList.filter(item => item.inprogress === false).length ===
          state.todoList.length

        const currentState = {
          ...state,
          todoList: state.todoList.map(item => ({
            ...item,
            inprogress: allItemsDone,
          })),
        }

        storeState(currentState)
        return currentState
      }
    case actionTypes.SET_FILTER:
      {
        const currentState = {
          ...state,
          filter: action.payload.filter,
        }
        storeState(currentState)
        return currentState
      }
    default:
      return state
  }
}

export default reducer