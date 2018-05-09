import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { deleteTodo } from '../../redux/actionCreators'

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
`

class IconButton extends Component {
  render() {
    return (
      <StyledRemoveButton onClick={this.props.onClick}>X</StyledRemoveButton>
    )
  }
}

const mapStateToProps = ({ todo: { todoList } }) => ({
  todoList,
})

const mapDispatchToProps = dispatch => {
  return {
    deleteTodo: index => dispatch(deleteTodo(index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IconButton)
