import React, { Component } from 'react'
import { connect } from 'react-redux'
import { insertTodo, toggleTodos } from '../../redux/actionCreators'

class AddToDo extends Component {
  handleToggleAll = () => {
    this.props.toggleTodos()
  }

  handleTodoInsert = event => {
    console.log('hello from component')
    if (event.nativeEvent.keyCode === 13) {
      const id = this.props.todoList.length + 1
      this.props.insertTodo({
        id: id,
        title: event.nativeEvent.target.value,
        inprogress: true,
      })
      event.nativeEvent.target.value = ''
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="container-header">
        <button className="btn-toggle-all" onClick={this.handleToggleAll}>
          Toggle All
        </button>
        <input
          type="text"
          autoFocus
          className="container-header-textbox"
          onKeyDown={this.handleTodoInsert}
          placeholder="Add New Task"
        />
      </div>
    )
  }
}

const mapStateToProps = ({ todo: { todoList } }) => ({
  todoList,
})

const mapDispatchToProps = dispatch => {
  return {
    insertTodo: todo => dispatch(insertTodo(todo)),
    toggleTodos: () => dispatch(toggleTodos()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToDo)
