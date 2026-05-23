import { useEffect, useState } from 'react'
import { subscribeToToasts } from './toast'

const TONE_MAP = {
  success: {
    background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
    border: '#86EFAC',
    title: '#065F46',
    text: '#166534',
    icon: '✓',
  },
  error: {
    background: 'linear-gradient(135deg, #FEF2F2, #FEE2E2)',
    border: '#FCA5A5',
    title: '#991B1B',
    text: '#B91C1C',
    icon: '!',
  },
  warning: {
    background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
    border: '#FCD34D',
    title: '#92400E',
    text: '#B45309',
    icon: '!',
  },
  info: {
    background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
    border: '#93C5FD',
    title: '#1D4ED8',
    text: '#1E40AF',
    icon: 'i',
  },
}

export default function ToastViewport() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    return subscribeToToasts(toast => {
      setToasts(current => [...current, toast])

      window.setTimeout(() => {
        setToasts(current => current.filter(item => item.id !== toast.id))
      }, toast.duration)
    })
  }, [])

  const dismissToast = toastId => {
    setToasts(current => current.filter(item => item.id !== toastId))
  }

  return (
    <div style={{
      position: 'fixed',
      top: 18,
      right: 18,
      zIndex: 3000,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      width: 'min(92vw, 360px)',
      pointerEvents: 'none',
    }}>
      {toasts.map(item => {
        const tone = TONE_MAP[item.type] || TONE_MAP.info

        return (
          <div
            key={item.id}
            style={{
              pointerEvents: 'auto',
              background: tone.background,
              border: `1px solid ${tone.border}`,
              borderRadius: 16,
              boxShadow: '0 18px 50px rgba(15, 23, 42, 0.12)',
              padding: '14px 14px 14px 12px',
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
            }}
          >
            <div style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.75)',
              color: tone.title,
              fontSize: 14,
              fontWeight: 900,
            }}>
              {tone.icon}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              {item.title ? (
                <div style={{ fontSize: 13, fontWeight: 800, color: tone.title, marginBottom: 4 }}>
                  {item.title}
                </div>
              ) : null}
              <div style={{ fontSize: 13, lineHeight: 1.55, color: tone.text }}>
                {item.message}
              </div>
            </div>

            <button
              type="button"
              onClick={() => dismissToast(item.id)}
              aria-label="Dismiss notification"
              style={{
                border: 'none',
                background: 'transparent',
                color: tone.text,
                cursor: 'pointer',
                fontSize: 16,
                lineHeight: 1,
                padding: 2,
                flexShrink: 0,
              }}
            >
              ×
            </button>
          </div>
        )
      })}
    </div>
  )
}
