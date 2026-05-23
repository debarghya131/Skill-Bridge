const DEFAULT_COMPANY_WORKSPACE_STATE = {
  projects: [
    {
      id: 'p1',
      title: 'Social Media Content Role',
      company: 'Urban Threads',
      status: 'In Progress',
      deadline: 'Apr 30, 2026',
      progress: 62,
      team: ['Aman V', 'Riya S'],
      tasks: [
        { name: 'Submit content calendar draft', owner: 'Aman V', state: 'Done' },
        { name: 'Design 6 Instagram creatives', owner: 'Riya S', state: 'In Review' },
        { name: 'Finalize launch captions', owner: 'Aman V', state: 'Todo' },
      ],
    },
    {
      id: 'p2',
      title: 'React Dashboard Revamp',
      company: 'Gupta Electronics',
      status: 'Review',
      deadline: 'May 6, 2026',
      progress: 84,
      team: ['Priya S', 'Kunal R'],
      tasks: [
        { name: 'Migrate analytics widgets', owner: 'Kunal R', state: 'Done' },
        { name: 'QA responsive layouts', owner: 'Priya S', state: 'In Review' },
        { name: 'Push final production build', owner: 'Kunal R', state: 'Todo' },
      ],
    },
    {
      id: 'p3',
      title: 'Node.js API Task',
      company: 'CodeNest Solutions',
      status: 'Planning',
      deadline: 'May 12, 2026',
      progress: 28,
      team: ['Rohit K'],
      tasks: [
        { name: 'Define API contracts', owner: 'Rohit K', state: 'In Review' },
        { name: 'Create auth middleware', owner: 'Rohit K', state: 'Todo' },
        { name: 'Write Postman collection', owner: 'Rohit K', state: 'Todo' },
      ],
    },
  ],
  selectedProjectId: 'p1',
  statusFilter: 'All',
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function buildDefaultCompanyWorkspaceState() {
  return clone(DEFAULT_COMPANY_WORKSPACE_STATE)
}

module.exports = {
  buildDefaultCompanyWorkspaceState,
  DEFAULT_COMPANY_WORKSPACE_STATE,
}
