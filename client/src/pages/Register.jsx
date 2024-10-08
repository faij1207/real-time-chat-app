import React from "react";
import { useContext } from "react";
import { Alert, Form, Button, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    loading,
  } = useContext(AuthContext);
  return (
    <div>
      <Form onSubmit={registerUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "5%",
          }}
        >
          <Col md={4}>
            <Stack gap={3}>
              <h1>Register</h1>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      password: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {loading ? "Loading..." : "Register"}
              </Button>
              <Alert variant="info">
                Already have an account?{" "}
                <Alert.Link href="/login">Login</Alert.Link>
              </Alert>
              {registerError && <Alert variant="danger">{registerError}</Alert>}
            </Stack>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
