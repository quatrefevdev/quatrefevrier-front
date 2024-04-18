import "./carnetHome.scss";

const CarnetHome = () => {
  return (
    <main
      className="container startCarnet"
      style={{ justifyContent: "space-around" }}
    >
      <h2>Bienvenue sur votre espace de suivi médical</h2>
      <div className="carnet-buttons">
        <button>Mes rendez-vous médicaux</button>
        <button>Mes effets secondaires</button>
        <button>Mon poids</button>
        <button>Mes notes</button>
      </div>
    </main>
  );
};

export default CarnetHome;
