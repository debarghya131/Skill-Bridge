const DEFAULT_STUDENT_SKILLS = ['React', 'Node.js', 'UI/UX Design']

const DEFAULT_STUDENT_PROJECTS = [
  {
    name: 'E-Commerce Dashboard',
    desc: 'Built a React admin dashboard with sales analytics, inventory tracking and order management for a local retailer.',
    link: 'https://github.com/topics/react-dashboard',
    demoLink: 'https://github.com/topics/react-dashboard',
    saved: true,
  },
  {
    name: 'College Notice Board App',
    desc: 'Flutter-based mobile app for college announcements with real-time push notifications and department filters.',
    link: 'https://github.com/topics/flutter-app',
    demoLink: 'https://github.com/topics/flutter-app',
    saved: true,
  },
  {
    name: 'Inventory Management System',
    desc: 'Excel-powered inventory tracker with automated reorder alerts and monthly report generation for Sharma Traders.',
    link: 'https://github.com/topics/inventory-management-system',
    demoLink: 'https://github.com/topics/inventory-management-system',
    saved: true,
  },
]

function buildDefaultStudentProfile(overrides = {}) {
  return {
    avatar: null,
    skills: [...DEFAULT_STUDENT_SKILLS],
    githubLink: [],
    contactInfo: [],
    projects: DEFAULT_STUDENT_PROJECTS.map(project => ({ ...project })),
    videoUrl: null,
    ...overrides,
  }
}

module.exports = {
  DEFAULT_STUDENT_PROJECTS,
  DEFAULT_STUDENT_SKILLS,
  buildDefaultStudentProfile,
}
