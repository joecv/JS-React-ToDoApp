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
  color: ${props =>
    props.currentFilter === 'all' ? '#41c7df' : '#616161'};
  /* font-weight: ${props =>
    props.currentFilter === 'all' ? 'bold' : 'normal'}; */
  text-decoration-line: ${props =>
    props.currentFilter === 'all' ? 'underline' : 'line-through'};
  &:hover {
    color: #41c7df;
  }
`

const StyledFilterActiveButton = StyledAnchor.extend`
  margin: 0px 5px;
  color: ${props =>
    props.currentFilter === 'active' ? '#fefefe' : '#616161'};
 /* font-weight: ${props =>
    props.currentFilter === 'active' ? 'bold' : 'normal'}; */
  text-decoration-line: ${props =>
    props.currentFilter === 'active' ? 'underline' : 'line-through'};
  &:hover {
    color: #fefefe;
  }
`

const StyledFilterCompletedButton = StyledAnchor.extend`
  margin: 0px 5px;
  color: ${props =>
    props.currentFilter === 'done' ? '#01994d' : '#616161'};
  /* font-weight: ${props =>
    props.currentFilter === 'done' ? 'bold' : 'normal'}; */
  text-decoration-line: ${props =>
    props.currentFilter === 'done' ? 'underline' : 'line-through'};
  &:hover {
    color: #01994d;
  }
`
const StyledToggleAllButton = StyledAnchor.extend`
height: 45px;
-moz-box-shadow:inset 0px 1px 0px 0px #cf866c;
	-webkit-box-shadow:inset 0px 1px 0px 0px #cf866c;
	box-shadow:inset 0px 1px 0px 0px #cf866c;
	background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #d0451b), color-stop(1, #bc3315));
	background:-moz-linear-gradient(top, #d0451b 5%, #bc3315 100%);
	background:-webkit-linear-gradient(top, #d0451b 5%, #bc3315 100%);
	background:-o-linear-gradient(top, #d0451b 5%, #bc3315 100%);
	background:-ms-linear-gradient(top, #d0451b 5%, #bc3315 100%);
	background:linear-gradient(to bottom, #d0451b 5%, #bc3315 100%);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#d0451b', endColorstr='#bc3315',GradientType=0);
	background-color:#d0451b;
	-moz-border-radius:3px;
	-webkit-border-radius:3px;
	border-radius:3px;
	border:1px solid #942911;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:13px;
	padding:2px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #854629;
  &:hover {
    background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #bc3315), color-stop(1, #d0451b));
	background:-moz-linear-gradient(top, #bc3315 5%, #d0451b 100%);
	background:-webkit-linear-gradient(top, #bc3315 5%, #d0451b 100%);
	background:-o-linear-gradient(top, #bc3315 5%, #d0451b 100%);
	background:-ms-linear-gradient(top, #bc3315 5%, #d0451b 100%);
	background:linear-gradient(to bottom, #bc3315 5%, #d0451b 100%);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#bc3315', endColorstr='#d0451b',GradientType=0);
	background-color:#bc3315;
  color:#ffffff;
  }
  &:active {
    position:relative;
    top:1px;
    color:#ffffff;
  }
`

// const StyledToggleAllButton = StyledAnchor.extend`
//   padding: 10px 10px 10px 0px;
//   color: #fff;
//   font-size: 16px;
//   /* font-weight: bold; */
//   border: 1px solid;
//   padding: 5px 25px;
//   background-color: #f34863;
//   border-radius: 5px;
//   &:hover {
//     color: #fefefe;
//     /* font-weight: bold; */
//   }
//   &:active {
//     color: #fefefe;
//     /* font-weight: bold; */
//   }
// `

const StyledReadOnlyTextbox = styled.input`
  margin: 5px 10px;
  height: 45px;
  border: none;
  background-color: transparent;
  font-size: 16px;
  font-weight: normal;
  color: #fefefe;
`

class ToDoActions extends Component {
  handleToggleAll = () => {
    this.props.toggleAll()
  }

  setFilter = filter => {
    this.props.setFilter(filter)
  }

  render() {
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
