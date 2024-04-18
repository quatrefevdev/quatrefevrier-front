import "./carnetHome.scss";
import { Link } from "react-router-dom";

const CarnetHome = ({ id }) => {
  return (
    <main
      className="container startCarnet"
      style={{ justifyContent: "space-around" }}
    >
      <h2>Bienvenue sur votre espace de suivi médical</h2>
      <div className="carnet-buttons">
        <Link to={"/MyAppointments/" + id}>
          <button>Mes rendez-vous médicaux</button>
        </Link>
        <Link>
          <button>Mes effets secondaires</button>
        </Link>
        <Link>
          <button>Mon poids</button>
        </Link>
        <Link>
          <button>Mes notes</button>
        </Link>
      </div>
    </main>
  );
};

export default CarnetHome;
