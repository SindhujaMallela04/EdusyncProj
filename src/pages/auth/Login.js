// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button, Alert } from 'react-bootstrap';
// import { useAuth } from '../../contexts/AuthContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth(); // Use the login function from AuthContext

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       const user = await login(email, password);
      
//       // Redirect based on user role
//       if (user.role === 'instructor') {
//         navigate('/instructor/dashboard');
//       } else {
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       setError(err.message || 'Failed to sign in');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2 className="text-center mb-4">Login to EduSync</h2>
//         {error && <Alert variant="danger">{error}</Alert>}
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit" disabled={loading} className="w-100">
//             {loading ? 'Logging in...' : 'Login'}
//           </Button>
//         </Form>
//         <div className="text-center mt-3">
//           <p>
//             Don't have an account? <a href="/register">Register</a>
//           </p>
//           <p>
//             <a href="/forgot-password">Forgot password?</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Static credentials for demonstration/testing
const STATIC_CREDENTIALS = [
  { email: 'student@example.com', password: 'password123', role: 'student', name: 'John Student' },
  { email: 'instructor@example.com', password: 'password123', role: 'instructor', name: 'Jane Instructor' },
  { email: 'admin@example.com', password: 'password123', role: 'admin', name: 'Admin User' }
];

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Find user in static credentials
    const user = STATIC_CREDENTIALS.find(
      user => user.email === email && user.password === password
    );

    if (user) {
      // Login successful
      login({
        email: user.email,
        name: user.name,
        role: user.role,
        notifications: Math.floor(Math.random() * 5) // Random notifications for demo
      });

      // Redirect based on role
      if (user.role === 'student') {
        navigate('/dashboard');
      } else if (user.role === 'instructor') {
        navigate('/instructor/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      }
    } else {
      // Login failed
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Sign In to EduSync</h2>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </Form>
              
              <div className="text-center mt-3">
                <a href="/forgot-password" className="text-decoration-none">Forgot password?</a>
              </div>
              
              <hr className="my-4" />
              
              <div className="text-center">
                <p className="mb-0">Don't have an account? <a href="/register" className="text-decoration-none">Register</a></p>
              </div>
              
              {/* Demo account information */}
              <div className="mt-4 p-3 bg-light rounded">
                <h6 className="text-center mb-3">Demo Accounts</h6>
                <div className="small">
                  <p className="mb-1"><strong>Student:</strong> student@example.com / password123</p>
                  <p className="mb-1"><strong>Instructor:</strong> instructor@example.com / password123</p>
                  <p className="mb-0"><strong>Admin:</strong> admin@example.com / password123</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;