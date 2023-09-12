import "../styles/components/SignForm.css";

import { login } from "../lib/types/login";

import { useState } from "react";

type Props = {
  login: login;
  setlogin: React.Dispatch<React.SetStateAction<login>>;
};
const SiginForm: React.FC<Props> = ({ login, setlogin }) => {
  // Props 받아오기
  const loginForm = login;
  const setLogin = setlogin;

  // 로그인 폼 유효성 확인(boolean)
  const [emailCheck, setEmailCheck] = useState<boolean>(false);
  const [pwdCheck, setPwdCheck] = useState<boolean>(false);

  // 로그인 폼 유효성 확인에 따른 에러 메세지
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [pwdMessage, setPwdMessage] = useState<string>("");

  // eamil regex
  const emailRegex: RegExp = /^[^@]*@[^@]*$/;

  // input 변화에 따른 FormCheck
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setLogin({ ...loginForm, [id]: value });

    if (id === "email") {
      // email 확인
      if (!emailRegex.test(value)) {
        setEmailCheck(true);
        if (value === "") {
          setEmailMessage("이메일 주소를 입력해 주세요.");
        } else {
          setEmailMessage("이메일 주소를 확인해 주세요.");
        }
      } else {
        setEmailCheck(false);
      }
    } else if (id === "password") {
      // 비밀번호 확인
      if (value === "") {
        setPwdCheck(true);
        setPwdMessage("비밀번호를 입력해주세요.");
      } else {
        if (value.length < 8) {
          setPwdCheck(true);
          setPwdMessage("비밀번호를 8자리 이상 입력해주세요.");
        } else {
          setPwdCheck(false);
        }
      }
    }
  };

  return (
    <form className="input_form">
      <div className="email_wrap">
        <label className="form_label">이메일</label>
        <input
          type="email"
          id="email"
          data-testid="email-input"
          className="email"
          value={loginForm.email}
          onChange={handleInputChange}
          placeholder="이메일을 입력해주세요."
          required
        />
        {/* <a target="_blank" href="https://icons8.com/icon/86305/person">Person</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */}
        {emailCheck ? <p className="checkmessage">{emailMessage}</p> : <p></p>}
      </div>
      <div className="pwd_wrap">
        <label className="form_label">비밀번호</label>
        <input
          type="password"
          id="password"
          data-testid="password-input"
          className="password"
          value={loginForm.password}
          onChange={handleInputChange}
          required
          placeholder="비밀번호를 입력해주세요."
          minLength={8}
        />
        {/* <a target="_blank" href="https://icons8.com/icon/82747/lock">Lock</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */}
        {pwdCheck ? <p className="checkmessage">{pwdMessage} </p> : null}
      </div>
    </form>
  );
};

export default SiginForm;
