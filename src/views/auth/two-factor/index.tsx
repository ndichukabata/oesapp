import Logo from '@/components/Logo'
import OTPInput from '@/components/OTPInput'
import { author, currentYear } from '@/helpers'
import { Link } from 'react-router'
import { useState } from 'react'
import { Button, Card, CardBody, Col, Form, Row } from 'react-bootstrap'
import PageMetaData from '@/components/PageMetaData'

const Page = () => {
  const [code, setCode] = useState<string[]>(Array(6).fill(''))
  return (
    <div className="auth-box p-0 w-100">
      <PageMetaData title="Two-Factor Verification" />
      <Row className="w-100 g-0">
        <Col>
          <div className="h-100 position-relative card-side-img rounded-0 overflow-hidden">
            <div className="p-4 card-img-overlay auth-overlay d-flex align-items-end justify-content-center" />
          </div>
        </Col>

        <Col xl="auto">
          <Card className="auth-box-form border-0 mb-0">
            <CardBody className="min-vh-100 d-flex flex-column justify-content-center">
              <div className="auth-brand mb-3 text-center">
                <Logo />
              </div>

              <div className="mt-auto text-center">
                <h4 className="fw-bold mb-3">Enter OTP | PSC EMS</h4>
                <p className="text-muted mx-auto mb-5">Enter your OTP to continue</p>

                <div className="text-center mb-3">
                  <h5 className="text-muted fs-base mb-3">We&apos;ve emailed you a 6-digit verification code we sent to</h5>
                  <div className="fw-bold fs-4">******gmail.com</div>
                </div>

                <Form>
                  <div className="mb-3">
                    <OTPInput
                      code={code}
                      setCode={setCode}
                      label="Enter your 6-digit code"
                      labelClassName="d-flex"
                      inputClassName="py-2 bg-light bg-opacity-40 border-light"
                    />
                  </div>

                  <div className="d-grid">
                    <Button type="submit" className="btn btn-primary fw-semibold py-2">
                      Confirm
                    </Button>
                  </div>
                </Form>

                <p className="mt-3 text-muted text-center mb-3">
                  Don’t have a code?{' '}
                  <Link to="" className="text-decoration-underline link-offset-2 fw-semibold">
                    Resend
                  </Link>{' '}
                  or{' '}
                  <Link to="" className="text-decoration-underline link-offset-2 fw-semibold">
                    Call Us
                  </Link>
                </p>
              </div>

              <p className="text-muted text-center mt-1 mb-0">
                Return to{' '}
                <Link to="/auth/sign-in" className="text-decoration-underline link-offset-3 fw-semibold">
                  Sign in
                </Link>
              </p>

              <p className="text-center text-muted mt-1 mb-0">
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
