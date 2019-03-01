import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { insertTodo } from '../../redux/actionCreators'

const StyledToDoText = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px dotted #666;
  padding: 5px 0px;
  width: 100%;
  font-size: 25px;
  margin: 5px 0px;
  color: #fff;
  background: transparent;
  -webkit-font-smoothing: antialiased
  &::-webkit-input-placeholder {
    color: #999;
  }
`

class ToDoAdd extends Component {
  handleTodoInsert = event => {
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
    return (
      <div className="container-col">
        <StyledToDoText
          type="text"
          autoFocus
          onKeyDown={this.handleTodoInsert}
          placeholder="Enter stuff you need to do..."
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoAdd)
