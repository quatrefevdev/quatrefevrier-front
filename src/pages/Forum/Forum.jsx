import { useState, useEffect } from "react";
import axios from "axios";
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
    if (!newTab.includes(suggest) && newTab.length < 5) {
      newTab.push(suggest);
      setSuggestion(newTab);
    } else {
      const index = newTab.indexOf(suggest);
      newTab.splice(index, 1);
      setSuggestion(newTab);
    }
    console.log(suggestion);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (step === 1) {
          const response = await axios.get(` http://localhost:3000/groups`);
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [step]);

  // Display screen step 1 only the first time with user.isNew
  const displayForum = () => {
    switch (step) {
      case 1:
        if (isLoading === true) {
          return (
            <>
              <div>
                <h1>EN CHARGEMENT</h1>
              </div>
            </>
          );
        } else {
          //console.log(data[1].groups);
          const array = data[1].groups;
          return (
            <>
              <div>
                <h1>Découvrez nos suggestions de forums</h1>
                <p>Accédez à d'autres groupes par la suite.</p>
              </div>
              <div className="div-select">
                {/* Mapping of suggestions  => use a components for render */}
                {array.map((group) => {
                  return (
                    <div
                      key={group._id}
                      className="select"
                      style={
                        suggestion.includes(group._id)
                          ? { backgroundColor: "#c3c3e9" }
                          : null
                      }
                      onClick={() => handleSuggest(group._id)}
                    >
                      <p>{group.group_name}</p>
                    </div>
                  );
                })}
              </div>

              <div className="handleDisplay">
                <button className="buttonStep" onClick={handleNextStep}>
                  Suivant
                </button>
              </div>
            </>
          );
        }
      case 2:
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
