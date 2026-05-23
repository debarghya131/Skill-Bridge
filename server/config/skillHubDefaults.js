const DEFAULT_SKILL_HUB_SKILLS = [
  { name: 'React', level: 85, stage: 'Pro', category: 'Frontend', verified: true, renewalStatus: 'valid', renewalDue: 'Nov 10, 2026', trustGain: 0, trustLoss: 0, createdOn: 'Jan 12, 2026', lastEvent: 'verified', streak: 5, missedDays: 0 },
  { name: 'Node.js', level: 70, stage: 'Intermediate', category: 'Backend', verified: true, renewalStatus: 'due', renewalDue: 'May 03, 2026', trustGain: 4, trustLoss: 6, createdOn: 'Feb 08, 2026', lastEvent: 'renewed', streak: 2, missedDays: 2 },
  { name: 'UI/UX Design', level: 78, stage: 'Intermediate', category: 'Design', verified: true, renewalStatus: 'expired', renewalDue: 'Apr 01, 2026', trustGain: 6, trustLoss: 8, createdOn: 'Jan 28, 2026', lastEvent: 'expired', streak: 0, missedDays: 3 },
  { name: 'SQL', level: 58, stage: 'Beginner', category: 'Analytics', verified: true, renewalStatus: 'valid', renewalDue: 'Dec 02, 2026', trustGain: 0, trustLoss: 0, createdOn: 'Feb 16, 2026', lastEvent: 'verified', streak: 7, missedDays: 0 },
  { name: 'Power BI', level: 74, stage: 'Intermediate', category: 'Analytics', verified: true, renewalStatus: 'valid', renewalDue: 'Sep 15, 2026', trustGain: 0, trustLoss: 0, createdOn: 'Mar 04, 2026', lastEvent: 'verified', streak: 3, missedDays: 1 },
  { name: 'Content Marketing', level: 67, stage: 'Intermediate', category: 'Marketing', verified: true, renewalStatus: 'due', renewalDue: 'Jun 21, 2026', trustGain: 5, trustLoss: 4, createdOn: 'Feb 25, 2026', lastEvent: 'renewed', streak: 1, missedDays: 2 },
  { name: 'Figma', level: 88, stage: 'Pro', category: 'Design', verified: true, renewalStatus: 'valid', renewalDue: 'Oct 08, 2026', trustGain: 0, trustLoss: 0, createdOn: 'Jan 30, 2026', lastEvent: 'verified', streak: 9, missedDays: 0 },
  { name: 'REST APIs', level: 62, stage: 'Intermediate', category: 'Backend', verified: true, renewalStatus: 'valid', renewalDue: 'Aug 18, 2026', trustGain: 0, trustLoss: 0, createdOn: 'Mar 11, 2026', lastEvent: 'verified', streak: 4, missedDays: 0 },
  { name: 'Python', level: 60, stage: 'Beginner', category: 'Backend', verified: false, renewalStatus: 'unverified', renewalDue: '-', trustGain: 5, trustLoss: 0, createdOn: 'Mar 14, 2026', lastEvent: 'created', streak: 0, missedDays: 0 },
  { name: 'Canva', level: 90, stage: 'Pro', category: 'Design', verified: false, renewalStatus: 'unverified', renewalDue: '-', trustGain: 4, trustLoss: 0, createdOn: 'Apr 02, 2026', lastEvent: 'created', streak: 0, missedDays: 0 },
  { name: 'Data Analysis', level: 55, stage: 'Beginner', category: 'Analytics', verified: false, renewalStatus: 'unverified', renewalDue: '-', trustGain: 5, trustLoss: 0, createdOn: 'Apr 09, 2026', lastEvent: 'created', streak: 0, missedDays: 0 },
  { name: 'SEO', level: 48, stage: 'Beginner', category: 'Marketing', verified: false, renewalStatus: 'unverified', renewalDue: '-', trustGain: 4, trustLoss: 0, createdOn: 'Apr 12, 2026', lastEvent: 'created', streak: 0, missedDays: 0 },
]

function buildDefaultSkillHubSkills() {
  return DEFAULT_SKILL_HUB_SKILLS.map(skill => ({ ...skill }))
}

module.exports = {
  DEFAULT_SKILL_HUB_SKILLS,
  buildDefaultSkillHubSkills,
}
