import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MainContext } from './MainContext'
import Loading from './Loading'

import './App.css'

const MAX_SUGGESTIONS = 12

const App: React.FC = () => {
  const { ready, autocomplete } = useContext(MainContext)

  const [value, setValue] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [suggestion, setSuggestion] = useState<string>('')

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (suggestions.length) setSuggestion(suggestions[0])
    else setSuggestion('')
  }, [suggestions])

  useLayoutEffect(() => {
    const { current } = inputRef
    if (current !== null) {
      current.setSelectionRange(value.length, current.value.length)
    }
  }, [value, suggestion])

  const handleChange = () => {
    const { current } = inputRef
    const nextValue = current ? current.value : ''

    if (!nextValue || value.indexOf(nextValue) === 0) {
      setSuggestions([])
    } else {
      setSuggestions(autocomplete(nextValue, MAX_SUGGESTIONS))
    }
    setValue(nextValue)
  }

  const handleClick = (suggestion: string) => () => {
    setValue(value + suggestion)
    setSuggestions([])
  }

  return (
    <div className="autocomplete">
      <h1>Autocomplete</h1>

      <input
        onChange={handleChange}
        ref={inputRef}
        type="text"
        value={value + suggestion}
      />

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
