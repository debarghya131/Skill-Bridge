export default function StudentSidebar({
  navItems,
  active,
  onSelect,
  onLogout,
  isOpen,
  onClose,
}) {
  return (
    <aside className={`dashboard-sidebar${isOpen ? ' is-open' : ''}`} style={{
      width: 220, background: 'var(--white)',
      borderRight: '1px solid var(--border)',
      padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 4,
      position: 'sticky', top: 52, height: 'calc(100vh - 52px)', overflowY: 'auto',
    }}>
      {navItems.map(item => (
        <button
          key={item.key}
          onClick={() => {
            onSelect(item.key)
            onClose?.()
          }}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', borderRadius: 9, border: 'none',
            background: active === item.key ? 'var(--primary-light)' : 'transparent',
            color: active === item.key ? 'var(--primary)' : 'var(--muted)',
            fontWeight: active === item.key ? 700 : 500,
            fontSize: 14, cursor: 'pointer', textAlign: 'left', width: '100%',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { if (active !== item.key) e.currentTarget.style.background = 'var(--bg)' }}
          onMouseLeave={e => { if (active !== item.key) e.currentTarget.style.background = 'transparent' }}
        >
          <span style={{ fontSize: 16 }}>{item.icon}</span>
          {item.label}
        </button>
      ))}
      <div style={{ flex: 1 }} />
      <button
        onClick={() => {
          onClose?.()
          onLogout()
        }}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', borderRadius: 9, border: 'none',
          background: 'transparent', color: '#EF4444',
          fontWeight: 600, fontSize: 14, cursor: 'pointer', width: '100%',
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#FEF2F2' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
      >
        <span style={{ fontSize: 16 }}>🚪</span> Logout
      </button>
    </aside>
  )
}
