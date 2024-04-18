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
import OnBoarding from "./pages/OnBoarding/OnBoarding";
import FortgetPassword from "./pages/Login/FortgetPassword";

// Components
import Header from "./components/Header/Header";

function App() {
  // State dans lequel je stocke le token. Sa valeur de base sera :
  // - Si je trouve un cookie token, ce cookie
  // - Sinon, null
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [id, setId] = useState();

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
  console.log("ID", id);
  return (
    <Router>
      {/* Je peux passer des props à mes composants */}
      <Header token={token} handleToken={handleToken} />
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route
          path="/login"
          element={<Login handleToken={handleToken} setId={setId} />}
        />
        <Route
          path="/signup"
          element={<Signup handleToken={handleToken} setId={setId} />}
        />
        <Route path="/forum" element={<Forum />} />
        <Route path="/carnetHome" element={<CarnetHome />}></Route>
        <Route path="/mesRdv" element={<MesRdv />}></Route>
        <Route path="/forgetPassword" element={<FortgetPassword />} />
        <Route
          path="/onboarding"
          element={<OnBoarding id={id} token={token} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
