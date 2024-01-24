import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FirebaseContext } from "../context/Firebase";
import ".././commonStyle.css";

const Navigation = () => {
  const { logout } = useContext(FirebaseContext);
  const handleLogout = () => {
    // Implement your logout logic here
    logout();
    alert("User logged out");
  };
  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{ padding: "1rem", marginBottom: "4rem" }}
    >
      <Navbar.Brand as={Link} to="/" className="brand">
        Tweetx
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="d-flex justify-content-between"
      >
        <Nav className="mr-auto">
          {" "}
          <Nav.Link as={Link} to="feed">
            Feed
          </Nav.Link>
          <Nav.Link as={Link} to="users">
            Users
          </Nav.Link>
          <Nav.Link as={Link} to="profile">
            Profile
          </Nav.Link>
        </Nav>
        <Button
          variant="outline-secondary"
          onClick={handleLogout}
          style={{
            marginRight: "1rem",
            backgroundColor: "#0b58ca",
            color: "white",
            borderRadius: "none",
          }}
        >
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
