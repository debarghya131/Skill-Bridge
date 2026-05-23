import { createContext, useContext } from 'react'

const NetworkContext = createContext(null)

export function NetworkProvider({ value, children }) {
  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
}

export function useNetworkState() {
  const context = useContext(NetworkContext)

  if (!context) {
    throw new Error('useNetworkState must be used within NetworkProvider')
  }

  return context
}
