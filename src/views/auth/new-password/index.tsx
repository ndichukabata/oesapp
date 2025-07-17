import Logo from '@/components/Logo'
import PasswordInputWithStrength from '@/components/PasswordInputWithStrength'
import { author, currentYear } from '@/helpers'
import { Link } from 'react-router'
import { useState } from 'react'
import { Button, Card, CardBody, Col, Form, FormControl, InputGroup, Row, FormLabel } from 'react-bootstrap'
import PageMetaData from '@/components/PageMetaData'
import InputGroupText from 'react-bootstrap/InputGroupText'
import { TbEye, TbEyeClosed } from 'react-icons/tb'

const Page = () => {
  const [password, setPassword] = useState('')
  const [passState, setPassState] = useState(false);

  return (
    <div className="auth-box p-0 w-100">
      <PageMetaData title="New Password" />
      <Row className="w-100 g-0">
        <Col>
          <div className="h-100 position-relative card-side-img rounded-0 overflow-hidden">
            <div className="p-4 card-img-overlay auth-overlay d-flex align-items-end justify-content-center"></div>
          </div>
        </Col>

        <Col xl="auto">
          <Card className="auth-box-form border-0 mb-0">
            <CardBody className="min-vh-100 d-flex flex-column justify-content-center">
              <div className="auth-brand mb-2 text-center mt-1">
                <Logo />
              </div>

              <div className="mt-auto">
                <h4 className="fw-bold mb-5 mt-3  text-center">Setup New Password | PSC EMS</h4>

                <Form>

                  <div className="mb-3" data-password="bar">

                    <PasswordInputWithStrength
                      id="userPassword"
                      name="user-password"
                      password={password}
                      label="New Password"
                      setPassword={setPassword}
                      placeholder="Enter Password"
                      inputClassName="py-2 px-3 bg-light bg-opacity-40 border-light"
                    />
                  </div>

                  <div className="mb-3">
                    <FormLabel>Confirm Password <span className="text-danger">*</span></FormLabel>
                    <InputGroup>
                    
                      <FormControl
                        type="password"
                        className="py-2 px-3 bg-light bg-opacity-40 border-light"
                        id="confirmPassword"
                        placeholder="Confirm New password"
                        required
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

                  <div className="mb-3 d-flex">
                    <div className="form-check">
                      <input className="form-check-input form-check-input-light fs-14" type="checkbox" id="termAndPolicy" defaultChecked />
                      <label className="form-check-label" htmlFor="termAndPolicy">
                        Agree the Terms &amp; Policy
                      </label>
                    </div>
                  </div>

                  <div className="d-grid">
                    <Button type="submit" className="btn btn-primary fw-semibold py-2">
                      Update Password
                    </Button>
                  </div>
                </Form>


              </div>

              <p className="text-muted text-center mt-4 mb-1">
                Return to{' '}
                <Link to="/auth/sign-in" className="text-decoration-underline link-offset-3 fw-semibold">
                  Sign in
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
