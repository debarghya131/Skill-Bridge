import { useState } from 'react'
import NetworkNav from './networknav'
import NetworkHome from './networkhome'
import MyNetwork from './MyNetwork'
import NetworkTeamUp from './networkteamup'

const NETWORK_NAV_ITEMS = [
  { key: 'home', icon: '🏠', label: 'Home' },
  { key: 'my-network', icon: '🤝', label: 'My Network' },
  { key: 'team-up', icon: '🚀', label: 'Team Up' },
]

export default function Network() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div>
      <NetworkNav items={NETWORK_NAV_ITEMS} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'home' && <NetworkHome />}
      {activeTab === 'my-network' && <MyNetwork />}
      {activeTab === 'team-up' && <NetworkTeamUp />}
    </div>
  )
}
