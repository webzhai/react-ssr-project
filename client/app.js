import React from 'react'
import ReactDom from 'react-dom'
import App from './views/App'
import {AppContainer} from 'react-hot-loader' // eslint-disable-line

const root=document.getElementById('root');

const render  = (Component)=>{
  ReactDom.hydrate(<AppContainer>
    <Component/>
  </AppContainer>, root);
}
render(App)
// 热更新
if(module.hot){
 module.hot.accept('./views/App',()=>{
   const nextApp=require('./views/App').default;
   render(nextApp)
 })
}
