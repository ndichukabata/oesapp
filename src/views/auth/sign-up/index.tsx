import Logo from '@/components/Logo'
import PasswordInputWithStrength from '@/components/PasswordInputWithStrength'
import { author, currentYear } from '@/helpers'
import { Link } from 'react-router'
import { useState } from 'react'
import { Button, Card, CardBody, Col, Form, InputGroup, Row } from 'react-bootstrap'
import PageMetaData from '@/components/PageMetaData'

const Page = () => {
  const [password, setPassword] = useState('')
  return (
    <div className="auth-box p-0 w-100">
      <PageMetaData title="Sign Up" />
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
                <h4 className="fw-bold">Register to PSC EMS</h4>
                <p className="text-muted auth-sub-text mx-auto">Let’s get you Sign Up.</p>

                <Form className="mt-4" autoComplete="off">
                     <div className="mb-2">
                    <InputGroup>
                      <input
                        type="text"
                        className="form-control py-2 px-3 bg-light bg-opacity-40 border-light"
                        id="userName"
                        placeholder="First name"
                        required
                      />
                    </InputGroup>
                  </div>
                  <div className="mb-2">
                    <InputGroup>
                      <input
                        type="text"
                        className="form-control py-2 px-3 bg-light bg-opacity-40 border-light"
                        id="userName"
                        placeholder="Last name"
                        required
                      />
                    </InputGroup>
                  </div>

                  <div className="mb-2">
                    <InputGroup>
                      <input
                        type="email"
                        className="form-control py-2 px-3 bg-light bg-opacity-40 border-light"
                        id="userEmail"
                        placeholder="Email address"
                        required
                      />
                    </InputGroup>
                  </div>

                  <div className="mb-2" data-password="bar">
                    <PasswordInputWithStrength
                      id="userPassword"
                      name="user-password"
                      password={password}
                      setPassword={setPassword}
                      placeholder="Password"
                      inputClassName="py-2 px-3 bg-light bg-opacity-40 border-light"
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="form-check">
                      <input className="form-check-input form-check-input-light fs-14" type="checkbox" id="termAndPolicy" />
                      <label className="form-check-label" htmlFor="termAndPolicy">
                        Agree the Terms & Policy
                      </label>
                    </div>
                  </div>

                  <div className="d-grid">
                    <Button type="submit" className="btn btn-primary fw-semibold py-2">
                      Create Account
                    </Button>
                  </div>
                </Form>
              </div>

              <p className="text-muted text-center mt-3 mb-1">
                Already have an account?{' '}
                <Link to="/auth/sign-in" className="text-decoration-underline link-offset-3 fw-semibold">
                  Login
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
