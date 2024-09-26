import React, { useContext } from "react";
import { Alert, Form, Button, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { loginInfo, updateLoginInfo, loginUser, loginError, loading } =
    useContext(AuthContext);
  return (
    <div>
      <Form onSubmit={loginUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "5%",
          }}
        >
          <Col md={4}>
            <Stack gap={3}>
              <h1>Login</h1>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) =>
                    updateLoginInfo({ ...loginInfo, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) =>
                    updateLoginInfo({ ...loginInfo, password: e.target.value })
                  }
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {loading ? "Loading..." : "Login"}
              </Button>
              <Alert variant="danger">
                Don't have an account?{" "}
                <Alert.Link href="/register">Register</Alert.Link>
              </Alert>
              {loginError && <Alert variant="danger">{loginError}</Alert>}
            </Stack>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
