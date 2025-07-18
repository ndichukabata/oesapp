import { useState } from 'react'
import Logo from '@/components/Logo'
import { author, currentYear } from '@/helpers'
import { Link } from 'react-router'
import { Button, Card, CardBody, Col, Form, FormControl, InputGroup, Row, Alert } from 'react-bootstrap'
import PageMetaData from '@/components/PageMetaData'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const Page = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm();
  const [errorVal, setError] = useState("");
  const [successVal, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  const onFormSubmit = async (formData: any) => {
    console.log(formData);

    setError('');
    setSuccess('');
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    setLoading(true);

    const req = {
      email: formData.email
    }

    try {


      const response = await fetch(apiUrl + "/Token/forgotpassword", {
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


      setSuccess('A password reset email has been sent to the provided email address. Please check your inbox (and spam/junk folder) for instructions to confirm and complete the password change. If you don’t receive the email or need further assistance, contact the site administrator.');


      setLoading(false);

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
      <PageMetaData title="Reset Password" />
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

                {successVal && <Alert variant="success" role="alert">
                  {successVal}
                </Alert>}
                {errorVal && <Alert variant="danger" role="alert">
                  {errorVal}
                </Alert>}


                <h4 className="fw-bold">Forgot Password ? | PSC EMS</h4>
                <p className="text-muted auth-sub-text mx-auto">Enter your email address and we&apos;ll send you a link to reset your password.</p>

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
                    {typeof errors.email?.message === 'string' && <span className="invalid">{errors.email.message}</span>}
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="form-check">
                      <input className="form-check-input form-check-input-light fs-14" type="checkbox" id="termAndPolicy"
                        checked={isChecked}
                        onChange={handleChange} />
                      <label className="form-check-label" htmlFor="termAndPolicy">
                        Agree the Terms &amp; Policy
                      </label>
                    </div>
                  </div>

                  <div className="d-grid">
                    <Button type="submit" className="btn btn-primary fw-semibold py-2" disabled={!isChecked}>
                      Send Request
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
