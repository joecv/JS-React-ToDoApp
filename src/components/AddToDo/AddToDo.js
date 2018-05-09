import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { insertTodo, toggleAll } from '../../redux/actionCreators'

const StyledToggleAllButton = styled.a`
  text-align: center;
  display: inline-block;
  font-size: 16px;
  color: #fefefe;
  margin: 10px 0px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    color: #fefefe;
  }
  &:active {
    color: #fefefe;
  }
`
const StyledToDoText = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px dotted #666;
  padding: 5px;
  width: 100%;
  font-size: 25px;
  margin: 5px 0px;
  color: #01994d;
  background: transparent;
  -webkit-font-smoothing: antialiased
  &::-webkit-input-placeholder {
    color: #999;
  }
`

class AddToDo extends Component {
  handleToggleAll = () => {
    this.props.toggleAll()
  }

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
    // console.log(this.props)
    return (
      <div className="container-row">
        <div className="container-col">
          <StyledToDoText
            type="text"
            autoFocus
            onKeyDown={this.handleTodoInsert}
            placeholder="Enter stuff you need to do."
          />
        </div>
        <div className="container-col">
          <StyledToggleAllButton onClick={this.handleToggleAll}>
            Toggle All
          </StyledToggleAllButton>
        </div>
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
    toggleAll: () => dispatch(toggleAll()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToDo)
