import React, { createContext, useEffect, useState } from 'react'
import { initTree, autocomplete } from './utils'

type MainContextProps = {
  ready: boolean,
  autocomplete(word: string, limit: number): Array<string>
}

const initialState: MainContextProps = {
  ready: false,
  autocomplete
}

type Props = { children: React.ReactNode }

export const MainContext = createContext<MainContextProps>(initialState)

export const MainContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [ready, setReady] = useState<boolean>(false)

  useEffect(() => {
    initTree().then(() => setReady(true))
  }, [])

  return (
    <MainContext.Provider value={{ ready, autocomplete }}>
      {children}
    </MainContext.Provider>
  )
}
