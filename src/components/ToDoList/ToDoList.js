import React, { PureComponent } from 'react'
import ToDoItem from '../ToDoItem'

class ToDoList extends PureComponent {
  render() {
    // console.log(this.props)
    return (
      <div className="container-col">
        <ul>
          {this.props.todos.map((todoItem, index) => {
            return (
              <div key={index} className="container-content">
                <ToDoItem item={todoItem} index={index} />
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default ToDoList
