import React from 'react'
import ReactDOM from 'react-dom'

import { MainContextProvider } from './MainContext'
import App from './App'

ReactDOM.render(
  <MainContextProvider>
    <App />
  </MainContextProvider>,
  document.getElementById('root')
)
