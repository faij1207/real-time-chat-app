import React, { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <Link to="/" className="text-light text-decoration-none">
            Chat App
          </Link>
        </h2>
        {user && <span className="text-warning">Loged in as {user?.name}</span>}
        <Stack direction="horizontal" gap={3}>
          {user ? (
            <Nav.Link onClick={logoutUser} className="text-light">
              Logout
            </Nav.Link>
          ) : (
            <>
              <Link to="/register" className="text-light text-decoration-none">
                Register
              </Link>
              <Link to="/login" className="text-light text-decoration-none">
                Login
              </Link>
            </>
          )}
        </Stack>
      </Container> 
    </Navbar>
  );
}
