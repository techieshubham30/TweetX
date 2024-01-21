import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FirebaseContext } from "../context/Firebase";

const Navigation = () => {
  const { logout } = useContext(FirebaseContext);
  const handleLogout = () => {
    // Implement your logout logic here
    logout();
    alert("User logged out");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Tweetx
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {" "}
          {/* Change ml-auto to mr-auto */}
          <Nav.Link as={Link} to="users">
            Users
          </Nav.Link>
          <Nav.Link as={Link} to="profile">
            Profile
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Button variant="outline-secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
