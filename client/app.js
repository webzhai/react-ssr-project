import React from 'react'
import ReactDom from 'react-dom'
import App from './views/App.jsx'
import {AppContainer} from 'react-hot-loader' // eslint-disable-line

const root=document.getElementById('root');
ReactDom.hydrate(<App/>, root);
if(module.hot){
  ReactDom.hydrate(<AppContainer>
    <App/>
  </AppContainer>, root);
}
