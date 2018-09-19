import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import stores from '@client/stores/indexStore'
import App from './views/App'

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
render(App)
// 热更新
if (module.hot) {
  module.hot.accept('./views/App', () => {
    const nextApp = require('./views/App').default // eslint-disable-line
    render(nextApp)
  })
}
