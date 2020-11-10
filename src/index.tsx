import React from 'react'
import ReactDOM from 'react-dom'

import { WordsContextProvider } from './WordsContext'
import App from './App'

ReactDOM.render(
  <WordsContextProvider>
    <App />
  </WordsContextProvider>,
  document.getElementById('root')
)
