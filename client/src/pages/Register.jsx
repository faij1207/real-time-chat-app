import React from "react";
import { useContext } from "react";
import { Alert, Form, Button, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { registerInfo, updateRegisterInfo } = useContext(AuthContext);
  return (
    <div>
      <Form>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col md={4}>
            <Stack gap={3}>
              <h1>Register</h1>
              <h2>{user.name}</h2>
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
                Submit
              </Button>
              <Alert variant="danger">
                Already have an account?{" "}
                <Alert.Link href="/login">Login</Alert.Link>
              </Alert>
            </Stack>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
