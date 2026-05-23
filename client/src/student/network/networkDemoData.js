const DEMO_NETWORK_STATE = {
  home: {
    connectRequests: [],
    teamUpRequests: [],
  },
  myNetwork: {
    people: [
      {
        id: 1,
        name: 'Priya Das',
        role: 'Product Design',
        trustScore: 910,
        status: 'Connected',
        availability: 'Open for design sprints',
        contactInfo: [
          { label: 'Email', value: 'priya.das@skillbridge.demo' },
          { label: 'LinkedIn', value: 'linkedin.com/in/priya-das-design' },
        ],
        skills: ['UI/UX Design', 'Figma', 'React'],
        streak: 12,
        skillsByLevel: { Pro: ['UI/UX Design', 'Figma'], Intermediate: ['React'], Beginner: [] },
        githubLink: [],
        projects: [
          { name: 'Creator Brand Kit', desc: 'Designed a visual identity and landing page kit for student founders building creator tools.', link: 'https://github.com/topics/design-system', demoLink: 'https://github.com/topics/design-system', saved: true },
          { name: 'Mobile Travel Planner', desc: 'Built app flows, wireframes, and polished screens for a city exploration planner.', link: 'https://github.com/topics/mobile-ui', demoLink: 'https://github.com/topics/mobile-ui', saved: true },
        ],
      },
      {
        id: 2,
        name: 'Kunal Roy',
        role: 'Full Stack Development',
        trustScore: 890,
        status: 'Connected',
        availability: 'Available after 6 PM',
        contactInfo: [
          { label: 'Email', value: 'kunal.roy@skillbridge.demo' },
          { label: 'Phone', value: '+91 98765 22102' },
        ],
        skills: ['React', 'Node.js', 'MongoDB'],
        streak: 7,
        skillsByLevel: { Pro: ['React', 'Node.js'], Intermediate: ['MongoDB'], Beginner: [] },
        githubLink: [],
        projects: [
          { name: 'Freelance CRM Dashboard', desc: 'Built a dashboard for client tracking, invoices, and follow-up reminders.', link: 'https://github.com/topics/react-dashboard', demoLink: 'https://github.com/topics/react-dashboard', saved: true },
          { name: 'Mentor Booking Platform', desc: 'Created a booking and scheduling flow with auth, payments, and admin controls.', link: 'https://github.com/topics/booking-system', demoLink: 'https://github.com/topics/booking-system', saved: true },
        ],
      },
      {
        id: 3,
        name: 'Shreya N',
        role: 'Digital Marketing',
        trustScore: 760,
        status: 'Pending',
        availability: 'Looking for campaign collaborations',
        contactInfo: [
          { label: 'Email', value: 'shreya.n@skillbridge.demo' },
          { label: 'WhatsApp', value: '+91 98765 22103' },
        ],
        skills: ['SEO', 'Content Strategy', 'Canva'],
        streak: 3,
        skillsByLevel: { Pro: ['SEO'], Intermediate: ['Content Strategy'], Beginner: ['Canva'] },
        githubLink: [],
        projects: [
          { name: 'Startup Growth Campaign', desc: 'Planned a 30-day content calendar and social launch strategy for a student startup.', link: 'https://github.com/topics/marketing-campaign', demoLink: 'https://github.com/topics/marketing-campaign', saved: true },
          { name: 'Brand Voice Playbook', desc: 'Created voice, tone, and content templates for outreach and landing page copy.', link: 'https://github.com/topics/content-marketing', demoLink: 'https://github.com/topics/content-marketing', saved: true },
        ],
      },
      {
        id: 4,
        name: 'Ritika Sen',
        role: 'Frontend Developer',
        trustScore: 870,
        status: 'Connect Available',
        availability: 'Open for web product builds',
        contactInfo: [
          { label: 'Email', value: 'ritika.sen@skillbridge.demo' },
          { label: 'LinkedIn', value: 'linkedin.com/in/ritika-sen-react' },
        ],
        skills: ['React', 'UI/UX Design', 'Tailwind'],
        streak: 9,
        skillsByLevel: { Pro: ['React'], Intermediate: ['UI/UX Design', 'Tailwind'], Beginner: [] },
        githubLink: [],
        projects: [
          { name: 'Skill Swap Marketplace', desc: 'Built a frontend marketplace flow for peer-to-peer micro-learning exchanges.', link: 'https://github.com/topics/frontend', demoLink: 'https://github.com/topics/frontend', saved: true },
          { name: 'Hackathon Demo Site', desc: 'Shipped a responsive demo site with pricing, FAQ, and live showcase sections.', link: 'https://github.com/topics/landing-page', demoLink: 'https://github.com/topics/landing-page', saved: true },
        ],
      },
      {
        id: 5,
        name: 'Aditya Menon',
        role: 'Backend Developer',
        trustScore: 900,
        status: 'Connected',
        availability: 'Open for backend-heavy team builds',
        contactInfo: [
          { label: 'Email', value: 'aditya.menon@skillbridge.demo' },
          { label: 'Phone', value: '+91 98765 22105' },
        ],
        skills: ['Node.js', 'REST APIs', 'PostgreSQL'],
        streak: 16,
        skillsByLevel: { Pro: ['Node.js', 'REST APIs'], Intermediate: ['PostgreSQL'], Beginner: [] },
        githubLink: [],
        projects: [
          { name: 'Fintech Ledger API', desc: 'Built transaction, settlement, and account history APIs with secure role controls.', link: 'https://github.com/topics/fintech', demoLink: 'https://github.com/topics/fintech', saved: true },
          { name: 'Order Routing Service', desc: 'Created a service layer for vendor assignments, delivery updates, and exception handling.', link: 'https://github.com/topics/nodejs-api', demoLink: 'https://github.com/topics/nodejs-api', saved: true },
        ],
      },
      {
        id: 6,
        name: 'Meera Pillai',
        role: 'UI Designer',
        trustScore: 840,
        status: 'Pending',
        availability: 'Available for product design reviews',
        contactInfo: [
          { label: 'Email', value: 'meera.pillai@skillbridge.demo' },
          { label: 'LinkedIn', value: 'linkedin.com/in/meera-pillai-ui' },
        ],
        skills: ['UI/UX Design', 'Figma', 'Design Systems'],
        streak: 8,
        skillsByLevel: { Pro: ['UI/UX Design'], Intermediate: ['Figma', 'Design Systems'], Beginner: [] },
        githubLink: [],
        projects: [
          { name: 'Fintech App Prototype', desc: 'Designed onboarding, transaction, and insights screens for a student fintech product.', link: 'https://github.com/topics/figma', demoLink: 'https://github.com/topics/figma', saved: true },
          { name: 'Design Token Library', desc: 'Structured reusable spacing, type, and color tokens for fast UI consistency.', link: 'https://github.com/topics/design-system', demoLink: 'https://github.com/topics/design-system', saved: true },
        ],
      },
      {
        id: 7,
        name: 'Harsh Jain',
        role: 'Growth Marketer',
        trustScore: 795,
        status: 'Connect Available',
        availability: 'Open for launch and growth experiments',
        contactInfo: [
          { label: 'Email', value: 'harsh.jain@skillbridge.demo' },
          { label: 'WhatsApp', value: '+91 98765 22107' },
        ],
        skills: ['SEO', 'Content Strategy', 'Analytics'],
        streak: 5,
        skillsByLevel: { Pro: ['SEO'], Intermediate: ['Content Strategy', 'Analytics'], Beginner: [] },
        githubLink: [],
        projects: [
          { name: 'Startup Launch Funnel', desc: 'Mapped acquisition, content hooks, and landing page experiments for an early-stage product.', link: 'https://github.com/topics/marketing-campaign', demoLink: 'https://github.com/topics/marketing-campaign', saved: true },
          { name: 'Organic Growth Audit', desc: 'Reviewed search visibility, page structure, and content gaps across product pages.', link: 'https://github.com/topics/seo', demoLink: 'https://github.com/topics/seo', saved: true },
        ],
      },
    ],
    activity: [
      {
        id: 101,
        type: 'incoming',
        name: 'Aditi Rao',
        role: 'Backend Developer',
        trustScore: 900,
        note: 'Sent you a connection request for a product collaboration.',
        when: '2 hours ago',
      },
      {
        id: 102,
        type: 'accepted',
        name: 'Kabir Jain',
        role: 'Data Analyst',
        trustScore: 840,
        note: 'Accepted your connection request.',
        when: 'Yesterday',
      },
      {
        id: 103,
        type: 'rejected',
        name: 'Meera Thomas',
        role: 'UI Designer',
        trustScore: 790,
        note: 'Declined your request for now.',
        when: '2 days ago',
      },
      {
        id: 104,
        type: 'incoming',
        name: 'Rohit Sharma',
        role: 'Python Developer',
        trustScore: 880,
        note: 'Wants to connect after seeing your recent work.',
        when: '3 days ago',
      },
    ],
    teamUpRequests: [],
  },
  teamUp: {
    myRequests: [
      { id: 101, title: 'React + Firebase web app for NGO', type: 'Web Project', slots: 2, filled: 0, skills: ['React', 'Firebase'], status: 'open' },
      { id: 102, title: 'ML model for crop yield prediction', type: 'Research', slots: 3, filled: 1, skills: ['Python', 'Data Analysis'], status: 'open' },
    ],
    incoming: [
      { id: 201, name: 'Vikram Singh', college: 'MNIT Jaipur', role: 'Full-Stack Developer', skills: ['React', 'Node.js'], streak: 13, skillsByLevel: { Pro: ['React', 'Node.js'], Intermediate: [], Beginner: [] }, trustScore: 850, avatar: 'V', message: 'Hey! I saw your NGO app post — I can contribute React components.', requestId: 101, availability: 'Open for projects', githubLink: [], projects: [{ name: 'NGO React App', desc: 'React + Firebase volunteer management app.', link: 'https://github.com/topics/react', demoLink: 'https://github.com/topics/react', saved: true }] },
      { id: 202, name: 'Divya Nair', college: 'Amrita University', role: 'Data Scientist', skills: ['Python', 'SQL'], streak: 5, skillsByLevel: { Pro: ['Python'], Intermediate: ['SQL'], Beginner: [] }, trustScore: 720, avatar: 'D', message: 'I have experience in crop data and ML pipelines, would love to join.', requestId: 102, availability: 'Looking for research collabs', githubLink: [], projects: [{ name: 'Crop Yield Predictor', desc: 'Scikit-learn regression model with weather and soil features.', link: 'https://github.com/topics/machine-learning', demoLink: 'https://github.com/topics/machine-learning', saved: true }] },
    ],
    accepted: [
      { id: 301, name: 'Siddharth Rao', college: 'IIT Bombay', role: 'Backend Developer', skills: ['Firebase', 'Node.js'], streak: 20, skillsByLevel: { Pro: ['Node.js', 'Firebase'], Intermediate: [], Beginner: [] }, trustScore: 930, avatar: 'S', projectTitle: 'React + Firebase web app for NGO', availability: 'Active collaborator', githubLink: [], projects: [{ name: 'Firebase Auth Service', desc: 'Serverless auth + Firestore integration for NGO platform.', link: 'https://github.com/topics/firebase', demoLink: 'https://github.com/topics/firebase', saved: true }] },
    ],
    sentRequests: [
      { id: 3, status: 'accepted', name: 'Rohan Das', title: 'UI/UX partner for social impact app case study', type: 'Case Study' },
      { id: 4, status: 'declined', name: 'Sneha Iyer', title: 'Content writer for open-source project docs', type: 'Open Source' },
    ],
  },
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

export function buildDemoNetworkState() {
  return clone(DEMO_NETWORK_STATE)
}
