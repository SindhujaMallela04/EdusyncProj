// src/pages/instructor/Dashboard.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const InstructorDashboard = () => {
  return (
    <Container>
      <h1>Instructor Dashboard</h1>
      <Row>
        {/* Course Management Card */}
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Manage Courses</Card.Title>
              <Card.Text>
                View and manage all your courses. You can create new courses, update existing ones, or view course statistics.
              </Card.Text>
              <Link to="/instructor/courses/new">
                <Button variant="primary">Create New Course</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Student Management Card */}
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Manage Students</Card.Title>
              <Card.Text>
                Manage your students, view their progress, and send announcements or feedback.
              </Card.Text>
              <Button variant="secondary" disabled>
                View Students (Coming Soon)
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Reports Card */}
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Course Reports</Card.Title>
              <Card.Text>
                View detailed reports of your courses, including student progress, grades, and other metrics.
              </Card.Text>
              <Button variant="secondary" disabled>
                View Reports (Coming Soon)
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default InstructorDashboard;
