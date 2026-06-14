const mongoose = require('mongoose')

const siteMetricSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, trim: true },
  count: { type: Number, default: 0, min: 0 },
}, {
  timestamps: true,
})

module.exports = mongoose.models.SiteMetric || mongoose.model('SiteMetric', siteMetricSchema)
