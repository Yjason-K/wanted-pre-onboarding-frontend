import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ToDo from "./pages/ToDo";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 처음 접속시 로그인 페이지로 이동 */}
          <Route path="/" element={<Navigate to="/signin" replace />} />
          {/* 로그인 및 회원가입*/}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Login />} />
          {/* TODo LIST */}
          <Route path="/todo" element={<ToDo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
