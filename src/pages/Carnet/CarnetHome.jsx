import "./carnetHome.scss";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const CarnetHome = () => {
  return (
    <>
      <main
        className="container startCarnet"
        style={{ justifyContent: "space-around" }}
      >
        <h2>Bienvenue sur votre espace de suivi médical</h2>
        <div className="carnet-buttons">
          <Link to={"/MyAppointments"}>
            <button>Mes rendez-vous médicaux</button>
          </Link>
          <Link to={"/secondaryeffects"}>
            <button>Mes effets secondaires</button>
          </Link>
          <Link to={"/myweight"}>
            <button>Mon poids</button>
          </Link>
          <Link to={"/mynotes"}>
            <button>Mes notes</button>
          </Link>
        </div>
      </main>
      <Footer selected="suivi" />
    </>
  );
};

export default CarnetHome;
