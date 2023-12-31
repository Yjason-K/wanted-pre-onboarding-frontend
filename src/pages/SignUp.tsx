import { useNavigate } from "react-router-dom";
import "../styles/pages/Login.css";

import React, { useState, useEffect } from "react";
import { login } from "../lib/types/login";
import axios from "axios";

import CustomButton from "../components/Button";
import SiginForm from "../components/SignForm";

const SignUp: React.FC = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const parsedToken = token ? JSON.parse(token) : null;
    if (parsedToken) {
      navigate("/todo", { replace: true });
    }
  }, []);

  // 회원가입 입력 폼
  const [loginForm, setLoginForm] = useState<login>({
    email: "",
    password: "",
  });
  // longinHandler
  const navigate = useNavigate();
  const tologinHandler = () => {
    navigate("/signin");
  };

  // eamil regex
  const emailRegex: RegExp = /^[^@]*@[^@]*$/;

  // signupHandler
  const longinHandler = async () => {
    if (emailRegex.test(loginForm.email) && loginForm.password.length >= 8) {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_WANTED_API}/auth/signup`,
        headers: { "Content-Type": "application/json" },
        data: {
          email: loginForm.email,
          password: loginForm.password,
        },
      })
        .then((res) => {
          navigate("/signin", { replace: true });
        })
        .catch((err) => {
          window.alert("이메일 또는 비밀번호를 확인해 주세요.");
          console.log(err);
        });
    } else {
      window.alert("아이디 또는 비밀번호를 확인해 주세요");
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
      <h2>회원가입</h2>
      <SiginForm login={loginForm} setlogin={setLoginForm} />
      <CustomButton
        type="login"
        text="SIGNIN"
        testid="signup-button"
        button_type="submit"
        handler={longinHandler}
        disabled={logincheck}
      />
      <CustomButton
        type="tosign"
        text="로그인 페이지로 이동"
        testid=""
        button_type="button"
        handler={tologinHandler}
      />
    </div>
  );
};

export default SignUp;
