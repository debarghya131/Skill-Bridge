import { useEffect, useRef, useState } from 'react'
import NetworkNav from './networknav'
import { NetworkProvider } from './NetworkContext'
import { buildDemoNetworkState } from './networkDemoData'
import NetworkHome from './networkhome'
import MyNetwork from './MyNetwork'
import NetworkTeamUp from './networkteamup'
import { clearStudentSessionToken, fetchStudentNetwork, getStudentSessionToken, saveStudentNetwork } from '../studentApi'

const NETWORK_NAV_ITEMS = [
  { key: 'home', icon: '🏠', label: 'Home' },
  { key: 'my-network', icon: '🤝', label: 'My Network' },
  { key: 'team-up', icon: '🚀', label: 'Team Up' },
]

export default function Network() {
  const sessionTokenRef = useRef(getStudentSessionToken())
  const didHydrateRef = useRef(false)
  const [activeTab, setActiveTab] = useState('home')
  const [networkState, setNetworkState] = useState(() => buildDemoNetworkState())

  useEffect(() => {
    let cancelled = false

    async function loadNetworkState() {
      if (!sessionTokenRef.current) {
        didHydrateRef.current = true
        return
      }

      try {
        const result = await fetchStudentNetwork(sessionTokenRef.current)

        if (!cancelled && result.networkState) {
          setNetworkState(result.networkState)
        }
      } catch (error) {
        if (!cancelled) {
          clearStudentSessionToken()
          sessionTokenRef.current = ''
          setNetworkState(buildDemoNetworkState())
        }
      } finally {
        if (!cancelled) {
          didHydrateRef.current = true
        }
      }
    }

    loadNetworkState()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!sessionTokenRef.current || !didHydrateRef.current) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      saveStudentNetwork(sessionTokenRef.current, { networkState }).catch(() => {})
    }, 350)

    return () => window.clearTimeout(timeoutId)
  }, [networkState])

  return (
    <NetworkProvider value={{ networkState, setNetworkState }}>
      <div>
        <NetworkNav items={NETWORK_NAV_ITEMS} active={activeTab} onChange={setActiveTab} />

        {activeTab === 'home' && <NetworkHome />}
        {activeTab === 'my-network' && <MyNetwork />}
        {activeTab === 'team-up' && <NetworkTeamUp />}
      </div>
    </NetworkProvider>
  )
}
