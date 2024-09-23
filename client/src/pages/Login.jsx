import React from 'react'
import { Alert, Form, Button, Row, Col, Stack } from 'react-bootstrap'


export default function Login() {
  return (
    <div>
    <Form>
      <Row 
        style={{
          height: '100vh',
          justifyContent: 'center',
          paddingTop: '10%',
        }}>
        <Col md={4}>
          <Stack gap={3}>
            <h1>Login</h1>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' placeholder='Enter email' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Enter password' />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Login
            </Button>
            <Alert variant='danger'>
              Don't have an account? <Alert.Link href='/register'>Register</Alert.Link>
            </Alert>
          </Stack>
        </Col> 
        </Row>
    </Form>
  </div>
  )
}
