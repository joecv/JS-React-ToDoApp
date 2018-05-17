import React, { Component } from 'react'
import { connect } from 'react-redux'

import ToDoAdd from '../ToDoAdd'
import ToDoList from '../ToDoList'
import ToDoActions from '../ToDoActions'
import logo from './logo.svg'

class ToDoApp extends Component {
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
    this.props.setFilter(filter)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to ToDoApp {this.props.index}</h1>
        </header>
        <div className="container-row">
          <ToDoAdd />
          <ToDoActions />
          <ToDoList todos={this.filterToDos()} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ todo: { filter, todoList } }) => ({
  filter,
  todoList,
})

export default connect(mapStateToProps)(ToDoApp)
