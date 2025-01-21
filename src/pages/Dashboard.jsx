import React from 'react'
import Header from '../components/Header'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'
import { Col, Container, Row } from 'react-bootstrap'


function Dashboard() {
  return (
    <>
      <Header />
      <div className='p-4 mt-5'>
        <h3 className='mt-5'>Welcome <span className='text-warning'>User</span> </h3>
        <Container className='mt-4'>
          <Row>
            <Col sm={12} md={8}><MyProject /></Col>
            <Col sm={12} md={4}><Profile /></Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Dashboard