import Logo from '@/components/Logo'
import { author, currentYear } from '@/helpers'

import { Button, Card, CardBody, Col, Form, Row } from 'react-bootstrap'

import checkmark from '@/assets/images/checkmark.png'
import { Link } from 'react-router'
import PageMetaData from '@/components/PageMetaData'

const Page = () => {
  return (
    <div className="auth-box p-0 w-100">
      <PageMetaData title="Success Mail" />
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

              <div className="mt-auto text-center">
                <Form>
                  <div className="mb-4">
                    <div className="avatar-xxl mx-auto mt-2">
                      <div className="avatar-title bg-light-subtle border border-light border-dashed rounded-circle">
                        <img src={checkmark} alt="checkmark" height={64} width={64} />
                      </div>
                    </div>
                  </div>

                  <h4 className="fw-bold text-center mb-4">Well Done! Email verified Successfully</h4>

                  <div className="d-grid">
                    <Button type="submit" className="btn btn-primary fw-semibold py-2">
                      Back to Login
                    </Button>
                  </div>
                </Form>
              </div>

              <p className="text-muted text-center mt-4 mb-0">
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
