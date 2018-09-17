import React from 'react'
import ReactDom from 'react-dom'
import App from './views/App.jsx'

const root=document.getElementById('root');
ReactDom.hydrate(<App/>, root);
