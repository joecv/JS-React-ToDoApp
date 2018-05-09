import React, { Component } from 'react'
import { connect } from 'react-redux'

import AddToDo from '../AddToDo'
import ToDoList from '../ToDoList'
import { deleteTodo, toggleTodo, setFilter } from '../../redux/actionCreators'
import logo from './logo.svg'

// class ToDoList extends React.PureComponent {
//   render() {
//     return (
//       <ul>
//         {this.props.todos.map((todoItem, index) => {
//           return (
//             <div key={index} className="container-content">
//               <ToDoItem item={todoItem} index={index} />
//             </div>
//           )
//         })}
//       </ul>
//     )
//   }
// }

class TodoApp extends Component {
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
          <h1 className="App-title">Welcome to TodoApp {this.props.index}</h1>
        </header>
        <div className="container-row">
          <div className="container-col">
            <AddToDo />
          </div>
          <div className="container-col">
            <ToDoList todos={this.filterToDos()} />
          </div>
          <div className="container-col">
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
          <div className="container-col">
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
    toggleTodo: index => dispatch(toggleTodo(index)),
    setFilter: filter => dispatch(setFilter(filter)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
