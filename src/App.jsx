import "./App.scss";
import "./css/fonts.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Pages
import Welcome from "./pages/Welcome/Welcome";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Forum from "./pages/Forum/Forum";
import CarnetHome from "./pages/Carnet/CarnetHome";
import MesRdv from "./pages/Carnet/MesRdv/MesRdv";
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
        <Route path="/forum" element={<Forum />}></Route>
        <Route path="/carnetHome" element={<CarnetHome />}></Route>
        <Route path="/mesRdv" element={<MesRdv />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
