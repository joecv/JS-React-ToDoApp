import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import TodoApp from '../TodoApp'
import PostsList from '../PostsList'
import './App.css'

const App = () => (
  <React.Fragment>
    <nav>
      <ul>
        <li>
          <Link to="/">1st</Link>
        </li>
        <li>
          <Link to="/2nd">2nd</Link>
        </li>
      </ul>
    </nav>
    <Switch>
      {/* <Route
        path="/"
        exact
        render={() => {
          console.log('render 1st')
          return <TodoApp index={0} />
        }}
      />  */}
      <Route path="/" exact component={TodoApp} />
      <Route path="/2nd" component={PostsList} />
    </Switch>
  </React.Fragment>
)

export default App
