import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Routes from '@client/routes/index'

export default class App extends Component {

  componentDidMount() {
    // do something here
  }

  render() {

    return [
      <div key={1}>this is App</div>,
      <Link to="/detail" key={2}> detail </Link>,
      <Link to="/test" key={3}> test </Link>,
      <Link to="/top" key={4}> top </Link>,
      <Routes key={5}/>,
    ]
  }
}
