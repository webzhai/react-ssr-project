import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Detail from '@client/views/detail'
import Test from '@client/views/test'
import Top from '@client/views/top'

export default () => [
  <Route path="/" render={() => <Redirect to="detail"/>} exact key={1}/>,
  <Route path="/detail" component={Detail} key={2}/>,
  <Route path="/test" component={Test} key={3}/>,
  <Route path="/top" component={Top} key={4}/>,
]
