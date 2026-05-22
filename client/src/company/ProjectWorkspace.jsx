import { useMemo, useState } from 'react'

const PROJECTS = [
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
]

const STATUS_META = {
  Planning: { bg: '#E0E7FF', color: '#3730A3' },
  'In Progress': { bg: '#FEF3C7', color: '#92400E' },
  Review: { bg: '#DBEAFE', color: '#1D4ED8' },
  Completed: { bg: '#D1FAE5', color: '#065F46' },
}

const TASK_META = {
  Todo: { bg: '#F1F5F9', color: '#475569' },
  'In Review': { bg: '#DBEAFE', color: '#1D4ED8' },
  Done: { bg: '#D1FAE5', color: '#065F46' },
}

export default function ProjectWorkspace() {
  const [selectedProjectId, setSelectedProjectId] = useState(PROJECTS[0].id)
  const [statusFilter, setStatusFilter] = useState('All')

  const statusOptions = ['All', 'Planning', 'In Progress', 'Review']

  const filteredProjects = useMemo(
    () => PROJECTS.filter(project => statusFilter === 'All' || project.status === statusFilter),
    [statusFilter]
  )

  const selectedProject = filteredProjects.find(project => project.id === selectedProjectId) || filteredProjects[0] || null

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, var(--dark), #1E1B4B)',
        borderRadius: 14,
        padding: '18px 20px',
        marginBottom: 16,
        color: 'white',
      }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.62)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
          Project Workspace
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Track live project execution and delivery</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
          Monitor task flow, deadlines, and team progress from one workspace.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 14 }}>
        {[
          { label: 'Active Projects', value: PROJECTS.length, icon: '🗂️' },
          { label: 'In Progress Tasks', value: PROJECTS.flatMap(project => project.tasks).filter(task => task.state === 'In Review').length, icon: '⚡' },
          { label: 'Completed Tasks', value: PROJECTS.flatMap(project => project.tasks).filter(task => task.state === 'Done').length, icon: '✅' },
        ].map(stat => (
          <div key={stat.label} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 18, marginBottom: 6 }}>{stat.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--dark)' }}>{stat.value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 14 }}>
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--dark)' }}>Projects Board</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {statusOptions.map(option => (
                <button
                  key={option}
                  onClick={() => setStatusFilter(option)}
                  style={{
                    border: 'none',
                    borderRadius: 100,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '4px 10px',
                    cursor: 'pointer',
                    background: statusFilter === option ? 'var(--accent)' : 'var(--bg)',
                    color: statusFilter === option ? 'white' : 'var(--muted)',
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredProjects.map(project => {
              const statusMeta = STATUS_META[project.status] || STATUS_META.Planning
              const isActive = selectedProject?.id === project.id
              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  style={{
                    border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: 10,
                    background: isActive ? 'var(--accent-light)' : 'var(--white)',
                    textAlign: 'left',
                    padding: '12px 13px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)' }}>{project.title}</div>
                    <span style={{ fontSize: 10, fontWeight: 700, borderRadius: 100, padding: '3px 8px', background: statusMeta.bg, color: statusMeta.color }}>
                      {project.status}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 7 }}>{project.company} · Deadline {project.deadline}</div>
                  <div style={{ height: 7, borderRadius: 99, background: '#E2E8F0', overflow: 'hidden' }}>
                    <div style={{ width: `${project.progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent), #FB923C)' }} />
                  </div>
                </button>
              )
            })}
            {filteredProjects.length === 0 && (
              <div style={{ background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border)', padding: '14px', fontSize: 13, color: 'var(--muted)' }}>
                No project found for this status.
              </div>
            )}
          </div>
        </div>

        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px' }}>
          {selectedProject ? (
            <>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--dark)', marginBottom: 4 }}>{selectedProject.title}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>
                {selectedProject.company} · {selectedProject.progress}% completed · {selectedProject.team.join(', ')}
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                <button className="btn-primary" style={{ padding: '8px 12px', fontSize: 12 }}>Open Workspace</button>
                <button className="btn-secondary" style={{ padding: '8px 12px', fontSize: 12 }}>Share Update</button>
                <button className="btn-secondary" style={{ padding: '8px 12px', fontSize: 12 }}>Set Milestone</button>
              </div>

              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                Task Checklist
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selectedProject.tasks.map(task => {
                  const meta = TASK_META[task.state] || TASK_META.Todo
                  return (
                    <div key={task.name} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '11px 12px', display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--dark)', marginBottom: 2 }}>{task.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)' }}>Owner: {task.owner}</div>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, borderRadius: 100, padding: '4px 9px', background: meta.bg, color: meta.color, whiteSpace: 'nowrap' }}>
                        {task.state}
                      </span>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>Pick a project from the board to view details.</div>
          )}
        </div>
      </div>
    </div>
  )
}
