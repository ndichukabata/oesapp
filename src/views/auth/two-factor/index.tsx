import Logo from '@/components/Logo'
import OTPInput from '@/components/OTPInput'
import { author, currentYear } from '@/helpers'
import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Form, Row, Alert } from 'react-bootstrap'
import PageMetaData from '@/components/PageMetaData'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from '../../../api/useAuth';
import useAxiosPrivate from "../../../api/useAxiosPrivate";
const Page = () => {
  const [code, setCode] = useState<string[]>(Array(6).fill(''))
  const [errorVal, setError] = useState("");
  const [successVal, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate()
  const { setAuth } = useAuth();
  const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm();

  const START_MINUTES = "02";
  const START_SECOND = "00";
  const START_DURATION = 10;

  const [currentMinutes, setMinutes] = useState(START_MINUTES);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(START_DURATION);
  const [isRunning, setIsRunning] = useState(false);

  const startHandler = () => {
    setDuration(parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10));
    setIsRunning(true);
  };
  const resetHandler = () => {
    setMinutes(START_MINUTES);
    setSeconds(START_SECOND);
    setIsRunning(false);
    setIsStop(false);
    setDuration(START_DURATION);
  };

  useEffect(() => {
    if (localStorage.getItem("eostoken")) {
      let token = JSON.parse(localStorage.getItem("eostoken") ?? '{}');
      console.log(token);
      setEmail(token?.email);
      setMobile(token?.mobileno);
      setToken(token?.refreshToken)
    }
    startHandler();


  }, []);
  useEffect(() => {

    if (isRunning === true) {
      let timer = duration;
      var minutes, seconds;
      const interval = setInterval(function () {
        if (--timer <= 0) {
          //resetHandler();
          setSeconds("00");
          setIsRunning(false);

        } else {
          minutes = parseInt((timer / 60).toString(), 10);
          seconds = parseInt((timer % 60).toString(), 10);

          const minutesStr = minutes < 10 ? "0" + minutes : minutes.toString();
          const secondsStr = seconds < 10 ? "0" + seconds : seconds.toString();

          setMinutes(minutesStr);
          setSeconds(secondsStr);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const onFormSubmit = async () => {
    console.log(code.join(""));

    setError("");
    setSuccess("");
    if (code.join("") === "") {
      setError("OTP required")
      return
    }
    setLoading(true);

    try {
      const req = {
        token: token,
        otp: code.join("")
      }

      const response = await axiosPrivate.post("/Token/verifyotp", req);



      if (response.data.resp.code == 1) {
        startHandler();

        setSuccess(response.data.resp.message)



        let token = JSON.parse(localStorage.getItem("eostoken") ?? '{}');

        token.otpRequired = "0";

        localStorage.setItem("eostoken", JSON.stringify(token))


        if (setAuth) {
          setAuth(token);
        }

        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 sec

        navigate("/");




      }
      else {

        setError(response.data.resp.message)
      }

      setLoading(false);



    } catch (err) {
      console.log(err);
      setError("An error occurred during login. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }



  };



  const OTPResend = async () => {

    try {
      resetHandler();


      const req =
      {
        token: token
      }

      setLoading(true);
      const response = await axiosPrivate.post("/Token/resendotp", req);


      console.log(response.data);

      setLoading(false);
      if (response.data.resp.code == 1) {
        startHandler();
        setSuccess(response.data.resp.message);

      }
      else {
        setError(response.data.resp.message);
      }
    }

    catch (err) {
      console.log(err);
      setError("An error occurred during login. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }

  }



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
              <div className="auth-brand mb-2 text-center mt-1">
                <Logo />
              </div>

              <div className="mt-5 text-center">
                <h4 className="fw-bold mb-3">Enter OTP | PSC EMS</h4>
                <p className="text-muted mx-auto mb-3">Enter your OTP to continue</p>
                <h1>
                  {currentMinutes}
                  :
                  {currentSeconds}
                </h1>
                <div className="text-center mb-3">
                  <h5 className="text-muted fs-base mb-1">We&apos;ve emailed you a 6-digit verification code we sent to</h5>
                  <div className="fw-bold fs-5">{email}</div>
                </div>
                {errorVal && (
                  <div className="mb-3">
                    <Alert color="danger" className="alert-icon">
                      {errorVal}
                    </Alert>
                  </div>
                )}
                {successVal && (
                  <div className="mb-3">
                    <Alert color="success" className="info-icon">
                      {successVal}
                    </Alert>
                  </div>
                )}


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
                  <Button type="button" className="btn btn-primary fw-semibold py-2" onClick={() => onFormSubmit()}>
                    Confirm
                  </Button>
                </div>


                <p className="mt-3 text-muted text-center mb-1">
                  Don’t have a code?{' '}

                </p>
                <div className="d-grid">
                  <Button type="button" className="btn btn-primary fw-semibold py-2" onClick={() => OTPResend()} disabled={isRunning}>
                    Resend
                  </Button>

                </div>
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
