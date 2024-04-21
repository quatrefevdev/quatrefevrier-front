import "./App.scss";
import "./css/fonts.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShareNodes,
  faBell,
  faArrowLeft,
  faUpload,
  faCircleXmark,
  faTrash,
  faHeart,
  faMugHot,
  faUserGear,
  faComment,
  faBookOpen,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faShareNodes,
  faBell,
  faArrowLeft,
  faUpload,
  faTrash,
  faCircleXmark,
  faHeart,
  faMugHot,
  faUserGear,
  faComment,
  faBookOpen,
  faGear
);

// Pages
import Welcome from "./pages/Welcome/Welcome";
import Reception from "./pages/Welcome/Reception";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Forum from "./pages/Forum/Forum";
import CarnetHome from "./pages/Carnet/CarnetHome";
import MyAppointments from "./pages/Carnet/Appointments/MyAppointments";
import AddAppointment from "./pages/Carnet/Appointments/addAppointment";
import ShowAppointment from "./pages/Carnet/Appointments/ShowAppointment";
import Group from "./pages/Group";

import OnBoarding from "./pages/OnBoarding/OnBoarding";
import FortgetPassword from "./pages/Login/FortgetPassword";
import Message from "./pages/Message/Message";
import Mentoring from "./pages/Mentoring/Mentoring";

// Components
import Header from "./components/Header/Header";

function App() {
  // State dans lequel je stocke le token. Sa valeur de base sera :
  // - Si je trouve un cookie token, ce cookie
  // - Sinon, null
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [id, setId] = useState("661fed5fcb8a76b9e4a116ec");

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
      {/* <Header token={token} handleToken={handleToken} /> */}
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
        <Route path="/forum" element={<Forum token={token} />}></Route>
        <Route path="/carnetHome" element={<CarnetHome id={id} />}></Route>
        <Route path="/myAppointments/:id" element={<MyAppointments />}></Route>

        <Route
          path="/addAppointment/:id"
          element={<AddAppointment token={token} />}
        ></Route>
        <Route
          path="/showAppointment/:appointment_id"
          element={<ShowAppointment token={token} user_id={id} />}
        ></Route>
        <Route path="/group/:groupId" element={<Group />} />

        <Route path="/forgetPassword" element={<FortgetPassword />} />
        <Route
          path="/onboarding"
          element={<OnBoarding id={id} token={token} />}
        />
        <Route path="/message" element={<Message />}></Route>
        <Route path="/parrain" element={<Mentoring />}></Route>

        <Route
          path="/reception"
          element={<Reception id={id} token={token} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
