import Logo from '@/components/Logo'
import PasswordInputWithStrength from '@/components/PasswordInputWithStrength'
import { author, currentYear } from '@/helpers'
import { Link } from 'react-router'
import { useState } from 'react'
import {
  Button, Card, CardBody, Col, Form, InputGroup, Row, Alert
} from 'react-bootstrap'
import PageMetaData from '@/components/PageMetaData'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const [password, setPassword] = useState('')
  const [strength, setStrength] = useState(0)
  const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorVal, setError] = useState("");
  const [successVal, setSuccess] = useState("");

  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const passwordChange = (value: any, strength: any) => {
    setPassword(value);
    setValue('password', value)
    setStrength(strength);
  };

  const onFormSubmit = async (formData: any) => {
    console.log(formData);

    setError('');
    setSuccess('');
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    setLoading(true);

    const req = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password
    }

    try {


      const response = await fetch(apiUrl + "/UserAsync/register", {
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

      if (code == 1) {
        setSuccess(error);
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5 sec
        navigate("/auth/sign-in");
      }
      else {
        setError(error);

      }

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

                {successVal && <Alert variant="success" role="alert">
                  {successVal}
                </Alert>}
                {errorVal && <Alert variant="danger" role="alert">
                  {errorVal}
                </Alert>}

                <h4 className="fw-bold">Register to PSC EMS</h4>
                <p className="text-muted auth-sub-text mx-auto">Let’s get you Sign Up.</p>
              </div>
              <Form className="mt-4" autoComplete="off" onSubmit={handleSubmit(onFormSubmit)}>
                <div className="mb-2">
                  <InputGroup>
                    <input
                      type="text"
                      className="form-control py-2 px-3 bg-light bg-opacity-40 border-light"
                      id="firstname"
                      placeholder="First name"
                      {...register('firstname', {
                        required: "Firstname is required"
                      })}

                    />
                  </InputGroup>
                  {typeof errors.firstname?.message === 'string' && <span className="invalid">{errors.firstname.message}</span>}
                </div>
                <div className="mb-2">
                  <InputGroup>
                    <input
                      type="text"
                      className="form-control py-2 px-3 bg-light bg-opacity-40 border-light"
                      id="lastname"
                      placeholder="Last name"
                      {...register('lastname', {
                        required: "Lastname is required"
                      })}
                    />
                  </InputGroup>
                  {typeof errors.lastname?.message === 'string' && <span className="invalid">{errors.lastname.message}</span>}
                </div>

                <div className="mb-2">
                  <InputGroup>
                    <input
                      type="email"
                      className="form-control py-2 px-3 bg-light bg-opacity-40 border-light"
                      id="email"
                      placeholder="Email address"
                      required
                      {...register('email', {
                        required: "Email is required"
                      })}
                    />
                  </InputGroup>

                  {typeof errors.email?.message === 'string' && <span className="invalid">{errors.email.message}</span>}
                </div>

                <div className="mb-2" data-password="bar">
                  <PasswordInputWithStrength
                    id="password"
                    password={password}
                    setPassword={passwordChange}
                    placeholder="Password"
                    inputClassName="py-2 px-3 bg-light bg-opacity-40 border-light"
                    {...register('password', {
                      required: "Password is required", minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters"
                      },
                      validate: (val) => {
                        if (strength < 4) {
                          return "Your password does not meet all requirements.";
                        }
                      },
                    })}
                  />
                  {typeof errors.password?.message === 'string' && <span className="invalid">{errors.password.message}</span>}

                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-check">
                    <input className="form-check-input form-check-input-light fs-14" type="checkbox" id="termAndPolicy"
                      checked={isChecked}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="termAndPolicy">
                      Agree the Terms & Policy
                    </label>
                  </div>
                </div>

                <div className="d-grid">
                  <Button type="submit" className="btn btn-primary fw-semibold py-2" disabled={!isChecked}>
                    Create Account
                  </Button>
                </div>
              </Form>


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
