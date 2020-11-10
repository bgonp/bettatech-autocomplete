import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from './MainContext'
import Loading from './Loading'

import './App.css'

const MAX_SUGGESTIONS = 12

const App: React.FC = () => {
  const { ready, getSuggestions } = useContext(MainContext)

  const [value, setValue] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    setSuggestions(value ? getSuggestions(value, MAX_SUGGESTIONS) : [])
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  const handleClick = (suggestion: string) => () =>
    setValue(value + suggestion)

  return (
    <div className="autocomplete">
      <h1>Autocomplete</h1>

      <input type="text" onChange={handleChange} value={value} />

      <ul>{suggestions.map((suggestion, index) => (
        <li key={index}>
          <button type="button" onClick={handleClick(suggestion)}>
            <strong>{value}</strong>{suggestion}
          </button>
        </li>
      ))}</ul>

      {ready || <Loading />}
    </div>
  )
}

export default App
