import { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FirebaseContext } from "../../context/Firebase";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const [name, setName] = useState("");

  const { signupUserWithEmailAndPassword, signinUserWithEmailAndPassword } =
    useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      // If in signup mode
      signupUserWithEmailAndPassword(email, password, name);
    } else {
      // If in login mode
      signinUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          alert("Login Successfull");
          navigate("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
  };

  const toggleAuthMode = () => {
    setIsSignup((prevMode) => !prevMode);
  };

  return (
    <Container fluid className="d-flex align-items-center min-vh-100">
      <Row className="w-100">
        {/* Left side - Signup/Login Form */}
        <Col
          md={6}
          className="d-flex align-items-center"
          style={{ paddingLeft: "4rem" }}
        >
          <Form onSubmit={handleSubmit}>
            {isSignup && (
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            )}
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
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            <p className="mt-3 d-flex align-items-center">
              {isSignup
                ? "Already have an account? "
                : "Don't have an account? "}
              <Button variant="link" className="p-0" onClick={toggleAuthMode}>
                {isSignup ? "Sign In" : "Sign Up"}
              </Button>
            </p>
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
