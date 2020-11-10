import React, { createContext, useEffect, useState } from 'react'
import { initTree, getSuggestions } from './utils'

type MainContextProps = {
  ready: boolean,
  getSuggestions(word: string, limit: number): Array<string>
}

const initialState: MainContextProps = {
  ready: false,
  getSuggestions
}

type Props = { children: React.ReactNode }

export const MainContext = createContext<MainContextProps>(initialState)

export const MainContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [ready, setReady] = useState<boolean>(false)

  useEffect(() => {
    initTree().then(() => setReady(true))
  }, [])

  return (
    <MainContext.Provider value={{ ready, getSuggestions }}>
      {children}
    </MainContext.Provider>
  )
}
