import todoReducer from './todoReducer'
import actionTypes from '../actionTypes'

describe('todoReducer', () => {
  it('ignores unknown actions', () => {
    const previousState = { foo: 'bar' }
    const nextState = todoReducer(previousState, { type: 'UNKNOWN_ACTION' })
    expect(nextState).toBe(previousState)
  })

  it('handles delete todo', () => {
    const previousState = { todoList: [{ todo: 1 }, { todo: 2 }] }
    const nextState = todoReducer(previousState, {
      type: actionTypes.DELETE_TODO,
      payload: { index: 1 },
    })
    expect(nextState.todoList.length).toBe(1)
    expect(nextState.todoList[0]).toBe(previousState.todoList[0])
  })
})
