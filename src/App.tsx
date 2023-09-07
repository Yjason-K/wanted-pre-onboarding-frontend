import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ToDo from "./pages/Todo";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* 로그인 */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* TODo LIST */}
        <Route path="/todo" element={<ToDo />} />
      </div>
    </BrowserRouter>
  );
}

export default App;
