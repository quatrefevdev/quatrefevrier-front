import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/Home";
import Bookmarks from "./pages/Bookmarks";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Character from "./pages/Character";
import Comic from "./pages/Comic";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// Components
import Header from "./components/Header/Header";

function App() {
  // State dans lequel je stocke le token. Sa valeur de base sera :
  // - Si je trouve un cookie token, ce cookie
  // - Sinon, null
  const [token, setToken] = useState(Cookies.get("marvel-token") || null);
  const [search, setSearch] = useState("");
  const [completion, setCompletion] = useState([]);

  // Cette fonction permet de stocker le token dans le state et dans les cookies ou supprimer le token dans le state et dans les cookies
  const handleToken = (token) => {
    if (token) {
      Cookies.set("marvel-token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("marvel-token");
      setToken(null);
    }
  };

  return (
    <Router>
      {/* Je peux passer des props à mes composants */}
      <Header
        token={token}
        search={search}
        completion={completion}
        handleToken={handleToken}
        setSearch={setSearch}
        setCompletion={setCompletion}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookmarks/" element={<Bookmarks token={token} />} />
        <Route
          path="/characters"
          element={
            <Characters
              completion={completion}
              search={search}
              setCompletion={setCompletion}
            />
          }
        />
        <Route path="/comics" element={<Comics search={search} />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/comic/:comicId" element={<Comic />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
