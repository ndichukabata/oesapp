import Logo from '@/components/Logo'
import PasswordInputWithStrength from '@/components/PasswordInputWithStrength'
import { author, currentYear } from '@/helpers'
import { Link } from 'react-router'
import { useState } from 'react'
import { Button, Card, CardBody, Col, Form, FormControl, InputGroup, Row, FormLabel, Alert } from 'react-bootstrap'
import PageMetaData from '@/components/PageMetaData'
import InputGroupText from 'react-bootstrap/InputGroupText'
import { TbEye, TbEyeClosed } from 'react-icons/tb'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const [strength, setStrength] = useState(0)
  const [password, setPassword] = useState('')
  const [passState, setPassState] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm();
  const [errorVal, setError] = useState("");
  const [successVal, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
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
    const urlSearchString = window.location.search;

    const params = new URLSearchParams(urlSearchString);

    var _token = params.get('token');


    setLoading(true);

    const req = {
      token: _token,
      password: formData.password
    }

    try {


      const response = await fetch(apiUrl + "/Token/resetpassword", {
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

                {successVal && <Alert variant="success" role="alert">
                  {successVal}
                </Alert>}
                {errorVal && <Alert variant="danger" role="alert">
                  {errorVal}
                </Alert>}
                <Form onSubmit={handleSubmit(onFormSubmit)}>
                  <div className="mb-3" data-password="bar">

                    <PasswordInputWithStrength
                      id="userPassword"
                      password={password}
                      label="New Password"
                      setPassword={passwordChange}
                      placeholder="Enter Password"
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

                  <div className="mb-3">
                    <FormLabel>Confirm Password <span className="text-danger">*</span></FormLabel>
                    <InputGroup>

                      <FormControl
                        type={passState ? "text" : "password"}
                        className="py-2 px-3 bg-light bg-opacity-40 border-light"
                        id="confirmpassword"
                        placeholder="Confirm New password"
                        {...register('confirmpassword', {
                          required: "Confirm password is required", validate: (val) => {
                            if (watch('password') != val) {
                              return "Your passwords do no match";
                            }
                          },
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

                    {typeof errors.confirmpassword?.message === 'string' && <span className="invalid">{errors.confirmpassword.message}</span>}
                  </div>

                  <div className="mb-3 d-flex">
                    <div className="form-check">
                      <input className="form-check-input form-check-input-light fs-14" type="checkbox" id="termAndPolicy"
                        checked={isChecked}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="termAndPolicy">
                        Agree the Terms &amp; Policy
                      </label>
                    </div>
                  </div>

                  <div className="d-grid">
                    <Button type="submit" className="btn btn-primary fw-semibold py-2" disabled={!isChecked}>
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
