import React, { createContext, useEffect, useState } from 'react'
import { initTree, autocomplete } from './utils'

type WordsContextProps = {
  ready: boolean,
  autocomplete(word: string, limit: number): Array<string>
}

const initialState: WordsContextProps = {
  ready: false,
  autocomplete
}

type Props = { children: React.ReactNode }

export const WordsContext = createContext<WordsContextProps>(initialState)

export const WordsContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [ready, setReady] = useState<boolean>(false)

  useEffect(() => {
    initTree().then(() => setReady(true))
  }, [])

  return (
    <WordsContext.Provider value={{ ready, autocomplete }}>
      {children}
    </WordsContext.Provider>
  )
}
