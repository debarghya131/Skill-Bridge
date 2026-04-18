import { Routes, Route } from 'react-router-dom'
import LandingPage from './landingpage/LandingPage'
import StudentAuth from './student/studentAuth'
import StudentOnboarding from './student/StudentOnboarding'
import CompanyAuth from './company/companyAuth'
import CompanyOnboarding from './company/CompanyOnboarding'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/student" element={<StudentAuth />} />
      <Route path="/student/onboarding" element={<StudentOnboarding />} />
      <Route path="/company" element={<CompanyAuth />} />
      <Route path="/company/onboarding" element={<CompanyOnboarding />} />
    </Routes>
  )
}
