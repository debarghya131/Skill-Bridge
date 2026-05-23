const DEFAULT_COMPANY_PAYMENT_STATE = {
  summary: [
    { label: 'Available Balance', value: '₹42,500', icon: '💰', bg: '#D1FAE5', color: '#065F46' },
    { label: 'Pending Payouts', value: '₹18,000', icon: '⏳', bg: '#FEF3C7', color: '#92400E' },
    { label: 'This Month Spend', value: '₹27,500', icon: '📊', bg: '#DBEAFE', color: '#1D4ED8' },
  ],
  methods: [
    { label: 'Primary Bank Account', value: 'HDFC Bank •••• 2819', status: 'Verified' },
    { label: 'UPI AutoPay', value: 'skillbridge@okhdfcbank', status: 'Active' },
  ],
  transactions: [
    { title: 'Frontend Internship payout', amount: '-₹10,000', date: 'Apr 17, 2026', status: 'Paid', color: '#991B1B', bg: '#FEE2E2' },
    { title: 'Wallet top-up', amount: '+₹25,000', date: 'Apr 14, 2026', status: 'Added', color: '#065F46', bg: '#D1FAE5' },
    { title: 'Node.js API Task escrow', amount: '-₹12,000', date: 'Apr 12, 2026', status: 'Locked', color: '#92400E', bg: '#FEF3C7' },
    { title: 'Social Media role payout', amount: '-₹6,000', date: 'Apr 08, 2026', status: 'Paid', color: '#991B1B', bg: '#FEE2E2' },
  ],
  recommendedActions: [
    'Keep enough wallet balance before sending interview tasks and offers.',
    'Set a verified bank account for student payouts and refunds.',
    'Review locked escrow amounts for active GIGs every week.',
    'Download payment statements before monthly account closing.',
  ],
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function buildDefaultCompanyPaymentState() {
  return clone(DEFAULT_COMPANY_PAYMENT_STATE)
}

module.exports = {
  buildDefaultCompanyPaymentState,
  DEFAULT_COMPANY_PAYMENT_STATE,
}
