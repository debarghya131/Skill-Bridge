export const DEMO_TALENT_PROFILES = [
  {
    name: 'Riya Sharma',
    college: 'Ranchi University',
    location: 'Ranchi',
    skills: ['React', 'Node.js', 'UI/UX Design'],
    skillsByLevel: { Pro: ['React'], Intermediate: ['Node.js', 'UI/UX Design'], Beginner: [] },
    streak: 21,
    score: 870,
    projects: 4,
    github: 'github.com/riyasharma',
    contactInfo: [
      { label: 'Email', value: 'riya.sharma@skillbridge.demo' },
      { label: 'WhatsApp', value: '+91 98765 41001' },
    ],
    intro: 'Frontend-focused student with strong UI thinking and clean React project execution.',
    savedProjects: [
      { name: 'Creator Portfolio Studio', desc: 'Built a React portfolio builder with reusable page sections and export-ready layouts.' },
      { name: 'Campus Event Landing Page', desc: 'Designed and shipped a polished event promo site with ticket CTA sections and motion cards.' },
    ],
  },
  {
    name: 'Aman Dubey',
    college: 'LNCT Bhopal',
    location: 'Bhopal',
    skills: ['Python', 'Data Analysis', 'Excel/Sheets'],
    skillsByLevel: { Pro: ['Python'], Intermediate: ['Data Analysis'], Beginner: ['Excel/Sheets'] },
    streak: 12,
    score: 810,
    projects: 3,
    github: 'github.com/amandubey',
    contactInfo: [
      { label: 'Email', value: 'aman.dubey@skillbridge.demo' },
      { label: 'LinkedIn', value: 'linkedin.com/in/aman-dubey-data' },
    ],
    intro: 'Data-focused builder who enjoys turning raw business data into usable dashboards and reports.',
    savedProjects: [
      { name: 'Sales Trend Analyzer', desc: 'Created a dashboard to track monthly sales movement and identify low-performing product lines.' },
      { name: 'Inventory Health Tracker', desc: 'Built an Excel system to flag restock urgency, aging stock, and reorder patterns.' },
    ],
  },
  {
    name: 'Priya Singh',
    college: 'BIT Mesra',
    location: 'Ranchi',
    skills: ['Canva', 'Social Media', 'Content Writing'],
    skillsByLevel: { Pro: ['Content Writing'], Intermediate: ['Social Media'], Beginner: ['Canva'] },
    streak: 8,
    score: 790,
    projects: 5,
    github: 'portfolio.priyasingh.in',
    contactInfo: [
      { label: 'Email', value: 'priya.singh@skillbridge.demo' },
      { label: 'Instagram', value: '@priyawrites' },
    ],
    intro: 'Content creator with strong campaign storytelling, post design consistency, and audience-focused writing.',
    savedProjects: [
      { name: 'Festival Campaign Pack', desc: 'Produced a full content calendar, promo post set, and caption framework for a festive brand launch.' },
      { name: 'Brand Voice Guide', desc: 'Defined content tone, visual style, and CTA format for recurring social media posts.' },
    ],
  },
  {
    name: 'Rohit Kumar',
    college: 'NIT Jamshedpur',
    location: 'Jamshedpur',
    skills: ['WordPress', 'SEO', 'UI/UX Design'],
    skillsByLevel: { Pro: ['SEO'], Intermediate: ['WordPress'], Beginner: ['UI/UX Design'] },
    streak: 15,
    score: 830,
    projects: 6,
    github: 'github.com/rohitkumar',
    contactInfo: [
      { label: 'Email', value: 'rohit.kumar@skillbridge.demo' },
      { label: 'Phone', value: '+91 98765 41004' },
    ],
    intro: 'Website and SEO enthusiast focused on performance, accessibility, and practical small-business websites.',
    savedProjects: [
      { name: 'Local Business Website Revamp', desc: 'Improved information architecture, page loading speed, and lead capture sections.' },
      { name: 'SEO Audit Board', desc: 'Created a simple audit sheet for keyword gaps, metadata fixes, and content opportunities.' },
    ],
  },
]

function profileKey(profile) {
  return `${profile.name || ''}::${profile.location || ''}`.trim().toLowerCase()
}

export function mergeTalentProfiles(realProfiles = []) {
  const mergedProfiles = [...DEMO_TALENT_PROFILES]
  const existingKeys = new Set(DEMO_TALENT_PROFILES.map(profileKey))

  realProfiles.forEach(profile => {
    const key = profileKey(profile)
    if (!existingKeys.has(key)) {
      mergedProfiles.push(profile)
      existingKeys.add(key)
    }
  })

  return mergedProfiles
}
