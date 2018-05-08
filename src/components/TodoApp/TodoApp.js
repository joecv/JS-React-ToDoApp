import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { deleteTodo, insertTodo, toggleTodo } from '../../redux/actionCreators'
import logo from './logo.svg'

const StyledListItem = styled.li`
  height: 60px;
  background-color: transparent;
  color: ${props => (props.inprogress ? '#01994d' : '#960101')};
  /* font-style: ${props => (props.done ? 'italic' : 'normal')}; */
  display: flex;
  &:hover {
    background-color: ${props => (props.inprogress ? '#d8f7e7' : '#f5e4e4')};;
  }
`

const StyledRemoveButton = styled.button`
  width: 50px;
  height: 50px;
  font-weight: bolder;
  background-color: #efefef;
  color: #f00;
  padding: 5px 5px;
  margin: 5px;
  border: 2px solid #fefefe;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  visibility: hidden;
  box-shadow: /*bottom external highlight*/ 0 1px 2px #fff,
    /*top external shadow*/ 0 -1px 1px #666,
    /*bottom internal shadow*/ inset 0 -1px 2px rgba(0, 0, 0, 0.5),
    /*top internal highlight*/ inset 0 1px 1px rgba(255, 255, 255, 0.8);
  &:hover {
    box-shadow: /*bottom external highlight*/ 0 1px 2px #fff,
      /*top external shadow*/ 0 -1px 1px #666,
      /*bottom internal shadow*/ inset 0 -1px 5px rgba(0, 0, 0, 0.5),
      /*top internal highlight*/ inset 0 -1px 5px rgba(255, 255, 255, 0.8);
  }
  ${StyledListItem}:hover & {
    visibility: visible;
  }
`
class IconButton extends Component {
  render() {
    return (
      <StyledRemoveButton onClick={this.props.onClick}>X</StyledRemoveButton>
    )
  }
}

class AddToDo extends Component {
  render() {
    return (
      <div className="container-header">
        <button className="btn-toggle-all" onClick={this.props.handleToggleAll}>
          Toggle All
        </button>
        <input
          type="text"
          autoFocus
          className="container-header-textbox"
          onKeyDown={this.props.handleTodoInsert}
          placeholder="Add New Task"
        />
      </div>
    )
  }
}

class ToDoItem extends Component {
  render() {
    return (
      <StyledListItem inprogress={this.props.item.inprogress}>
        <button className="btn-toggle" onClick={this.props.handleToggle}>
          Toggle
        </button>
        <div className="container-item-content">{this.props.item.title}</div>
        <IconButton onClick={this.props.onRemove} />
      </StyledListItem>
    )
  }
}

class ToDoList extends React.PureComponent {
  render() {
    return (
      <ul>
        {this.props.todos.map((todoItem, index) => {
          return (
            <div key={index} className="container-content">
              <ToDoItem
                item={todoItem}
                handleToggle={() => this.props.handleToggle(index)}
                onRemove={() => this.props.onRemove(index)}
              />
            </div>
          )
        })}
      </ul>
    )
  }
}

class TodoApp extends React.Component {
  filterToDos = () => {
    switch (this.props.filter) {
      case 'active':
        return this.props.todoList.filter(item => item.inprogress)
      case 'done':
        return this.props.todoList.filter(item => !item.inprogress)
      default:
        return [...this.props.todoList]
    }
  }

  setFilter = filter => {
    console.log('setFilter')
    // this.setState({ filter: filter })
  }

  handleToggleAll = () => {
    console.log('handleToggleAll')
    // // if atleast one item is active, we set all to done, else we set all

    // const itemsInProgressCount = this.state.todoList.filter(
    //   item => item.inprogress === true
    // ).length

    // this.setState({
    //   todoList: this.state.todoList.map(item => ({
    //     ...item,
    //     inprogress: itemsInProgressCount !== this.state.todoList.length,
    //   })),
    // })
  }

  handleTodoRemoval = index => {
    const confirmRemove = window.confirm(
      `Delete item '${this.props.todoList[index].title}'?`
    )

    if (confirmRemove) {
      this.props.deleteTodo(index)
    }
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

  handleToggle = index => {
    console.log('handleToggle')
    this.props.toggleTodo(index)
    // this.setState({
    //   todoList: this.state.todoList.map(
    //     (item, idx) =>
    //       idx === index ? { ...item, inprogress: !item.inprogress } : item
    //   ),
    // })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to TodoApp {this.props.index}</h1>
        </header>
        <div className="container">
          <AddToDo
            handleTodoInsert={this.handleTodoInsert}
            handleToggleAll={this.handleToggleAll}
          />
          <div className="container-content">
            <ToDoList
              todos={this.filterToDos()}
              handleToggle={this.handleToggle}
              onRemove={this.handleTodoRemoval}
            />
          </div>
          <div className="container-footer">
            <div className="container-footer-itemleftcontent">
              <input
                type="Text"
                disabled
                className="container-footer-itemleftcontent-readonly-textbox"
                value={`${
                  this.props.todoList.filter(item => item.inprogress).length
                } items left.`}
              />
              <input
                type="text"
                className="container-footer-itemleftcontent-readonly-textbox"
                disabled
                value={`Current filter: '${this.props.filter}'`}
              />
            </div>
            <div className="container-footer-filtercontent">
              <button
                type="button"
                className="btn-showall"
                id="btnShowAll"
                onClick={() => this.setFilter('all')}
              >
                All
              </button>
              <button
                type="button"
                id="btnShowActive"
                className="btn-showactive"
                onClick={() => this.setFilter('active')}
              >
                Active
              </button>
              <button
                type="button"
                id="btnShowCompleted"
                className="btn-showcompleted"
                onClick={() => this.setFilter('done')}
              >
                Done
              </button>
            </div>
            {/* <div className="container-footer-clearcontent">Clear Completed</div> */}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ todo: { filter, todoList } }) => ({
  filter,
  todoList,
})

const mapDispatchToProps = dispatch => {
  return {
    deleteTodo: index => dispatch(deleteTodo(index)),
    insertTodo: todo => dispatch(insertTodo(todo)),
    toggleTodo: index => dispatch(toggleTodo(index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
