import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../../App.scss";

import { Link } from "react-router-dom";

const Welcome = () => {
  const [type, setType] = useState("");

  return !type ? (
    <main className="container startPage">
      <div className="top">
        <span style={{ backgroundColor: "#ef787c" }}></span>
        <span></span>
      </div>
      <div>
        <h1>Bienvenue sur Quatre Février</h1>
        <p>
          L'application sécurisée dédiée aux patient.e.s atteint.e.s de cancer
          et à leurs proches aidant.e.s.
        </p>
      </div>
      <div className="bottom">
        <p>Faisons connaissance. Vous êtes:</p>
        <button onClick={() => setType("patient")}>
          Je suis un.e patient.e
        </button>
        <button onClick={() => setType("aidant")}>Je suis un.e aidant.e</button>
      </div>
    </main>
  ) : (
    <main className="container startPage">
      <div className="top">
        <span></span>
        <span style={{ backgroundColor: "#ef787c" }}></span>
      </div>
      <div>
        <h1>Protégeons vos informations</h1>
        <p>
          Rejoignez Quatre février et échangez avec des personnes qui vous
          comprennent réellement.
        </p>
      </div>
      <div className="bottom">
        <Link to="/signup">Créer un compte</Link>
        <Link to="/login">J'ai déjà un compte</Link>
      </div>
    </main>
  );
};
export default Welcome;
