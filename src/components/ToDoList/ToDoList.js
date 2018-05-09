import React, { Component } from 'react'
import { connect } from 'react-redux'

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
