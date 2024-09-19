import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ClipLoader from 'react-spinners/ClipLoader';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/apiCalls";
import "./login.css";

const Error = styled.span`
  color: red;
  margin-left: 10px;
  font-size: 14px;
`;

const Login2 = () => {
  const navigate = useNavigate();
  const [lusername, setLusername] = useState("");
  const [lpassword, setLPassword] = useState("");
  const dispatch = useDispatch();
  const { currentUser, isFetching, error } = useSelector(state => state.user);

  const user = {
    username: lusername,
    password: lpassword,
  };

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, user, navigate);
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setSuccessMessage('');
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          username,
          password,
          email
        });
        setErrorMessage('');
        setSuccessMessage(response.data.message);
        setTimeout(() => {
          setSuccessMessage('');
        }, 500);
        setTimeout(() => toggle(), 500);
      } catch (error) {
        setErrorMessage(error.response.data.message);
        setSuccessMessage('');
      }
    }
  };

  useEffect(() => {
    let container = document.getElementById('container');
    if (container) {
      container.classList.add('sign-in');
    }
  }, []);

  const toggle = () => {
    let container = document.getElementById('container');
    if (container) {
      container.classList.toggle('sign-in');
      container.classList.toggle('sign-up');
    }
  };

  return (
    <div id="container" className="container">
      <div className="row">
        <div className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
            <div className="form sign-up">
              <div className="input-group">
                <i className='bx bxs-user'></i>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                  required placeholder="Username" />
              </div>
              <div className="input-group">
                <i className='bx bx-mail-send'></i>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  required placeholder="Email" />
              </div>
              <div className="input-group">
                <i className='bx bxs-lock-alt'></i>
                <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="input-group">
                <i className='bx bxs-lock-alt'></i>
                <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Confirm password" />
              </div>
              {errorMessage && <Error>{errorMessage}</Error>}
              {successMessage && <span>{successMessage}</span>}
              <button onClick={handleRegister}>
                Sign up
              </button>
              <p>
                <span>Already have an account?</span>
                <b onClick={toggle} className="pointer">Sign in here</b>
              </p>
            </div>
          </div>
        </div>

        <div className="col align-items-center flex-col sign-in">
          <img className="imagecuet" src="cuetlogo.png" alt="CUET Logo" />
          <div className="form-wrapper align-items-center">
            <div className="form sign-in">
              <div className="input-group">
                <i className='bx bxs-user'></i>
                <input type="text" placeholder="Username" onChange={(e) => setLusername(e.target.value)} />
              </div>
              <div className="input-group">
                <i className='bx bxs-lock-alt'></i>
                <input type="password" placeholder="Password" onChange={(e) => setLPassword(e.target.value)} />
              </div>
              <button onClick={handleClick} disabled={isFetching}>
                {isFetching ? (
                  <ClipLoader size={20} color={"#ffffff"} />
                ) : (
                  'Sign in'
                )}
              </button>
              {error && <Error>Something went wrong...</Error>}
              <p>
                <b>Forgot password?</b>
              </p>
              <p>
                <span>Do not have an account?</span>
                <b onClick={toggle} className="pointer">Sign up here</b>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row content-row">
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome to FERIWALA</h2>
          </div>
          <div className="img sign-in">
          </div>
        </div>
        <div className="col align-items-center flex-col">
          <div className="img sign-up">
          </div>
          <div className="text sign-up">
            <h2>Join with us</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login2;

