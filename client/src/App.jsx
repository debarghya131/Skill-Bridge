import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import LandingPage from './landingpage/LandingPage'
import StudentAuth from './student/studentAuth'
import StudentDashboard from './student/student'
import Taskpage from './student/task/Taskpage'
import TrustScoreCriteria from './student/trustscoreCriteria'
import CompanyAuth from './company/companyAuth'
import CompanyDashboard from './company/company'
import ToastViewport from './ui/ToastViewport'
import { getStudentSessionToken } from './student/studentApi'
import { getCompanySessionToken } from './company/companyApi'

function StudentProtectedRoute() {
  const location = useLocation()
  const token = getStudentSessionToken()

  if (!token) {
    return <Navigate to="/student" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

function CompanyProtectedRoute() {
  const location = useLocation()
  const token = getCompanySessionToken()

  if (!token) {
    return <Navigate to="/company" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student" element={<StudentAuth />} />
        <Route element={<StudentProtectedRoute />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/task" element={<Taskpage />} />
          <Route path="/student/trustscore-criteria" element={<TrustScoreCriteria />} />
        </Route>
        <Route path="/company" element={<CompanyAuth />} />
        <Route element={<CompanyProtectedRoute />}>
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
        </Route>
      </Routes>
      <ToastViewport />
    </>
  )
}
