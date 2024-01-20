import { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FirebaseContext } from "../../context/Firebase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signupUserWithEmailAndPassword } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUserWithEmailAndPassword(email, password);
  };

  return (
    <Container fluid className="d-flex align-items-center min-vh-100">
      <Row className="w-100">
        {/* Left side - Signup Form */}
        <Col
          md={6}
          className="d-flex align-items-center"
          style={{ paddingLeft: "4rem" }}
        >
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Signin
            </Button>
          </Form>
        </Col>

        {/* Right side - Image */}
        <Col md={6} className="d-none d-md-block">
          {/* Replace the placeholder with your image */}
          <img
            src="assets/images/authImage1.svg"
            alt="Authentication"
            className="img-fluid"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
