import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Signup.module.css';

const SignUp: React.FC = () => {
  return (
    <Container fluid className={`d-flex justify-content-center align-items-center ${styles.signupContainer}`}>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Row className={`w-100 ${styles.signupRow}`}>
        <Col md={6} className={`p-5 ${styles.formContainer}`}>
          <h2 className="mb-4">Sign Up</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>

            <Button variant="primary" type="submit" className={styles.signupButton}>
              Sign Up
            </Button>
          </Form>
          <p className="mt-3">
            Already have an account? <a href="/signin">Sign In</a>
          </p>
        </Col>
        <Col md={6} className={styles.backgroundContainer}>
          <div className={styles.backgroundImages}>
            {/* You can use Image components here if you want to optimize for Next.js */}
            <Image src="/cover.png" layout="fill" objectFit="cover" alt="Background image 1" />
            {/* Repeat for other images */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
