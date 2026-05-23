const DEFAULT_EARNING_STATE = {
  walletStats: [
    { label: 'Wallet Balance', value: 'Rs 12,480', tone: '#10B981' },
    { label: 'This Month', value: '+Rs 4,250', tone: '#4F46E5' },
    { label: 'Pending Clearance', value: 'Rs 1,200', tone: '#EA580C' },
  ],
  availableNow: 'Rs 12,480',
  paymentHistory: [
    { id: 1, title: 'React dashboard gig payout', company: 'Gupta Electronics', amount: '+Rs 3,500', date: 'Today, 10:30 AM', status: 'Credited' },
    { id: 2, title: 'Inventory system milestone', company: 'Sharma Traders', amount: '+Rs 2,000', date: 'Apr 16, 2026', status: 'Credited' },
    { id: 3, title: 'Content sprint bonus', company: 'Meera Boutique', amount: '+Rs 750', date: 'Apr 12, 2026', status: 'Processing' },
    { id: 4, title: 'Data cleanup project', company: 'Nexus IT Hub', amount: '+Rs 1,800', date: 'Apr 08, 2026', status: 'Credited' },
    { id: 5, title: 'Referral reward', company: 'SkillBridge', amount: '+Rs 500', date: 'Apr 05, 2026', status: 'Credited' },
  ],
  upiAccounts: [
    { id: 'upi-1', label: 'Primary UPI', value: 'student@oksbi' },
    { id: 'upi-2', label: 'Backup UPI', value: 'student@ybl' },
  ],
  selectedUpi: 'student@oksbi',
  withdrawAmount: '2500',
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function buildDefaultEarningState() {
  return clone(DEFAULT_EARNING_STATE)
}

module.exports = {
  DEFAULT_EARNING_STATE,
  buildDefaultEarningState,
}
