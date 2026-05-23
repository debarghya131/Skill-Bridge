const Company = require('../models/Company')
const Student = require('../models/Student')
const TaskSubmission = require('../models/TaskSubmission')
const { buildDefaultCompanyGigManagementState } = require('../config/companyGigDefaults')
const { buildDefaultCompanyWorkspaceState } = require('../config/companyWorkspaceDefaults')
const { consumeSectionOperation } = require('../utils/sectionUsage')
const { mergeTemplateState, clone, reduceTemplateState } = require('../utils/templateState')
const { buildAuthError, findModelByActiveToken, getSessionTtlMs } = require('../utils/session')

async function findStudentByToken(token) {
  return findModelByActiveToken(Student, token, 'Student', getSessionTtlMs(Number(process.env.SESSION_TTL_DAYS) || 30))
}

async function findCompanyByToken(token) {
  return findModelByActiveToken(Company, token, 'Company', getSessionTtlMs(Number(process.env.SESSION_TTL_DAYS) || 30))
}

function sanitizeGigManagementState(state) {
  const fallback = buildDefaultCompanyGigManagementState()
  const mergedState = mergeTemplateState(fallback, state)

  return {
    stats: Array.isArray(mergedState?.stats) ? clone(mergedState.stats) : fallback.stats,
    gigs: Array.isArray(mergedState?.gigs) ? clone(mergedState.gigs) : fallback.gigs,
    pipeline: Array.isArray(mergedState?.pipeline) ? clone(mergedState.pipeline) : fallback.pipeline,
    recentActivity: Array.isArray(mergedState?.recentActivity) ? clone(mergedState.recentActivity) : fallback.recentActivity,
    applicantsByGig: mergedState?.applicantsByGig && typeof mergedState.applicantsByGig === 'object'
      ? clone(mergedState.applicantsByGig)
      : fallback.applicantsByGig,
  }
}

function sanitizeProjectWorkspaceState(state) {
  const fallback = buildDefaultCompanyWorkspaceState()
  const mergedState = mergeTemplateState(fallback, state)

  return {
    projects: Array.isArray(mergedState?.projects) ? clone(mergedState.projects) : fallback.projects,
    selectedProjectId: typeof mergedState?.selectedProjectId === 'string' ? mergedState.selectedProjectId : fallback.selectedProjectId,
    statusFilter: typeof mergedState?.statusFilter === 'string' ? mergedState.statusFilter : fallback.statusFilter,
  }
}

function buildWorkspaceMemberName(studentName = '') {
  const parts = studentName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) {
    return 'Student'
  }

  if (parts.length === 1) {
    return parts[0]
  }

  return `${parts[0]} ${parts[1][0].toUpperCase()}`
}

