import colors from "../../Colors/colors.json";
import "../../../src/App.scss";

const Welcome = () => {
  return (
    <main className="container startPage">
      <div className="top">
        <span></span>
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
        <button>Je suis un.e patient.e</button>
        <button>Je suis un.e aidant.e</button>
      </div>
    </main>
  );
};
export default Welcome;
