export function buildDefaultCompanyPaymentState() {
  return {
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
}

export function mergeCompanyPaymentState(state = {}) {
  const defaults = buildDefaultCompanyPaymentState()

  return {
    summary: Array.isArray(state.summary) ? state.summary : defaults.summary,
    methods: Array.isArray(state.methods) ? state.methods : defaults.methods,
    transactions: Array.isArray(state.transactions) ? state.transactions : defaults.transactions,
    recommendedActions: Array.isArray(state.recommendedActions) ? state.recommendedActions : defaults.recommendedActions,
  }
}
