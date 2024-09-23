import React from 'react'
import { Container,Nav ,Navbar, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <Navbar bg='dark' className='mb-4' style={{height:"3.75rem"}}>
        <Container>
            <h2>
                <Link to='/' className='text-light text-decoration-none'>Chat App</Link>
            </h2>
            <span className='text-warning'>Loged in as Crazy</span>
            <Stack direction='horizontal' gap={3}>
                <Nav>
                    <Link to='/register' className='link-light text-decoration-none'>Register</Link>
                </Nav>
                <Nav>
                    <Link to='/login' className='link-light text-decoration-none'>Login</Link>
                </Nav>
            </Stack>
        </Container>
    </Navbar>  
  )
}
