import { useState, useEffect } from "react";
import "./Forum.scss";

const Forum = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [suggestion, setSuggestion] = useState([]);

  // function to switch between screen
  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  // function to add / remove  selected item in screen step 1.
  const handleSuggest = (suggest) => {
    const newTab = [...suggestion];
    if (!newTab.includes(suggest)) {
      newTab.push(suggest);
      setSuggestion(newTab);
    } else {
      const index = newTab.indexOf(suggest);
      newTab.splice(index, 1);
      setSuggestion(newTab);
    }
    //console.log(suggestion);
  };
  // Display screen step 1 & 2 only the first time with user.isNew
  const displayForum = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div>
              <h1>Prersonnalisez vos recommandations</h1>
            </div>
            <div className="div-select">
              {/* Mapping of recommandations  => use a components for render */}
              <div
                className="select"
                style={
                  suggestion.includes("Gérer effets secondaire")
                    ? { backgroundColor: "#c3c3e9" }
                    : null
                }
                onClick={() => handleSuggest("Gérer effets secondaire")}
              >
                <p>Gérer effets secondaire</p>
              </div>
              <div
                className="select"
                onClick={() => handleSuggest("Eloignement de l'entourage")}
              >
                <p>Eloignement de l'entourage</p>
              </div>
              <div className="select">
                <p>fatigue</p>
              </div>
              <div className="select">
                <p>Perte de cheuveux</p>
              </div>
            </div>
            <div className="handleDisplay">
              <button className="buttonStep" onClick={handleNextStep}>
                Suivant
              </button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div>
              <h1>Découvrez nos suggestions de forums</h1>
              <p>Accédez à d'autres groupes par la suite.</p>
            </div>

            {/* Mapping of suggestions  => use a components for render */}
            <div className="div-select">
              <div className="select">
                <p>Gérer effets secondaire</p>
              </div>
              <div className="select">
                <p>Eloignement de l'entourage</p>
              </div>
            </div>

            <div className="handleDisplay">
              <button className="buttonStep" onClick={handlePreviousStep}>
                Précédent
              </button>
              <button className="buttonStep" onClick={handleNextStep}>
                Suivant
              </button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="handleDisplay">
              <button className="buttonCreateSearch"> Chercher un forum</button>
              <button className="buttonCreateSearch"> Créer un forum +</button>
            </div>
            <div>
              <h2>Vos forums favoris</h2>
              {/* Mapping favoris with 2 / 3 results */}
              <div className="forum-content">
                <div>
                  <p>Premier symptômes</p>
                  <span>1800 membres</span>
                </div>
                <div className="forum-button">
                  <p>Retirer le favori Symbole</p>
                </div>
              </div>
              <div className="forum-content">
                <div>
                  <p>Médecine complémentaire</p>
                  <span>868 membres</span>
                </div>
                <div className="forum-button">
                  <p>Retirer le favori Symbole</p>
                </div>
              </div>
            </div>
            <div>
              <h2>Vos forums</h2>
              {/* Mapping forum with 2 / 3 results */}
              <div className="forum-content">
                <div>
                  <p>Cosméto clean</p>
                  <span>1541 membres</span>
                </div>
                <div className="forum-button">
                  <p>Ajouter en favori Symbole</p>
                </div>
              </div>
              <div className="forum-content">
                <div>
                  <p>Homéopathie</p>
                  <span>272 membres</span>
                </div>
                <div className="forum-button">
                  <p>Ajouter en favori Symbole</p>
                </div>
              </div>
            </div>
            <div>
              <h2>Nos Suggestions</h2>
              {/* Mapping suggestions with 2 / 3 results */}
              <div className="forum-content">
                <div>
                  <p>Menus batch cooking</p>
                  <span>626 membres</span>
                </div>
                <div className="forum-button">
                  <p>Voir Symbole</p>
                </div>
              </div>
              <div className="forum-content">
                <div>
                  <p>Dénutrition</p>
                  <span>168 membres</span>
                </div>
                <div className="forum-button">
                  <p>Voir Symbole</p>
                </div>
              </div>
            </div>
            {/* Just for test need to be remove later */}
            <div className="handleDisplay">
              <button className="buttonStep" onClick={handlePreviousStep}>
                Précédent
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <section className="forum-section">
        <div className="container-forum">{displayForum()}</div>
      </section>
    </>
  );
};

export default Forum;
