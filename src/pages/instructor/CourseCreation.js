import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import RichTextEditor from '../../components/common/RichTextEditor';
import { createCourse } from '../../services/instructorService';

const CourseCreation = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    isPublic: true,
    mediaFiles: [] // this will no longer be used
  });
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourseData({
      ...courseData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) {
      setError('Course content is required');
      return;
    }
    setLoading(true);
    try {
      const fullCourseData = {
        ...courseData,
        content
      };
      await createCourse(fullCourseData);
      navigate('/instructor/courses');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-creation-container">
      <h2 className="mb-4">Create New Course</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={8}>
            <Form.Group>
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={courseData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={courseData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                <option value="programming">Programming</option>
                <option value="mathematics">Mathematics</option>
                <option value="science">Science</option>
                <option value="business">Business</option>
                <option value="arts">Arts</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Short Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={courseData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Course Content</Form.Label>
          <RichTextEditor value={content} onChange={setContent} />
        </Form.Group>
        {/* Remove file upload section */}
        {/* <Form.Group className="mb-3">
          <Form.Label>Course Media</Form.Label>
          <FileUpload onUpload={handleFileUpload} />
        </Form.Group> */}
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Make this course public"
            name="isPublic"
            checked={courseData.isPublic}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Creating Course...' : 'Create Course'}
        </Button>
      </Form>
    </div>
  );
};

export default CourseCreation;
