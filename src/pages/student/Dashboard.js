// import React, { useEffect, useState } from 'react';
// import { Card, Row, Col, ProgressBar, Alert } from 'react-bootstrap';
// import { getStudentDashboard } from '../../services/StudentService';

// const Dashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const data = await getStudentDashboard();
//         setDashboardData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDashboardData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <Alert variant="danger">{error}</Alert>;

//   return (
//     <div className="dashboard-container">
//       <h2 className="mb-4">My Dashboard</h2>
      
//       <Row className="mb-4">
//         <Col md={4}>
//           <Card className="stat-card">
//             <Card.Body>
//               <Card.Title>Enrolled Courses</Card.Title>
//               <Card.Text className="stat-value">
//                 {dashboardData.enrolledCourses}
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card className="stat-card">
//             <Card.Body>
//               <Card.Title>Completed Courses</Card.Title>
//               <Card.Text className="stat-value">
//                 {dashboardData.completedCourses}
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card className="stat-card">
//             <Card.Body>
//               <Card.Title>Upcoming Assessments</Card.Title>
//               <Card.Text className="stat-value">
//                 {dashboardData.upcomingAssessments}
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <h4 className="mt-4 mb-3">Courses in Progress</h4>
//       {dashboardData.coursesInProgress.map((course) => (
//         <Card key={course.id} className="mb-3">
//           <Card.Body>
//             <Row>
//               <Col md={8}>
//                 <Card.Title>{course.title}</Card.Title>
//                 <Card.Subtitle className="mb-2 text-muted">
//                   Instructor: {course.instructor}
//                 </Card.Subtitle>
//               </Col>
//               <Col md={4}>
//                 <div className="progress-container">
//                   <span className="progress-label">
//                     {course.progress}% Complete
//                   </span>
//                   <ProgressBar now={course.progress} className="mt-2" />
//                 </div>
//               </Col>
//             </Row>
//           </Card.Body>
//         </Card>
//       ))}

//       <h4 className="mt-4 mb-3">Recent Announcements</h4>
//       {dashboardData.announcements.map((announcement) => (
//         <Card key={announcement.id} className="mb-2">
//           <Card.Body>
//             <Card.Title>{announcement.courseTitle}</Card.Title>
//             <Card.Text>{announcement.message}</Card.Text>
//             <Card.Text className="text-muted small">
//               Posted on: {new Date(announcement.date).toLocaleString()}
//             </Card.Text>
//           </Card.Body>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const renderContent = () => {
    switch (activeTab) {
      case 'courses':
        return <p>You are viewing your Courses.</p>;
      case 'quizzes':
        return <p>You are viewing your Quizzes.</p>;
      case 'assessments':
        return <p>You are viewing your Assessments.</p>;
      case 'scores':
        return <p>You are viewing your Scores.</p>;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '220px',
          backgroundColor: '#000',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '1rem'
        }}
      >
        <ListGroup variant="flush">
          <ListGroup.Item
            action
            active={activeTab === 'courses'}
            onClick={() => setActiveTab('courses')}
            style={{ backgroundColor: activeTab === 'courses' ? '#222' : 'transparent', color: '#fff' }}
          >
            Courses
          </ListGroup.Item>
          <ListGroup.Item
            action
            active={activeTab === 'quizzes'}
            onClick={() => setActiveTab('quizzes')}
            style={{ backgroundColor: activeTab === 'quizzes' ? '#222' : 'transparent', color: '#fff' }}
          >
            Quizzes
          </ListGroup.Item>
          <ListGroup.Item
            action
            active={activeTab === 'assessments'}
            onClick={() => setActiveTab('assessments')}
            style={{ backgroundColor: activeTab === 'assessments' ? '#222' : 'transparent', color: '#fff' }}
          >
            Assessments
          </ListGroup.Item>
          <ListGroup.Item
            action
            active={activeTab === 'scores'}
            onClick={() => setActiveTab('scores')}
            style={{ backgroundColor: activeTab === 'scores' ? '#222' : 'transparent', color: '#fff' }}
          >
            Scores
          </ListGroup.Item>
        </ListGroup>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '2rem' }}>
        <Card>
          <Card.Body>
            <h4 className="mb-3 text-capitalize">{activeTab}</h4>
            {renderContent()}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
