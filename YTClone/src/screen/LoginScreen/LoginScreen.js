import React, { useEffect } from "react";
import "./_loginScreen.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/auth.action";
import { useNavigate } from "react-router-dom";
const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Accessing the store
  const token = useSelector((state) => state.auth.accessToken);

  const handleLogin = () => {
    dispatch(login());
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <div className="login">
      <div className="login__container">
        <h1>YouTube Clone</h1>
        <img
          src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
          alt="youtube_logo"
        />
        <button onClick={handleLogin}>Login with google</button>
        <p>This Project is made using YOUTUBE DATA API</p>
      </div>
    </div>
  );
};

export default LoginScreen;
