import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import GoogleAuth from "./googleAuth";
import { RiLoginBoxLine } from "react-icons/ri";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import google from "./assets/images/google.png";
import { Code } from 'lucide-react';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function SignIn() {
  const Google_ = () => {
    window.open("http://localhost:5000/auth/google", "_self")
  }
  
  const [resData, setResData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [animationProgress, setAnimationProgress] = useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(100);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  async function postSignInInfoWithGoogle(inputData) {
    let datas = {
      email: inputData.user.email,
      password: "PAF2023@@",
    };
    const response = await axios({
      method: "post",
      url: "/api/v1/users/signin",
      data: datas
    });

    if (response.data !== null && response.data.status === "fail") {
      setSnackbarMessage(response.data.message);
      setSnackbarOpen(true);
    }

    if (response.data !== null && response.data.status === "success") {
      setResData(response.data);

      localStorage.setItem("psnUserId", response.data.payload.user.id);
      localStorage.setItem("psnUserFirstName", response.data.payload.user.firstName);
      localStorage.setItem("psnUserLastName", response.data.payload.user.lastName);
      localStorage.setItem("psnUserEmail", response.data.payload.user.email);
      localStorage.setItem("psnBio", response.data.payload.user.bio);
      localStorage.setItem("psnToken", response.data.payload.token);
      navigate("/newsfeed");
    }
  }
  
  const handleAuth = (data) => {
    postSignInInfoWithGoogle(data)
  }
  
  let navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  async function postSignInInfo(inputData) {
    const response = await axios({
      method: "post",
      url: "/api/v1/users/signin",
      data: {
        email: inputData.email,
        password: inputData.password,
      },
    });

    if (response.data !== null && response.data.status === "fail") {
      setSnackbarMessage("Authentication failed");
      setSnackbarOpen(true);
    }

    if (response.data !== null && response.data.status === "success") {
      setResData(response.data);
      localStorage.setItem("psnUserId", response.data.payload.user.id);
      localStorage.setItem("psnUserFirstName", response.data.payload.user.firstName);
      localStorage.setItem("psnBio", response.data.payload.user.bio);
      localStorage.setItem("psnUserLastName", response.data.payload.user.lastName);
      localStorage.setItem("psnUserEmail", response.data.payload.user.email);
      localStorage.setItem("psnToken", response.data.payload.token);
      navigate("/newsfeed");
    }
  }

  return (
    <>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #1e40af, #3b82f6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background elements - tech themed */}
        <div style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
        }}>
          {/* Code blocks and technology shapes */}
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              style={{
                position: 'absolute',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                width: `${Math.random() * 180 + 40}px`,
                height: `${Math.random() * 80 + 20}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 25}deg) scale(${animationProgress / 100})`,
                transition: 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transitionDelay: `${i * 0.05}s`
              }}
            />
          ))}
          
          {/* Circuit-like lines */}
          {[...Array(8)].map((_, i) => (
            <div 
              key={`circuit-${i}`}
              style={{
                position: 'absolute',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                height: '2px',
                width: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 90}deg) scale(${animationProgress / 100})`,
                transition: 'transform 1.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transitionDelay: `${i * 0.1 + 0.2}s`
              }}
            />
          ))}

          {/* Digital dots */}
          {[...Array(20)].map((_, i) => (
            <div 
              key={`dot-${i}`}
              style={{
                position: 'absolute',
                borderRadius: '50%',
                backgroundColor: 'white',
                opacity: 0.1,
                width: `${Math.random() * 10 + 3}px`,
                height: `${Math.random() * 10 + 3}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `scale(${animationProgress / 100})`,
                transition: 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transitionDelay: `${i * 0.07}s`
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
            <Code size={32} style={{ color: '#1e40af' }} />
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            margin: 0
          }}>TECHSHARE</h1>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '0.75rem',
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
                color: '#1e40af',
                marginBottom: '0.5rem'
              }}>Welcome Back, Developer!</h2>
              <p style={{
                color: '#1e3a8a',
                fontSize: '1rem'
              }}>Sign in to continue your learning journey</p>
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
              <div style={{ margin: '0 1rem', color: '#1e3a8a', fontSize: '0.875rem' }}>OR</div>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
            </div>

            <Formik
              validationSchema={schema}
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                postSignInInfo(values);
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
                    <Form.Group as={Col} md="12" controlId="signInEmail">
                      <Form.Label style={{ color: "#1e3a8a", fontWeight: '500', marginBottom: '0rem' }}>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={touched.email && errors.email}
                        placeholder="Enter your email"
                        style={{
                          padding: '0.5rem',
                          borderRadius: '0.5rem',
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
                      <Form.Label style={{ color: "#1e3a8a", fontWeight: '500' }}>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={touched.password && errors.password}
                        placeholder="Enter your password"
                        style={{
                          padding: '0.5rem',
                          borderRadius: '0.5rem',
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
                      backgroundColor: '#3b82f6',
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '0.5rem',
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
                    Sign In <RiLoginBoxLine />
                  </Button>
                  
                  <div style={{ 
                    textAlign: "center", 
                    marginTop: '1rem',
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    <Link to='/signup' style={{ textDecoration: 'none' }}>
                      <Button style={{
                        background: '#2563eb',
                        border: 'none',
                        borderRadius: '0.5rem',
                        padding: '0.5rem 1.5rem',
                        fontWeight: 'bold'
                      }}>
                        Create a New Account
                      </Button>
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/* Right side decorative panel */}
          <div style={{
            flex: 1,
            background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative elements - tech themed */}
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                style={{
                  position: 'absolute',
                  borderRadius: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  width: `${(i + 1) * 80}px`,
                  height: `${(i + 1) * 80}px`,
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 10}deg)`,
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
              }}>Learn. Code. Innovate.</h2>
              <p style={{
                fontSize: '1.125rem',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                Join thousands of developers and tech enthusiasts on the TECHSHARE platform.
                Enhance your skills or teach others in our collaborative community.
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginTop: '1rem'
              }}>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '7rem'
                }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>500+</span>
                  <span style={{ fontSize: '0.875rem' }}>Courses</span>
                </div>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '7rem'
                }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>10K+</span>
                  <span style={{ fontSize: '0.875rem' }}>Developers</span>
                </div>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '7rem'
                }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>50+</span>
                  <span style={{ fontSize: '0.875rem' }}>Technologies</span>
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

export default SignIn;