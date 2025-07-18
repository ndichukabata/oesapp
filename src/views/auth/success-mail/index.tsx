import { useState, useEffect } from "react";
import Logo from '@/components/Logo'
import Spinner from '@/components/Spinner'
import { author, currentYear } from '@/helpers'

import { Button, Card, CardBody, Col, Form, Row, Alert } from 'react-bootstrap'

import checkmark from '@/assets/images/checkmark.png'

import PageMetaData from '@/components/PageMetaData'
import { useNavigate } from "react-router-dom";
const Page = () => {

  const [loading, setLoading] = useState(true);
  const [errorVal, setError] = useState("");
  const [errorCode, setErrorCode] = useState(0);
  const [successVal, setSuccess] = useState(false);
  const [resendVal, setResend] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      console.log(apiUrl);

      setLoading(true);

      const urlSearchString = window.location.search;

      const params = new URLSearchParams(urlSearchString);

      var _token = params.get('token');
      const req = {
        token: _token,
      }
      console.log(req);

      try {
        const response = await fetch(apiUrl + "/Token/verifyemail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 'Access-Control-Allow-Origin': 'http://localhost:5173'
          },
          body: JSON.stringify(
            req
          ),
        });

        if (!response.ok) {
          setError("An error occured try again.");

          return;
        }

        const result = await response.json();
        console.log(result);

        var error = result.resp.message;
        var code = result.resp.code;
        setErrorCode(code);
        if (code == 1) {
          setSuccess(true);

        }
        else {
          setError(error);

        }

        setLoading(false);

      } catch (err) {
        console.log(err);
        setError("An error occurred during email verification. Please try again.");

      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, []);

  const resendEmail = async () => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    console.log(apiUrl);

    setLoading(true);

    const urlSearchString = window.location.search;

    const params = new URLSearchParams(urlSearchString);

    var _token = params.get('token');
    const req = {
      token: _token,
    }
    console.log(req);

    try {
      const response = await fetch(apiUrl + "/Token/resendverifylink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 'Access-Control-Allow-Origin': 'http://localhost:5173'
        },
        body: JSON.stringify(
          req
        ),
      });

      if (!response.ok) {
        setError("An error occured try again.");

        return;
      }

      const result = await response.json();
      console.log(result);

      var error = result.resp.message;
      var code = result.resp.code;
      setErrorCode(code);
      setError(error);
      setResend(true);

      setLoading(false);

    } catch (err) {
      console.log(err);
      setError("An error occurred during email verification. Please try again.");

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-box p-0 w-100">
      <PageMetaData title="Verify Email" />
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
                {errorVal && <>
                  {resendVal ?  <Alert variant="success" role="alert">
                    {errorVal}
                  </Alert> : <Alert variant="danger" role="alert">
                    {errorVal}
                  </Alert>
                  }


                </>}
              </div>
              {successVal ?
                <>
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


                    </Form>

                  </div>



                </> : <Row>
                  <div className="mt-auto text-center">
                    {loading ?
                      <Spinner className="text-primary m-2" color="primary" size="lg" /> : <></>
                    }
                  </div>
                </Row>

              }
              {errorCode == 2 ? <div className="d-grid">
                <Button type="submit" className="btn btn-primary fw-semibold py-2" onClick={() => { resendEmail(); }}>
                  Resend Email
                </Button>

              </div> :
                <div className="d-grid">
                  <Button type="submit" className="btn btn-primary fw-semibold py-2" onClick={() => { navigate("/auth/sign-in"); }}>
                    Return to{' '} Sign in
                  </Button>
                </div>}


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
