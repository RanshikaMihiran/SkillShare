import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "./googleAuth";
import { Utensils } from 'lucide-react';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SignUp() {
  const [userRole, setUserRole] = useState("user");
  const [resData, setResData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(100);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  let navigate = useNavigate();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  });

  async function postSignUpInfo(inputData) {
    try {
      const response = await axios({
        method: "post",
        url: "/api/v1/users/save",
        data: {
          firstName: inputData.firstName,
          lastName: inputData.lastName,
          email: inputData.email,
          password: inputData.password,
          role: userRole,
        },
      });

      if (response.data !== null) {
        setResData(response.data);
      }

      if (response.data !== null && response.data.status === "fail") {
        setSnackbarMessage(response.data.message);
        setSnackbarOpen(true);
      }

      if (response.data !== null && response.data.status === "success") {
        navigate("/signin");
      }
    } catch (error) {
      setSnackbarMessage("An error occurred during signup");
      setSnackbarOpen(true);
    }
  }

  async function postSignUpInfoWithGoogle(inputData) {
    let displayName = [];
    displayName = inputData.user ? inputData.user.displayName : "first name";
    let firstName = displayName;
    let lastName = " ";

    let datas = {
      firstName: firstName,
      lastName: lastName,
      email: inputData.user.email,
      password: "PAF2023@@",
      role: userRole,
    };
    
    try {
      const response = await axios({
        method: "post",
        url: "/api/v1/users/save",
        data: datas,
      });

      if (response.data !== null) {
        setResData(response.data);
      }

      if (response.data !== null && response.data.status === "fail") {
        setSnackbarMessage(response.data.message);
        setSnackbarOpen(true);
      }

      if (response.data !== null && response.data.status === "success") {
        navigate("/signin");
      }
    } catch (error) {
      setSnackbarMessage("An error occurred during signup with Google");
      setSnackbarOpen(true);
    }
  }

  const handleAuth = (data) => {
    postSignUpInfoWithGoogle(data);
  };

  return (
    <>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background animation elements */}
        <div style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
        }}>
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              style={{
                position: 'absolute',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `scale(${animationProgress / 100})`,
                transition: 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transitionDelay: `${i * 0.05}s`
              }}
            />
          ))}
        </div>

        {/* Logo and Title */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginBottom: '2rem',
          opacity: animationProgress / 100,
          transform: `translateY(${(1 - animationProgress / 100) * 30}px)`,
          transition: 'transform 1s, opacity 1s',
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '0.75rem',
            borderRadius: '0.75rem',
            marginRight: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Utensils size={32} style={{ color: '#4f46e5' }} />
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            margin: 0
          }}>TECHSHARE</h1>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          width: '100%',
          maxWidth: '900px',
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          opacity: animationProgress / 100,
          transform: `translateY(${(1 - animationProgress / 100) * 20}px)`,
          transition: 'transform 1s, opacity 1s',
          transitionDelay: '0.2s'
        }}>
          {/* Left side content panel */}
          <div style={{
            flex: 1,
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '1.5rem'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: 'bold',
                color: '#4f46e5',
                marginBottom: '0.5rem'
              }}>Create Your Account</h2>
              <p style={{
                color: '#6b7280',
                fontSize: '1rem'
              }}>Join our community and start your culinary journey</p>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {/* Google Auth button */}
              <div>
                <GoogleAuth handleAuth={handleAuth} />
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '1rem 0'
            }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
              <div style={{ margin: '0 1rem', color: '#6b7280', fontSize: '0.875rem' }}>OR</div>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
            </div>

            <Formik
              validationSchema={schema}
              initialValues={{
                email: "",
                password: "",
                firstName: "",
                lastName: "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                postSignUpInfo(values);
                setSubmitting(false);
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isInValid,
                errors,
              }) => (
                <Form
                  noValidate
                  onSubmit={handleSubmit}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}
                >
                  <Row>
                    <Form.Group as={Col} md="12" controlId="signInFirstName">
                      <Form.Label style={{ color: "#4b5563", fontWeight: '500', marginBottom: '0.25rem' }}>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        isInvalid={touched.firstName && errors.firstName}
                        placeholder="Enter your first name"
                        style={{
                          padding: '0.625rem',
                          borderRadius: '0.375rem',
                          border: '1px solid #d1d5db',
                          width: '100%'
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your first name
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} md="12" controlId="signInLastName">
                      <Form.Label style={{ color: "#4b5563", fontWeight: '500', marginBottom: '0.25rem' }}>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        isInvalid={touched.lastName && errors.lastName}
                        placeholder="Enter your last name"
                        style={{
                          padding: '0.625rem',
                          borderRadius: '0.375rem',
                          border: '1px solid #d1d5db',
                          width: '100%'
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your last name
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} md="12" controlId="signInEmail">
                      <Form.Label style={{ color: "#4b5563", fontWeight: '500', marginBottom: '0.25rem' }}>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={touched.email && errors.email}
                        placeholder="Enter your email"
                        style={{
                          padding: '0.625rem',
                          borderRadius: '0.375rem',
                          border: '1px solid #d1d5db',
                          width: '100%'
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid email
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} md="12" controlId="signInPassword">
                      <Form.Label style={{ color: "#4b5563", fontWeight: '500', marginBottom: '0.25rem' }}>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={touched.password && errors.password}
                        placeholder="Enter your password"
                        style={{
                          padding: '0.625rem',
                          borderRadius: '0.375rem',
                          border: '1px solid #d1d5db',
                          width: '100%'
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your password
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Button 
                    type="submit" 
                    style={{ 
                      backgroundColor: '#4f46e5',
                      border: 'none',
                      borderRadius: '0.375rem',
                      padding: '0.625rem',
                      fontWeight: 'bold',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      marginTop: '0.5rem'
                    }}
                  >
                    Sign Up <BsFillPersonPlusFill />
                  </Button>
                  
                  <div style={{ 
                    textAlign: "center", 
                    marginTop: '1rem',
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    <Link to='/signin' style={{ textDecoration: 'none' }}>
                      <Button style={{
                        background: 'transparent',
                        border: '1px solid #4f46e5',
                        color: '#4f46e5',
                        borderRadius: '0.375rem',
                        padding: '0.5rem 1.5rem',
                        fontWeight: 'medium'
                      }}>
                        Already have an account? Sign In
                      </Button>
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/* Right side feature panel */}
          <div style={{
            flex: 1,
            background: 'linear-gradient(135deg, #4f46e5, #818cf8)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative circles */}
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                style={{
                  position: 'absolute',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  width: `${(i + 1) * 100}px`,
                  height: `${(i + 1) * 100}px`,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 0
                }}
              />
            ))}
            
            <div style={{
              position: 'relative',
              zIndex: 1,
              textAlign: 'center'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>Welcome to TECHSHARE</h2>
              <p style={{
                fontSize: '1.125rem',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                Share your culinary creations, discover new recipes, and connect with food enthusiasts from around the world.
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginTop: '2rem'
              }}>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '7rem'
                }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>10K+</span>
                  <span style={{ fontSize: '0.875rem' }}>Recipes</span>
                </div>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '7rem'
                }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>5K+</span>
                  <span style={{ fontSize: '0.875rem' }}>Chefs</span>
                </div>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '7rem'
                }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>200+</span>
                  <span style={{ fontSize: '0.875rem' }}>Cuisines</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}