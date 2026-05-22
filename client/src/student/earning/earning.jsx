import { useState } from 'react'

const walletStats = [
  { label: 'Wallet Balance', value: 'Rs 12,480', tone: '#10B981' },
  { label: 'This Month', value: '+Rs 4,250', tone: '#4F46E5' },
  { label: 'Pending Clearance', value: 'Rs 1,200', tone: '#EA580C' },
]

const paymentHistoryInit = [
  { id: 1, title: 'React dashboard gig payout', company: 'Gupta Electronics', amount: '+Rs 3,500', date: 'Today, 10:30 AM', status: 'Credited' },
  { id: 2, title: 'Inventory system milestone', company: 'Sharma Traders', amount: '+Rs 2,000', date: 'Apr 16, 2026', status: 'Credited' },
  { id: 3, title: 'Content sprint bonus', company: 'Meera Boutique', amount: '+Rs 750', date: 'Apr 12, 2026', status: 'Processing' },
  { id: 4, title: 'Data cleanup project', company: 'Nexus IT Hub', amount: '+Rs 1,800', date: 'Apr 08, 2026', status: 'Credited' },
  { id: 5, title: 'Referral reward', company: 'SkillBridge', amount: '+Rs 500', date: 'Apr 05, 2026', status: 'Credited' },
]

const upiAccounts = [
  { id: 'upi-1', label: 'Primary UPI', value: 'student@oksbi' },
  { id: 'upi-2', label: 'Backup UPI', value: 'student@ybl' },
]

export default function Earning() {
  const [paymentHistory, setPaymentHistory] = useState(paymentHistoryInit)
  const [withdrawAmount, setWithdrawAmount] = useState('2500')
  const [selectedUpi, setSelectedUpi] = useState(upiAccounts[0].value)

  const panelStyle = {
    background: 'var(--white)',
    borderRadius: 16,
    border: '1px solid var(--border)',
    padding: '18px 16px',
    height: 'calc(100vh - 250px)',
    minHeight: 420,
    overflowY: 'auto',
    scrollbarWidth: 'thin',
  }

  const requestWithdraw = () => {
    if (!withdrawAmount) return

    setPaymentHistory(current => [
      {
        id: Date.now(),
        title: 'UPI withdrawal request',
        company: selectedUpi,
        amount: `-Rs ${withdrawAmount}`,
        date: 'Just now',
        status: 'Processing',
      },
      ...current,
    ])
    setWithdrawAmount('')
  }

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, var(--dark), #1E1B4B)',
        borderRadius: 14,
        padding: '18px 20px',
        marginBottom: 16,
        color: 'white',
      }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
          Earnings
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Track your wallet, payouts, and withdrawals</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.68)' }}>Monitor incoming payments, review transaction history, and withdraw your balance directly to UPI.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.2fr 0.9fr', gap: 14 }}>
        <div style={panelStyle}>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)', marginBottom: 10 }}>
            Wallet Balance
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #EEF2FF, #E0F2FE)',
            borderRadius: 16,
            padding: '18px 18px',
            border: '1px solid #C7D2FE',
            marginBottom: 14,
          }}>
            <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
              Available Now
            </div>
            <div style={{ fontSize: 34, fontWeight: 900, color: 'var(--dark)', lineHeight: 1, marginBottom: 10 }}>Rs 12,480</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>Ready to withdraw to your linked UPI account.</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {walletStats.map(item => (
              <div key={item.label} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '13px 14px' }}>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: item.tone }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={panelStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)' }}>
              Payment History
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', background: 'var(--primary-light)', padding: '4px 9px', borderRadius: 100 }}>
              {paymentHistory.length} entries
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {paymentHistory.map(item => (
              <div key={item.id} style={{ background: 'var(--bg)', borderRadius: 12, border: '1px solid var(--border)', padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--dark)', marginBottom: 3 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{item.company}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: item.amount.startsWith('+') ? '#10B981' : '#EA580C' }}>{item.amount}</div>
                    <span style={{
                      display: 'inline-flex',
                      marginTop: 5,
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 100,
                      background: item.status === 'Credited' ? '#D1FAE5' : '#FEF3C7',
                      color: item.status === 'Credited' ? '#065F46' : '#92400E',
                    }}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{item.date}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={panelStyle}>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)', marginBottom: 10 }}>
            Withdraw (UPI)
          </div>

          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>Available to withdraw</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--dark)', lineHeight: 1 }}>Rs 12,480</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>Choose UPI ID</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {upiAccounts.map(account => (
                  <label key={account.id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 12px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="upi"
                      checked={selectedUpi === account.value}
                      onChange={() => setSelectedUpi(account.value)}
                    />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--dark)' }}>{account.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{account.value}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>Enter amount</div>
              <input
                value={withdrawAmount}
                onChange={e => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: '1px solid var(--border)',
                  fontSize: 14,
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <button
              className="btn-primary"
              onClick={requestWithdraw}
              style={{ justifyContent: 'center', padding: '10px 14px', fontSize: 13 }}
            >
              Withdraw to UPI
            </button>

            <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 10, padding: '12px 14px', fontSize: 12, color: '#9A3412', lineHeight: 1.6 }}>
              Minimum withdrawal is Rs 100. Processing payouts may take up to 24 hours after request confirmation.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
