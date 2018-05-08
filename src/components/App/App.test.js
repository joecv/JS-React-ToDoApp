import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import App from './App'

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    shallow(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('can add 1 and 2', () => {
    expect(1 + 2).toBe(3)
  })
})
