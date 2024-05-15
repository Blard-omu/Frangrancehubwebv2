import React, { useState } from "react";
import "../css/Login.css";
import { toast } from "react-toastify";
import signinIcon from "../assets/icons/signinIcon.png";
import { useAuth } from "../contexts/Auth";
import img2 from "../assets/images/download-removebg-preview.png";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("sisi@email.com");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { auth, login } = useAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Enter all fields");
    }

    const emailRegex = /\S+@\S+\.\S+/;
    const isEmail = emailRegex.test(email);

    if (isEmail) {
      if (!emailRegex.test(email)) {
        return toast.error("Invalid email address");
      }
    } else {
      if (email.trim().length < 3) { 
        return toast.error("Invalid username");
      }
    }

    const pwdTrim = password.trim();
    if (!password || pwdTrim.length < 6) {
      return toast.error("Enter a valid password");
    }

    try {
      setLoading(true);
      const data = await login(email, password);
      setLoading(false);

      if (data) {
        const userRole = data.user.role;
        navigate(
          location.state ? location.state.from : `/dashboard/${userRole === 1 ? "admin" : "user"}`
        );
        toast.success("Login successful");

      }
    } catch (err) {
      console.error("Login Error:", err.message);
      const errMsg = err.message
      toast.error(errMsg);
      setLoading(false);
    }
  };

  return (
    <div className="dan-login container-fluid">
      <div className="col-md-6 offset-md-3 pt-4">
        <div className="">
          <div className="text-center">
            <Link to="/">
              <img className="ww " src={signinIcon} alt="" />
            </Link>
            <h2>
              <b>Welcome to FragranceHub</b>
            </h2>
          </div>

          <form className="form-dan" onSubmit={handleSubmit}>
            <div className="form-action">
              <label>Email or Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email or username"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="form-action">
              <label>Password </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <IoEyeOutline className="icon-m" />
                  ) : (
                    <IoEyeOffOutline className="icon-m" />
                  )}
                </span>
              </div>
            </div>
          </form>

          <div className="ddd">
            <div className="yp">
              <input type="checkbox" />
              <h6>Remember me</h6>
            </div>

            <div>
              <a href="">
                <p>Forgot Password?</p>
              </a>
            </div>
          </div>

          <div className="">
            <button className={loading ? "btn btn-dark w-100 p-3 my-1" : "btn btn-outline-dark w-100 p-3 my-1" } onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-1"
                    aria-hidden="true"
                  ></span>
                  <span role="status">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
          <div className="dat">
            <div className="line1"></div>
            <span>&nbsp;&nbsp; or &nbsp;&nbsp;</span>
            <div className="line2"></div>
          </div>

          <div className="">
              <button className={!loading ? "btn btn-dark w-100 p-3 my-1" : "btn btn-outline-dark w-100 p-3 my-1" }>
                <img className="pic mx-2" src={img2} alt="" />
                <a className="text-light text-decoration-none" href="https://www.google.com/">Continue with Google</a>
              </button>
            </div>
          <div className="dd">
            <p className="text-dark">
              New User? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
