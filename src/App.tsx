import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import ProjectSubmission from './pages/student/ProjectSubmission';
import ProjectTopics from './pages/student/ProjectTopics';
import Payment from './pages/student/Payment';
import StudentProfile from './pages/student/StudentProfile';
import StudentNotifications from './pages/student/StudentNotifications';
import Guidelines from './pages/student/Guidelines';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageStudents from './pages/admin/ManageStudents';
import Projects from './pages/admin/Projects';
import ManageExaminers from './pages/admin/ManageExaminers';
import Analytics from './pages/admin/Analytics';
import Notifications from './pages/admin/Notifications';

// Examiner Pages
import ExaminerDashboard from './pages/examiner/ExaminerDashboard';
import AssignedStudents from './pages/examiner/AssignedStudents';
import VivaEvaluation from './pages/examiner/VivaEvaluation';
import ExaminerProfile from './pages/examiner/ExaminerProfile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/login" />} />
            
            {/* Student Routes */}
            <Route path="/student" element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/student/submission" element={
              <ProtectedRoute role="student">
                <ProjectSubmission />
              </ProtectedRoute>
            } />
            <Route path="/student/topics" element={
              <ProtectedRoute role="student">
                <ProjectTopics />
              </ProtectedRoute>
            } />
            <Route path="/student/payment" element={
              <ProtectedRoute role="student">
                <Payment />
              </ProtectedRoute>
            } />
            <Route path="/student/profile" element={
              <ProtectedRoute role="student">
                <StudentProfile />
              </ProtectedRoute>
            } />
            <Route path="/student/notifications" element={
              <ProtectedRoute role="student">
                <StudentNotifications />
              </ProtectedRoute>
            } />
            <Route path="/student/guidelines" element={
              <ProtectedRoute role="student">
                <Guidelines />
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/students" element={
              <ProtectedRoute role="admin">
                <ManageStudents />
              </ProtectedRoute>
            } />
            <Route path="/admin/projects" element={
              <ProtectedRoute role="admin">
                <Projects />
              </ProtectedRoute>
            } />
            <Route path="/admin/examiners" element={
              <ProtectedRoute role="admin">
                <ManageExaminers />
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute role="admin">
                <Analytics />
              </ProtectedRoute>
            } />
            <Route path="/admin/notifications" element={
              <ProtectedRoute role="admin">
                <Notifications />
              </ProtectedRoute>
            } />

            {/* Examiner Routes */}
            <Route path="/examiner" element={
              <ProtectedRoute role="examiner">
                <ExaminerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/examiner/students" element={
              <ProtectedRoute role="examiner">
                <AssignedStudents />
              </ProtectedRoute>
            } />
            <Route path="/examiner/evaluation" element={
              <ProtectedRoute role="examiner">
                <VivaEvaluation />
              </ProtectedRoute>
            } />
            <Route path="/examiner/profile" element={
              <ProtectedRoute role="examiner">
                <ExaminerProfile />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;