const PAYMENT_SUMMARY = [
  { label: 'Available Balance', value: '₹42,500', icon: '💰', bg: '#D1FAE5', color: '#065F46' },
  { label: 'Pending Payouts', value: '₹18,000', icon: '⏳', bg: '#FEF3C7', color: '#92400E' },
  { label: 'This Month Spend', value: '₹27,500', icon: '📊', bg: '#DBEAFE', color: '#1D4ED8' },
]

const PAYMENT_METHODS = [
  { label: 'Primary Bank Account', value: 'HDFC Bank •••• 2819', status: 'Verified' },
  { label: 'UPI AutoPay', value: 'skillbridge@okhdfcbank', status: 'Active' },
]

const TRANSACTIONS = [
  { title: 'Frontend Internship payout', amount: '-₹10,000', date: 'Apr 17, 2026', status: 'Paid', color: '#991B1B', bg: '#FEE2E2' },
  { title: 'Wallet top-up', amount: '+₹25,000', date: 'Apr 14, 2026', status: 'Added', color: '#065F46', bg: '#D1FAE5' },
  { title: 'Node.js API Task escrow', amount: '-₹12,000', date: 'Apr 12, 2026', status: 'Locked', color: '#92400E', bg: '#FEF3C7' },
  { title: 'Social Media role payout', amount: '-₹6,000', date: 'Apr 08, 2026', status: 'Paid', color: '#991B1B', bg: '#FEE2E2' },
]

export default function PaymentSection() {
  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #FEF3C7 0%, #FFEDD5 100%)',
        borderRadius: 16,
        padding: '24px 28px',
        border: '1px solid #FDE68A',
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
            Payment Center
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--dark)', marginBottom: 8 }}>
            Manage company wallet, payouts, and payment methods
          </div>
          <div style={{ fontSize: 13, color: '#9A3412', maxWidth: 700, lineHeight: 1.6 }}>
            Track escrow amounts for active GIGs, review payout history, and keep your business payment setup ready for smooth student payments.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignSelf: 'flex-start', flexWrap: 'wrap' }}>
          <button className="btn-accent" style={{ padding: '10px 18px', fontSize: 13 }}>
            + Add Funds
          </button>
          <button style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--text)', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
            Setup Payouts
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
        {PAYMENT_SUMMARY.map(item => (
          <div key={item.label} style={{ background: 'var(--white)', borderRadius: 12, padding: '16px 18px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--dark)', marginBottom: 4 }}>{item.value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, marginBottom: 10 }}>{item.label}</div>
            <span style={{ fontSize: 11, fontWeight: 700, background: item.bg, color: item.color, padding: '4px 10px', borderRadius: 100 }}>
              Live overview
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
        <div style={{ background: 'var(--white)', borderRadius: 14, border: '1px solid var(--border)', padding: '22px 24px' }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--dark)', marginBottom: 14 }}>Recent Transactions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {TRANSACTIONS.map(item => (
              <div key={`${item.title}-${item.date}`} style={{ background: 'var(--bg)', borderRadius: 12, border: '1px solid var(--border)', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)', marginBottom: 3 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{item.date}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--dark)', marginBottom: 4 }}>{item.amount}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, background: item.bg, color: item.color, padding: '4px 9px', borderRadius: 100 }}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'var(--white)', borderRadius: 14, border: '1px solid var(--border)', padding: '22px 24px' }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--dark)', marginBottom: 14 }}>Payment Methods</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PAYMENT_METHODS.map(item => (
                <div key={item.label} style={{ background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border)', padding: '14px 16px' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--dark)', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>{item.value}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, background: '#D1FAE5', color: '#065F46', padding: '4px 9px', borderRadius: 100 }}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--white)', borderRadius: 14, border: '1px solid var(--border)', padding: '22px 24px' }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--dark)', marginBottom: 14 }}>Recommended Actions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Keep enough wallet balance before sending interview tasks and offers.',
                'Set a verified bank account for student payouts and refunds.',
                'Review locked escrow amounts for active GIGs every week.',
                'Download payment statements before monthly account closing.',
              ].map(item => (
                <div key={item} style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 10, padding: '12px 14px', fontSize: 13, color: '#9A3412', lineHeight: 1.55 }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
