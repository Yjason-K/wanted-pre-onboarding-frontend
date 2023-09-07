import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* 로그인 */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </div>
    </BrowserRouter>
  );
}

export default App;
