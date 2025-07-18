import Logo from '@/components/Logo'
import { author, currentYear } from '@/helpers'
import { Link } from 'react-router'
import { Button, Card, CardBody, Col, Form, FormControl, InputGroup, Row, Alert } from 'react-bootstrap'
import PageMetaData from '@/components/PageMetaData'
import InputGroupText from 'react-bootstrap/InputGroupText'
import { useEffect, useState } from 'react'
import { TbEye, TbEyeClosed } from 'react-icons/tb'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import useAuth from '../../../api/useAuth';

const Page = () => {
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
  const [successVal, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm();


  useEffect(() => {
       localStorage.removeItem("eostoken");
    }, [])


  const onFormSubmit = async (formData: any) => {
    console.log(formData);

    setError('');
    setSuccess('');
    const apiUrl = import.meta.env.VITE_APP_API_URL;
  

    setLoading(true);



    try {
      const response = await fetch(apiUrl + "/Token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 'Access-Control-Allow-Origin': 'http://localhost:5173'
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
      });


      if (!response.ok) {
        setError("Invalid username or password. Please try again.");
        return;
      }

      const result = await response.json();

      const accessToken = result.token;
      const tokenExpiration = result.tokenExpiration;
      const refreshToken = result.refreshToken;
      const isAdminRole = result.isAdminRole;
      const active = result.active;
      const locked = result.locked;
      const otpRequired = result.otpRequired;
      const email = result.email;
      const mobileno = result.mobileno;
      const username = result.username;
      const firstname = result.firstname;
      const othernames = result.othernames;
      const roles = result.roles.split(',');

      localStorage.setItem("eostoken", JSON.stringify({ accessToken, tokenExpiration, refreshToken, isAdminRole, active, locked, otpRequired, email, mobileno, firstname, othernames, username, roles }))
      if (typeof setAuth === "function") {
        setAuth({ accessToken, tokenExpiration, refreshToken, isAdminRole, active, locked, otpRequired, email, mobileno, firstname, othernames, username, roles });
      }

      if (result.otpRequired === "1") {
        navigate('/auth/two-factor', { state: { token: refreshToken, email: email } });
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      console.log(err);
      setError("An error occurred during login. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }



  }

  return (
    <div className="auth-box p-0 w-100">
      <PageMetaData title="Sign In" />
      <Row className="w-100 g-0">
        <Col>
          <div className="h-100 position-relative card-side-img rounded-0 overflow-hidden">
            <div className="p-4 card-img-overlay auth-overlay d-flex align-items-end justify-content-center"></div>
          </div>
        </Col>

        <Col md="auto">
          <Card className="auth-box-form border-0 mb-0">
            <CardBody className="min-vh-100 d-flex flex-column justify-content-center">
              <div className="auth-brand mb-2 text-center mt-1">
                <Logo />
              </div>

              <div className="mt-auto text-center">
                <h4 className="fw-bold">Welcome to PSC EMS</h4>
                <p className="text-muted auth-sub-text mx-auto">Let’s get you signed in. Enter your email and password to continue.</p>

                {successVal && <Alert variant="success" role="alert">
                  {successVal}
                </Alert>}
                {errorVal && <Alert variant="danger" role="alert">
                  {errorVal}
                </Alert>}

                <Form className="mt-4" onSubmit={handleSubmit(onFormSubmit)}>
                  <div className="mb-3">
                    <InputGroup>
                      <FormControl
                        type="email"
                        className="py-2 px-3 bg-light bg-opacity-40 border-light"
                        id="email"
                        placeholder="Enter email"
                        {...register('email', {
                          required: "Email is required"
                        })}
                      />
                    </InputGroup>
                  </div>

                  <div className="mb-3">

                    <InputGroup>

                      <FormControl
                        type={passState ? "text" : "password"}
                        className="py-2 px-3 bg-light bg-opacity-40 border-light"
                        id="password"
                        placeholder="Enter password"
                        {...register('password', {
                          required: "Password is required"
                        })}
                      />

                      <InputGroupText className="password-eye" onClick={(ev) => {
                        ev.preventDefault();
                        setPassState(!passState);
                      }}>
                        <TbEye className={passState ? "d-block" : "d-none"} />
                        <TbEyeClosed className={passState ? "d-none" : "d-block"} />
                      </InputGroupText>
                    </InputGroup>


                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="form-check">
                      <input className="form-check-input form-check-input-light fs-14" type="checkbox" id="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Keep me signed in
                      </label>
                    </div>

                    <Link to="/auth/reset-password" className="text-decoration-underline link-offset-3 text-muted">
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="d-grid">
                    <Button type="submit" className="btn btn-primary fw-bold py-2" disabled={loading}>
                      Sign In
                    </Button>
                  </div>
                </Form>
              </div>

              <p className="text-muted text-center mt-4 mb-0">
                New here?{' '}
                <Link to="/auth/sign-up" className="text-decoration-underline link-offset-3 fw-semibold">
                  Create an account
                </Link>
              </p>

              <p className="text-center text-muted mt-auto mb-0">
                © <span>{currentYear}</span> &nbsp; G.O.K - <span className="fw-semibold">{author}</span>
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Page

