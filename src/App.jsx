import "./App.scss";
import "./css/fonts.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import Pages:
import Welcome from "./pages/Welcome";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
