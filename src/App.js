import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentDashboard from './pages/student/Dashboard';
import InstructorDashboard from './pages/instructor/Dashboard';
import CourseCreation from './pages/instructor/CourseCreation';
import PrivateRoute from './components/common/PrivateRoute';
import RoleRoute from './components/common/RoleRoute';
import { AuthProvider } from './contexts/AuthContext';

// Notice there's no BrowserRouter here - it should be in index.js instead

function App() {
  return (
    <AuthProvider>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Student Routes */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <RoleRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </RoleRoute>
              </PrivateRoute>
            } />
            
            {/* Instructor Routes */}
            <Route path="/instructor/dashboard" element={
              <PrivateRoute>
                <RoleRoute allowedRoles={['instructor']}>
                  <InstructorDashboard />
                </RoleRoute>
              </PrivateRoute>
            } />
            <Route path="/instructor/courses/new" element={
              <PrivateRoute>
                <RoleRoute allowedRoles={['instructor']}>
                  <CourseCreation />
                </RoleRoute>
              </PrivateRoute>
            } />
            
            {/* Home route */}
            <Route path="/" element={<div className="text-center mt-5">
              <h2>Welcome to EduSync LMS</h2>
              <p>Please login or register to continue</p>
            </div>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;