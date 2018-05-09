import React, { PureComponent } from 'react'
import ToDoItem from '../ToDoItem'

class ToDoList extends PureComponent {
  render() {
    console.log(this.props)
    return (
      <ul>
        {this.props.todos.map((todoItem, index) => {
          return (
            <div key={index} className="container-content">
              <ToDoItem item={todoItem} index={index} />
            </div>
          )
        })}
      </ul>
    )
  }
}

export default ToDoList
