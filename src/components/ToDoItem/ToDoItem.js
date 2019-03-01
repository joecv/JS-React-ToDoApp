import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { deleteTodo, toggleTodo, updateTodo } from '../../redux/actionCreators'

const StyledListItem = styled.li`
  height: 60px;
  margin: 10px 0px;
  padding: 5px 0px;
  vertical-align: middle;
  text-align: center;
  border: none;
  border-bottom: 1px dotted #696969;
  background-color: transparent;
  color: ${props => (props.inProgress ? '#fff' : '#01994d')};
  display: flex;
  & > div {
    text-decoration-line: ${props =>
      props.inProgress ? 'none' : 'line-through'};
    text-decoration-color: ${props => (props.inProgress ? '#fff' : '#01994d')};
  }
`

const StyledToDoContent = styled.div`
  font-weight: normal;
  font-size: 20px;
  margin: 5px 5px;
  padding: 5px 10px;
  width: 100%;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;  
  &:contenteditable {
    background-color:#bada55
  }
`

const StyledButton = styled.button`
  width: 40px;
  height: 40px;
  font-weight: bolder;
  border-radius: 50%;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  background-color: #2a2a2a;
  border: 1px solid #999;
  outline: 0;
  margin: 7px 5px;
  cursor: pointer;
`
 
const StyledToggleButton = StyledButton.extend`
border-color: ${props => (props.inProgress ? '#fff' : '#01994d')};
  color: ${props => (props.inProgress ? '#fff' : '#01994d')};
  &:hover {
    color: ${props => (props.inProgress ? '#01994d' : '#fff')};
  }
`

const StyledRemoveButton = StyledButton.extend`
  color: #f00;
  visibility: hidden;
  &:hover {
    box-shadow: 0 1px 2px #fff, 0 -1px 1px #666,
      inset 0 -1px 2px rgba(0, 0, 0, 0.5),
      inset 0 1px 1px rgba(255, 255, 255, 0.8);
  }

  ${StyledListItem}:hover & {
    visibility: visible;
  }
`

class ToDoItem extends Component {
  handleToggleToDo = () => {
    this.props.toggleTodo(this.props.index)
  }

  handleRemoveToDo = () => {
    const confirmRemove = window.confirm(
      `Delete item '${this.props.todoList[this.props.index].title}'?`
    )

    if (confirmRemove) {
      this.props.deleteTodo(this.props.index)
    }
  }

  handleTodoUpdate = (event) => {
    if (event.nativeEvent.keyCode === 13) {
      event.preventDefault();
      const newToDo = {
        id: this.props.item.id,
        title: event.target.innerHTML,
        inprogress: this.props.item.inprogress,
      }
      this.props.updateTodo(newToDo)     
    }
  }
  
  handleToDoClick = (e) =>{
    if (this.props.item.inprogress)
    {
      e.target.contentEditable = true;
    }
  }

  render() {
    return (
      <StyledListItem inProgress={this.props.item.inprogress}>
        <StyledToggleButton
          onClick={this.handleToggleToDo}
          inProgress={this.props.item.inprogress}
        >
          &#10004;
        </StyledToggleButton>
        <StyledToDoContent onClick={this.handleToDoClick} onKeyDown={this.handleTodoUpdate} onKeyUp={this.handleOnKeyUp}>{this.props.item.title}</StyledToDoContent>
        <StyledRemoveButton onClick={this.handleRemoveToDo}>
          &#10006;
        </StyledRemoveButton>
      </StyledListItem>
    )
  }
}

const mapStateToProps = ({ todo: { todoList } }) => ({
  todoList,
})

const mapDispatchToProps = dispatch => {
  return {
    deleteTodo: index => dispatch(deleteTodo(index)),
    toggleTodo: index => dispatch(toggleTodo(index)),
    updateTodo: todo => dispatch(updateTodo(todo)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoItem)
