const DEFAULT_BROWSE_GIGS = [
  { id: 1, company: 'Gupta Electronics', location: 'Jamshedpur', workMode: 'On-site', title: 'React Dashboard', budget: '₹8,000/mo', match: 97, tags: ['React', 'UI/UX Design'], posted: '2 days ago' },
  { id: 2, company: 'Meera Boutique', location: 'Patna', workMode: 'Hybrid', title: 'Instagram Content', budget: '₹4,500/mo', match: 94, tags: ['Canva', 'Social Media'], posted: '3 days ago' },
  { id: 3, company: 'Sharma Traders', location: 'Ranchi', workMode: 'On-site', title: 'Excel Inventory System', budget: '₹3,000/project', match: 89, tags: ['Excel/Sheets', 'Data Analysis'], posted: '1 day ago' },
  { id: 4, company: 'TechPrint Solutions', location: 'Dhanbad', workMode: 'Remote', title: 'WordPress Site Revamp', budget: '₹6,000/project', match: 85, tags: ['WordPress', 'UI/UX Design'], posted: '5 days ago' },
  { id: 5, company: 'Arora Sweets', location: 'Lucknow', workMode: 'On-site', title: 'Menu Design & Branding', budget: '₹2,500/project', match: 78, tags: ['Canva', 'UI/UX Design'], posted: '1 day ago' },
  { id: 6, company: 'Nexus IT Hub', location: 'Bhopal', workMode: 'Remote', title: 'Python Data Pipeline', budget: '₹9,000/mo', match: 91, tags: ['Python', 'Data Analysis'], posted: '4 hours ago' },
]

const DEFAULT_OPPORTUNITIES = [
  {
    id: 1,
    title: 'Frontend Internship',
    company: 'CodeNest Solutions',
    companyInitial: 'C',
    companyColor: '#6366F1',
    location: 'Remote',
    stipend: '₹10,000 / month',
    deadline: 'Apr 25, 2026',
    sentOn: '2 hours ago',
    message: 'Hi! We reviewed your React and UI/UX Design profile on SkillBridge and were impressed by your verified skill levels. We would love to have you join our frontend team for a 3-month internship.',
    matchedSkills: ['React', 'UI/UX Design'],
    duration: '3 months',
    type: 'Internship',
    status: 'new',
  },
  {
    id: 2,
    title: 'Social Media Content Role',
    company: 'Urban Threads',
    companyInitial: 'U',
    companyColor: '#EC4899',
    location: 'Kolkata',
    stipend: '₹6,000 / month',
    deadline: 'Apr 28, 2026',
    sentOn: '1 day ago',
    message: 'We came across your Content Marketing profile and think you would be a great fit for managing our Instagram and Facebook presence. We are a growing fashion brand looking for fresh creative talent.',
    matchedSkills: ['Content Marketing', 'SEO'],
    duration: '2 months',
    type: 'Part-Time GIG',
    status: 'new',
  },
  {
    id: 3,
    title: 'Data Analysis Project',
    company: 'Insight Labs',
    companyInitial: 'I',
    companyColor: '#0891B2',
    location: 'Bengaluru',
    stipend: '₹12,000 / month',
    deadline: 'Apr 30, 2026',
    sentOn: '3 days ago',
    message: 'Your SQL and Power BI skills caught our attention. We have a 2-month data analysis project involving sales dashboards and customer segmentation. Your TrustScore and verified badges make you a strong candidate.',
    matchedSkills: ['SQL', 'Power BI'],
    duration: '2 months',
    type: 'Project GIG',
    status: 'new',
  },
]

const DEFAULT_ACTIVE_GIG_BASE = [
  {
    id: 201,
    company: 'PixelForge Studio',
    location: 'Bengaluru',
    workMode: 'Remote',
    title: 'Landing Page UI Revamp',
    budget: '₹7,500/project',
    tags: ['UI/UX Design', 'React'],
    posted: 'Started 2 days ago',
    progress: 'Milestone 2 of 4',
  },
]

const DEFAULT_COMPLETED_GIGS = [
  { id: 99, company: 'Bajaj Kirana Store', location: 'Patna', workMode: 'On-site', title: 'Billing Sheet Setup', budget: '₹1,500/project', tags: ['Excel/Sheets'], completedOn: 'Mar 2025' },
  { id: 100, company: 'BrightLeaf Media', location: 'Delhi', workMode: 'Hybrid', title: 'Instagram Reel Pack', budget: '₹3,200/project', tags: ['Canva', 'Content Marketing'], completedOn: 'Feb 2025' },
  { id: 101, company: 'CodeTrail Labs', location: 'Remote', workMode: 'Remote', title: 'Portfolio Website Fixes', budget: '₹5,000/project', tags: ['React', 'UI/UX Design'], completedOn: 'Jan 2025' },
]

function buildDefaultGigState() {
  return {
    opportunities: DEFAULT_OPPORTUNITIES.map(item => ({ ...item })),
    browseGigs: DEFAULT_BROWSE_GIGS.map(item => ({ ...item })),
    savedGigIds: [1, 4, 6],
    appliedGigIds: [2, 6],
    activeGigBase: DEFAULT_ACTIVE_GIG_BASE.map(item => ({ ...item })),
    completedGigs: DEFAULT_COMPLETED_GIGS.map(item => ({ ...item })),
  }
}

module.exports = {
  DEFAULT_ACTIVE_GIG_BASE,
  DEFAULT_BROWSE_GIGS,
  DEFAULT_COMPLETED_GIGS,
  DEFAULT_OPPORTUNITIES,
  buildDefaultGigState,
}