function formatWorkspaceDeadline(baseDate) {
  const nextWeek = new Date(baseDate)
  nextWeek.setDate(nextWeek.getDate() + 7)
  return nextWeek.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function buildWorkspaceKickoffTask(memberName) {
  return {
    name: `Kickoff sync with ${memberName}`,
    owner: memberName,
    state: 'Todo',
  }
}

function buildSkillsByLevel(skillHubSkills, fallbackSkills) {
  const groupedSkills = {
    Beginner: [],
    Intermediate: [],
    Pro: [],
  }

  if (Array.isArray(skillHubSkills)) {
    skillHubSkills.forEach(skill => {
      if (!skill || typeof skill.name !== 'string' || !skill.name.trim()) {
        return
      }

      const stage = ['Beginner', 'Intermediate', 'Pro'].includes(skill.stage) ? skill.stage : 'Intermediate'
      if (!groupedSkills[stage].includes(skill.name)) {
        groupedSkills[stage].push(skill.name)
      }
    })
  }

  fallbackSkills.forEach(skill => {
    if (
      !groupedSkills.Beginner.includes(skill)
      && !groupedSkills.Intermediate.includes(skill)
      && !groupedSkills.Pro.includes(skill)
    ) {
      groupedSkills.Intermediate.push(skill)
    }
  })

  return groupedSkills
}

function sanitizeTaskSubmission(submission) {
  if (!submission) {
    return null
  }

  return {
    id: submission._id.toString(),
    studentId: submission.studentId.toString(),
    studentName: submission.studentName,
    studentLocation: submission.studentLocation || '',
    studentTrustScore: Number(submission.studentTrustScore) || 0,
    studentSkills: Array.isArray(submission.studentSkills) ? submission.studentSkills : [],
    studentSkillsByLevel: submission.studentSkillsByLevel || {},
    studentStreak: Number(submission.studentStreak) || 0,
    studentGithub: submission.studentGithub || '',
    studentContactInfo: Array.isArray(submission.studentContactInfo) ? submission.studentContactInfo : [],
    studentProjects: Array.isArray(submission.studentProjects) ? submission.studentProjects : [],
    studentVideoUrl: submission.studentVideoUrl || null,
    opportunityId: submission.opportunityId,
    gigTitle: submission.gigTitle,
    companyName: submission.companyName || '',
    companyLocation: submission.companyLocation || '',
    matchedSkills: Array.isArray(submission.matchedSkills) ? submission.matchedSkills : [],
    submissionLink: submission.submissionLink,
    note: submission.note || '',
    status: submission.status,
    feedback: submission.feedback || '',
    submittedAt: submission.submittedAt ? submission.submittedAt.toISOString() : null,
    reviewedAt: submission.reviewedAt ? submission.reviewedAt.toISOString() : null,
    createdAt: submission.createdAt ? submission.createdAt.toISOString() : null,
    updatedAt: submission.updatedAt ? submission.updatedAt.toISOString() : null,
  }
}

function normalizeTaskIdentity(payload) {
  const gigTitle = typeof payload?.gigTitle === 'string' ? payload.gigTitle.trim() : ''
  const opportunityId = Number.isFinite(Number(payload?.opportunityId)) ? Number(payload.opportunityId) : null

  if (!gigTitle) {
    throw buildAuthError('GIG title is required')
  }

  return {
    gigTitle,
    opportunityId,
  }
}

function buildStudentTaskProfile(student) {
  const skills = Array.isArray(student.skills) ? student.skills.filter(skill => typeof skill === 'string' && skill.trim()) : []
  const projects = Array.isArray(student.projects)
    ? student.projects
      .filter(project => project && (project.name || project.desc))
      .map(project => ({
        name: project.name || 'Student Project',
        desc: project.desc || 'Project details available on request.',
      }))
    : []
  const skillsByLevel = buildSkillsByLevel(student.skillHubSkills, skills)
  const streak = Array.isArray(student.skillHubSkills)
    ? Math.max(0, ...student.skillHubSkills.map(skill => Number(skill.streak) || 0))
    : 0

  return {
    studentName: student.name,
    studentLocation: student.location || '',
    studentTrustScore: Number(student.trustScore) || 0,
    studentSkills: skills,
    studentSkillsByLevel: skillsByLevel,
    studentStreak: streak,
    studentGithub: Array.isArray(student.githubLink) && student.githubLink[0] ? student.githubLink[0].url : '',
    studentContactInfo: Array.isArray(student.contactInfo) ? student.contactInfo : [],
    studentProjects: projects,
    studentVideoUrl: student.videoUrl || null,
  }
}

async function getStudentCompanyInterviewTask(token, payload) {
  const student = await findStudentByToken(token)
  const { gigTitle, opportunityId } = normalizeTaskIdentity(payload)

  const query = {
    studentId: student._id,
    gigTitle,
  }

  if (opportunityId !== null) {
    query.opportunityId = opportunityId
  }

  const taskSubmission = await TaskSubmission.findOne(query).sort({ updatedAt: -1 })
  return {
    taskSubmission: sanitizeTaskSubmission(taskSubmission),
    gigManagementState: sanitizeGigManagementState(company.gigManagementState),
    projectWorkspaceState: sanitizeProjectWorkspaceState(company.projectWorkspaceState),
  }
}

async function submitStudentCompanyInterviewTask(token, payload) {
  const student = await findStudentByToken(token)
  const { gigTitle, opportunityId } = normalizeTaskIdentity(payload)
  const submissionLink = typeof payload?.submissionLink === 'string' ? payload.submissionLink.trim() : ''
  const note = typeof payload?.note === 'string' ? payload.note.trim() : ''
  const companyName = typeof payload?.companyName === 'string' ? payload.companyName.trim() : ''
  const companyLocation = typeof payload?.companyLocation === 'string' ? payload.companyLocation.trim() : ''
  const matchedSkills = Array.isArray(payload?.matchedSkills)
    ? payload.matchedSkills.filter(skill => typeof skill === 'string' && skill.trim())
    : []
  const query = {
    studentId: student._id,
    gigTitle,
  }

  if (!submissionLink) {
    throw buildAuthError('Submission link is required')
  }

  if (opportunityId !== null) {
    query.opportunityId = opportunityId
  }

  const existingSubmission = await TaskSubmission.findOne(query).sort({ updatedAt: -1 })
  const existingMatchesNext =
    existingSubmission
    && existingSubmission.submissionLink === submissionLink
    && (existingSubmission.note || '') === note
    && JSON.stringify(Array.isArray(existingSubmission.matchedSkills) ? existingSubmission.matchedSkills : []) === JSON.stringify(matchedSkills)
    && (existingSubmission.companyName || '') === companyName
    && (existingSubmission.companyLocation || '') === companyLocation

  if (!existingMatchesNext) {
    consumeSectionOperation(
      student,
      'gig-center',
      'GIG Center',
      Number(process.env.DAILY_SECTION_OPERATION_LIMIT) || 2,
    )
  }

  const profile = buildStudentTaskProfile(student)

  const taskSubmission = await TaskSubmission.findOneAndUpdate(
    query,
    {
      $set: {
        ...profile,
        gigTitle,
        opportunityId,
        companyName,
        companyLocation,
        matchedSkills,
        submissionLink,
        note,
        status: 'submitted',
        feedback: '',
        reviewedAt: null,
        submittedAt: new Date(),
      },
      $setOnInsert: {
        studentId: student._id,
      },
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    },
  )

  return sanitizeTaskSubmission(taskSubmission)
}

async function getCompanyTaskSubmissions(token) {
  const company = await findCompanyByToken(token)
  const gigTitles = sanitizeGigManagementState(company.gigManagementState).gigs
    .map(gig => gig.title)
    .filter(Boolean)

  if (gigTitles.length === 0) {
    return []
  }

  const submissions = await TaskSubmission.find({
    gigTitle: { $in: gigTitles },
  }).sort({ submittedAt: -1, updatedAt: -1 })

  return submissions.map(sanitizeTaskSubmission)
}

async function reviewCompanyTaskSubmission(token, submissionId, payload) {
  const company = await findCompanyByToken(token)
  const gigManagementState = sanitizeGigManagementState(company.gigManagementState)
  const gigTitles = gigManagementState.gigs
    .map(gig => gig.title)
    .filter(Boolean)

  const taskSubmission = await TaskSubmission.findById(submissionId)

  if (!taskSubmission) {
    throw buildAuthError('Task submission not found', 404)
  }

  if (!gigTitles.includes(taskSubmission.gigTitle)) {
    throw buildAuthError('You can only review submissions for your own GIGs', 403)
  }

  const allowedStatuses = new Set(['reviewed', 'ready_to_hire', 'needs_revision'])
  const previousStatus = taskSubmission.status
  const nextStatus = typeof payload?.status === 'string' ? payload.status : ''

  if (!allowedStatuses.has(nextStatus)) {
    throw buildAuthError('A valid review status is required')
  }

  if (previousStatus !== nextStatus || taskSubmission.feedback !== (typeof payload?.feedback === 'string' ? payload.feedback.trim() : '')) {
    consumeSectionOperation(
      company,
      'gig-management',
      'GIG Management',
      Number(process.env.DAILY_SECTION_OPERATION_LIMIT) || 2,
    )
  }

  taskSubmission.status = nextStatus
  taskSubmission.feedback = typeof payload?.feedback === 'string' ? payload.feedback.trim() : ''
  taskSubmission.reviewedAt = new Date()

  await taskSubmission.save()

  if (previousStatus !== nextStatus) {
    const defaultGigManagementState = buildDefaultCompanyGigManagementState()
    const nextGigManagementState = clone(gigManagementState)
    const gigIndex = nextGigManagementState.gigs.findIndex(gig => gig.title === taskSubmission.gigTitle)
    const companySubmissions = await TaskSubmission.find({
      gigTitle: { $in: gigTitles },
    })

    const setValue = (items, label, value) => {
      const index = items.findIndex(item => item.label === label)
      if (index === -1) {
        return
      }

      items[index] = {
        ...items[index],
        value: String(Math.max(0, value)),
      }
    }
    const submittedBucketCount = companySubmissions.filter(item => ['submitted', 'reviewed', 'needs_revision'].includes(item.status)).length
    const readyToHireCount = companySubmissions.filter(item => item.status === 'ready_to_hire').length
    const defaultTaskSubmitted = Number(defaultGigManagementState.pipeline.find(item => item.label === 'Task Submitted')?.value) || 0
    const defaultReadyToHire = Number(defaultGigManagementState.pipeline.find(item => item.label === 'Ready to Hire')?.value) || 0
    const defaultActiveHires = Number(defaultGigManagementState.stats.find(item => item.label === 'Active Hires')?.value) || 0

    setValue(nextGigManagementState.pipeline, 'Task Submitted', defaultTaskSubmitted + submittedBucketCount)
    setValue(nextGigManagementState.pipeline, 'Ready to Hire', defaultReadyToHire + readyToHireCount)
    setValue(nextGigManagementState.stats, 'Active Hires', defaultActiveHires + readyToHireCount)

    if (gigIndex !== -1) {
      const currentGig = nextGigManagementState.gigs[gigIndex]
      nextGigManagementState.gigs[gigIndex] = {
        ...currentGig,
        status: nextStatus === 'ready_to_hire' ? 'In Progress' : 'Reviewing',
      }
    }

    const reviewMessage = nextStatus === 'ready_to_hire'
      ? `${taskSubmission.studentName} is ready to hire for ${taskSubmission.gigTitle}.`
      : nextStatus === 'needs_revision'
        ? `Revision requested from ${taskSubmission.studentName} for ${taskSubmission.gigTitle}.`
        : `${taskSubmission.studentName}'s task was reviewed for ${taskSubmission.gigTitle}.`

    nextGigManagementState.recentActivity = [reviewMessage, ...nextGigManagementState.recentActivity].slice(0, 8)

    company.gigManagementState = reduceTemplateState(nextGigManagementState, defaultGigManagementState)

    if (nextStatus === 'ready_to_hire') {
      const defaultWorkspaceState = buildDefaultCompanyWorkspaceState()
      const nextWorkspaceState = sanitizeProjectWorkspaceState(company.projectWorkspaceState)
      const memberName = buildWorkspaceMemberName(taskSubmission.studentName)
      const kickoffTask = buildWorkspaceKickoffTask(memberName)
      const projectIndex = nextWorkspaceState.projects.findIndex(project => project.title === taskSubmission.gigTitle)

      if (projectIndex !== -1) {
        const currentProject = nextWorkspaceState.projects[projectIndex]
        const nextTeam = currentProject.team.includes(memberName)
          ? currentProject.team
          : [...currentProject.team, memberName]
        const hasKickoffTask = currentProject.tasks.some(task => task.name === kickoffTask.name)

        nextWorkspaceState.projects[projectIndex] = {
          ...currentProject,
          company: taskSubmission.companyName || currentProject.company,
          status: 'In Progress',
          team: nextTeam,
          tasks: hasKickoffTask ? currentProject.tasks : [kickoffTask, ...currentProject.tasks],
        }
        nextWorkspaceState.selectedProjectId = currentProject.id
      } else {
        const nextProjectId = `p${nextWorkspaceState.projects.length + 1}`
        nextWorkspaceState.projects = [
          {
            id: nextProjectId,
            title: taskSubmission.gigTitle,
            company: taskSubmission.companyName || company.businessName,
            status: 'In Progress',
            deadline: formatWorkspaceDeadline(taskSubmission.reviewedAt || new Date()),
            progress: 18,
            team: [memberName],
            tasks: [
              kickoffTask,
              {
                name: 'Review submitted interview deliverable',
                owner: memberName,
                state: 'In Review',
              },
              {
                name: 'Share first execution update',
                owner: memberName,
                state: 'Todo',
              },
            ],
          },
          ...nextWorkspaceState.projects,
        ]
        nextWorkspaceState.selectedProjectId = nextProjectId
      }

      company.projectWorkspaceState = reduceTemplateState(nextWorkspaceState, defaultWorkspaceState)
    }

    await company.save()
  }

  return sanitizeTaskSubmission(taskSubmission)
}

module.exports = {
  getCompanyTaskSubmissions,
  getStudentCompanyInterviewTask,
  reviewCompanyTaskSubmission,
  submitStudentCompanyInterviewTask,
}
