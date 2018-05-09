import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

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
