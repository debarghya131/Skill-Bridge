import { Routes, Route } from 'react-router-dom'
import LandingPage from './landingpage/LandingPage'
import StudentAuth from './student/studentAuth'
import StudentDashboard from './student/student'
import Taskpage from './student/task/Taskpage'
import TrustScoreCriteria from './student/trustscoreCriteria'
import CompanyAuth from './company/companyAuth'
import CompanyDashboard from './company/company'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/student" element={<StudentAuth />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/task" element={<Taskpage />} />
      <Route path="/student/trustscore-criteria" element={<TrustScoreCriteria />} />
      <Route path="/company" element={<CompanyAuth />} />
      <Route path="/company/dashboard" element={<CompanyDashboard />} />
    </Routes>
  )
}
