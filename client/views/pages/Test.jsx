import React, {Component} from 'react'
import ReactDom from 'react-dom'
import ReactSSR from 'react-dom/server'
import {Link} from 'react-router-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import { BrowserRouter, StaticRouter } from 'react-router-dom'
import stores from '@client/stores/indexStore'
import Routes from '@client/routes/index'

class Test extends Component {

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
const clientRender=()=>{
  const root=document.getElementById('root');

  const render = (Component) => {
    ReactDom.hydrate(
      <AppContainer>
        <Provider {...stores}>
          <BrowserRouter>
            <Component/>
          </BrowserRouter>
        </Provider>
      </AppContainer>, root,
    );
  }
  render(Test)
// 热更新
  if (module.hot && ENV_IS_DEV) {
    module.hot.accept()
  }
}
const serverRender=()=>{
  const renderSSR = (Component) => {
    return (
      <Provider {...stores}>
        <StaticRouter>
          <Component/>
        </StaticRouter>
      </Provider>
    );
  }
  return renderSSR(Test)
}
export default ENV_IS_NODE ? serverRender() : clientRender();
