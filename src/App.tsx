import React, { useContext, useEffect, useState } from 'react'
import { WordsContext } from './WordsContext'

import './App.css'

const MAX_SUGGESTIONS = 10

const App: React.FC = () => {
  const { ready, autocomplete } = useContext(WordsContext)

  const [value, setValue] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    setSuggestions(value ? autocomplete(value, MAX_SUGGESTIONS) : [])
  }, [value, ready])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  const handleClick = (suggestion: string) => () =>
    setValue(value => value + suggestion)

  return (
    <div className="autocomplete-demo">
      <h1>Autocomplete demo</h1>

      <input type="text" onChange={handleChange} value={value} />

      <ul>{suggestions.map((suggestion, index) => (
        <li key={index}>
          <button type="button" onClick={handleClick(suggestion)}>
            <strong>{value}</strong>{suggestion}
          </button>
        </li>
      ))}</ul>
    </div>
  )
}

export default App
