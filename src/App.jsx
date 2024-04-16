<<<<<<< HEAD
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
=======
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Pages
import Welcome from "./pages/Welcome/Welcome";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
// Components
import Header from "./components/Header/Header";
// Fonts
import "./index.css";

function App() {
  // State dans lequel je stocke le token. Sa valeur de base sera :
  // - Si je trouve un cookie token, ce cookie
  // - Sinon, null
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [search, setSearch] = useState("");
  const [completion, setCompletion] = useState([]);

  // Cette fonction permet de stocker le token dans le state et dans les cookies ou supprimer le token dans le state et dans les cookies
  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  return (
    <Router>
      {/* Je peux passer des props à mes composants */}
      <Header token={token} handleToken={handleToken} />
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
>>>>>>> dd49024538311d8ada5ee10525c333868018b465
      </Routes>
    </Router>
  );
}

export default App;
