const mongoose = require('mongoose')
const { buildDefaultEarningState } = require('../config/earningDefaults')
const { buildDefaultStudentProfile } = require('../config/studentDefaults')
const { buildDefaultGigState } = require('../config/gigDefaults')
const { buildDefaultNetworkState } = require('../config/networkDefaults')
const { buildDefaultSkillHubSkills } = require('../config/skillHubDefaults')

const profileLinkSchema = new mongoose.Schema({
  icon: { type: String, default: '🐙' },
  url: { type: String, required: true },
  saved: { type: Boolean, default: true },
}, { _id: false })

const contactInfoSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  saved: { type: Boolean, default: true },
}, { _id: false })

const projectSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  desc: { type: String, default: '' },
  link: { type: String, default: '' },
  demoLink: { type: String, default: '' },
  saved: { type: Boolean, default: false },
}, { _id: false })

const sessionSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, { _id: false })

const gigSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  company: { type: String, default: '' },
  location: { type: String, default: '' },
  workMode: { type: String, default: '' },
  title: { type: String, default: '' },
  budget: { type: String, default: '' },
  match: { type: Number, default: undefined },
  tags: { type: [String], default: [] },
  posted: { type: String, default: '' },
  progress: { type: String, default: '' },
  completedOn: { type: String, default: '' },
}, { _id: false })

const opportunitySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, default: '' },
  company: { type: String, default: '' },
  companyInitial: { type: String, default: '' },
  companyColor: { type: String, default: '' },
  location: { type: String, default: '' },
  stipend: { type: String, default: '' },
  deadline: { type: String, default: '' },
  sentOn: { type: String, default: '' },
  message: { type: String, default: '' },
  matchedSkills: { type: [String], default: [] },
  duration: { type: String, default: '' },
  type: { type: String, default: '' },
  status: { type: String, enum: ['new', 'accepted', 'declined'], default: 'new' },
}, { _id: false })

const gigStateSchema = new mongoose.Schema({
  opportunities: { type: [opportunitySchema], default: () => buildDefaultGigState().opportunities },
  browseGigs: { type: [gigSchema], default: () => buildDefaultGigState().browseGigs },
  savedGigIds: { type: [Number], default: () => buildDefaultGigState().savedGigIds },
  appliedGigIds: { type: [Number], default: () => buildDefaultGigState().appliedGigIds },
  activeGigBase: { type: [gigSchema], default: () => buildDefaultGigState().activeGigBase },
  completedGigs: { type: [gigSchema], default: () => buildDefaultGigState().completedGigs },
}, { _id: false })

const skillHubSkillSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  level: { type: Number, default: 0 },
  stage: { type: String, default: 'Beginner' },
  category: { type: String, default: 'Frontend' },
  verified: { type: Boolean, default: false },
  renewalStatus: { type: String, default: 'unverified' },
  renewalDue: { type: String, default: '-' },
  trustGain: { type: Number, default: 0 },
  trustLoss: { type: Number, default: 0 },
  createdOn: { type: String, default: '' },
  lastEvent: { type: String, default: 'created' },
  streak: { type: Number, default: 0 },
  missedDays: { type: Number, default: 0 },
}, { _id: false })

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, sparse: true, lowercase: true, trim: true, default: undefined },
  phone: { type: String, unique: true, sparse: true, trim: true, default: undefined },
  passwordHash: { type: String, required: true },
  preferredLanguage: { type: String, default: '' },
  location: { type: String, default: '' },
  contactMethod: { type: String, enum: ['email', 'phone'], default: 'email' },
  verificationMethod: { type: String, enum: ['aadhaar', 'digilocker'], default: 'aadhaar' },
  aadhaarNumber: { type: String, default: '' },
  digilockerToken: { type: String, default: '' },
  trustScore: { type: Number, default: 750 },
  avatar: { type: String, default: null },
  skills: { type: [String], default: () => buildDefaultStudentProfile().skills },
  githubLink: { type: [profileLinkSchema], default: () => buildDefaultStudentProfile().githubLink },
  contactInfo: { type: [contactInfoSchema], default: () => buildDefaultStudentProfile().contactInfo },
  projects: { type: [projectSchema], default: () => buildDefaultStudentProfile().projects },
  videoUrl: { type: String, default: null },
  skillHubSkills: { type: [skillHubSkillSchema], default: () => buildDefaultSkillHubSkills() },
  gigState: { type: gigStateSchema, default: () => buildDefaultGigState() },
  networkState: { type: mongoose.Schema.Types.Mixed, default: () => buildDefaultNetworkState() },
  earningState: { type: mongoose.Schema.Types.Mixed, default: () => buildDefaultEarningState() },
  sessions: { type: [sessionSchema], default: [] },
}, {
  timestamps: true,
})

module.exports = mongoose.models.Student || mongoose.model('Student', studentSchema)
