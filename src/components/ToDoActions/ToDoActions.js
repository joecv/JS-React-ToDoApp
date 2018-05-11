import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { toggleAll, setFilter } from '../../redux/actionCreators'

const StyledAnchor = styled.a`
  font-size: 1rem;
  color: #fefefe;
  line-height: 50px;
  cursor: pointer;
  &:active {
    font-weight: normal;
  }
`
const StyledFilterAllButton = StyledAnchor.extend`
  margin: 0px 5px;
  color: #919191;
  /* font-weight: ${props =>
    props.currentFilter === 'all' ? 'bold' : 'normal'}; */
  text-decoration-line: ${props =>
    props.currentFilter === 'all' ? 'underline' : 'none'};
  &:hover {
    color: #919191;
  }
`

const StyledFilterActiveButton = StyledAnchor.extend`
  margin: 0px 5px;
  color: #fefefe;
  /* font-weight: ${props =>
    props.currentFilter === 'active' ? 'bold' : 'normal'}; */
  text-decoration-line: ${props =>
    props.currentFilter === 'active' ? 'underline' : 'none'};
  &:hover {
    color: #fefefe;
  }
`

const StyledFilterCompletedButton = StyledAnchor.extend`
  margin: 0px 5px;
  color: #01994d;
  /* font-weight: ${props =>
    props.currentFilter === 'done' ? 'bold' : 'normal'}; */
  text-decoration-line: ${props =>
    props.currentFilter === 'done' ? 'underline' : 'none'};
  &:hover {
    color: #01994d;
  }
`

const StyledToggleAllButton = StyledAnchor.extend`
  padding: 10px 10px 10px 0px;
  color: #fefefe;
  &:hover {
    color: #fefefe;
  }
  &:active {
    color: #fefefe;
  }
`

const StyledReadOnlyTextbox = styled.input`
  margin: 5px 0px;
  height: 45px;
  border: none;
  background-color: transparent;
  font-size: 14px;
  font-weight: normal;
  color: #919191;
`

class ToDoActions extends Component {
  handleToggleAll = () => {
    this.props.toggleAll()
  }

  setFilter = filter => {
    this.props.setFilter(filter)
  }

  render() {
    console.log(this.props)
    return (
      <div className="container-col">
        <StyledToggleAllButton onClick={this.handleToggleAll}>
          Toggle All
        </StyledToggleAllButton>
        <StyledReadOnlyTextbox
          disabled
          value={`(${
            this.props.todoList.filter(item => item.inprogress).length
          } items left)`}
        />
        <StyledFilterAllButton
          id="btnShowAll"
          currentFilter={this.props.filter}
          onClick={() => this.setFilter('all')}
        >
          All
        </StyledFilterAllButton>
        /
        <StyledFilterActiveButton
          id="btnShowActive"
          currentFilter={this.props.filter}
          onClick={() => this.setFilter('active')}
        >
          Active
        </StyledFilterActiveButton>
        /
        <StyledFilterCompletedButton
          id="btnShowCompleted"
          currentFilter={this.props.filter}
          onClick={() => this.setFilter('done')}
        >
          Done
        </StyledFilterCompletedButton>
      </div>
    )
  }
}

const mapStateToProps = ({ todo: { todoList, filter } }) => ({
  filter,
  todoList,
})

const mapDispatchToProps = dispatch => {
  return {
    toggleAll: () => dispatch(toggleAll()),
    setFilter: filter => dispatch(setFilter(filter)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoActions)
