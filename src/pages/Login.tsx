import { useNavigate } from "react-router-dom";
import "../styles/pages/Login.css";

import React, { useState, useEffect } from "react";
import { login } from "../lib/types/login";
import axios from "axios";

import CustomButton from "../components/Button";
import SiginForm from "../components/SignForm";

const Login: React.FC = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const parsedToken = token ? JSON.parse(token) : null;
    if (parsedToken) {
      navigate("/todo", { replace: true });
    }
  }, []);

  // 로그인 입력 폼
  const [loginForm, setLoginForm] = useState<login>({
    email: "",
    password: "",
  });
  // signupHandler
  const navigate = useNavigate();
  const signupHandler = () => {
    navigate("/signup");
  };

  // eamil regex
  const emailRegex: RegExp = /^[^@]*@[^@]*$/;

  // longinHandler
  const longinHandler = async () => {
    if (emailRegex.test(loginForm.email) && loginForm.password.length >= 8) {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_WANTED_API}/auth/signin`,
        headers: { "Content-Type": "application/json" },
        data: {
          email: loginForm.email,
          password: loginForm.password,
        },
      })
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.access_token));
          navigate("/todo", { replace: true });
        })
        .catch((err) => {
          window.alert("이메일 또는 비밀번호를 확인해 주세요.");
          console.log(err);
        });
    } else {
    }
  };

  // logincheck
  const [logincheck, setLoginCheck] = useState(true);
  useEffect(() => {
    if (emailRegex.test(loginForm.email) && loginForm.password.length >= 8) {
      setLoginCheck(false);
    } else {
      setLoginCheck(true);
    }
  }, [loginForm]);

  return (
    <div className="loginform">
      <h2>로그인</h2>
      <SiginForm login={loginForm} setlogin={setLoginForm} />
      <CustomButton
        type="login"
        text="LOGIN"
        testid="signin-button"
        button_type="submit"
        handler={longinHandler}
        disabled={logincheck}
      />
      <CustomButton
        type="tosign"
        text="회원가입"
        testid=""
        button_type="button"
        handler={signupHandler}
      />
    </div>
  );
};

export default Login;
