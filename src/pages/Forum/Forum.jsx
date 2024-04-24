import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Forum.scss";

// Import component
import { redirectIfNoToken } from "../../components/RedirectIfNoToken/RedirectIfNoToken";

//Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/Footer/Footer";

const Forum = ({ token }) => {
  const [data, setData] = useState({});
  const [userData, setUserData] = useState({});
  const [groupData, setGroupData] = useState([]);
  const [favGroupData, setFavGroupData] = useState([]);
  const [otherGroup, setOtherGroup] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [suggestion, setSuggestion] = useState([]);
  const navigate = useNavigate();

  // function to switch between screen
  const handleNextStep = async (suggestion) => {
    try {
      //Request to modify the user model to switch the isNew and add array of id of group
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/updateuser/`,
        {
          needToChooseForum: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //Need another Request to modify the group model to add the id user in each group.
      const request = await axios.post(
        `${import.meta.env.VITE_API_URL}/forum/join`,
        {
          suggestion: suggestion,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Ensure both requests were successful
      if (request.status === 200) {
        console.log("User updated and joined forum successfully.");
        setIsLoading(true);
        setStep(step + 1);
      } else {
        throw new Error("Failed to update user or join forum.");
      }
    } catch (error) {
      console.log("Erreur message : ", error);
    }
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
  };

  // function to add / remove favoris
  const handleFav = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/forum/favoris`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
    } catch (error) {
      console.log("Error message : ", error.response.data.message);
    }
  };

  const fetchData = async () => {
    try {
      //setIsLoading(true);
      if (step === 1) {
        // Get the info about the user to know if he is new
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/forum`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
        const isNew = response.data.userRef.account.needToChooseForum;
        const allGroups = response.data.userRef.account.forumlist;
        // if he isn't new, he go to the next screen.
        if (!isNew) {
          setStep(2);
          return;
        }
        // if user is new , he stays at screen one and choose group of forum
        const responseGroups = await axios.get(
          ` ${import.meta.env.VITE_API_URL}/groups`
        );
        setData(responseGroups.data);
        setIsLoading(false);
      } else {
        const [responseGroupData, responsefav, responseNotMember] =
          await Promise.all([
            axios.get(`${import.meta.env.VITE_API_URL}/forum/group`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get(`${import.meta.env.VITE_API_URL}/forum/group/favoris`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get(`${import.meta.env.VITE_API_URL}/forum/group/notin`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);
        const otherGroup = responseNotMember.data || [];
        if (otherGroup) {
          setOtherGroup(otherGroup.groups);
        }

        const groupData = responseGroupData.data || [];
        if (groupData) {
          setGroupData(groupData);
        }

        const favData = responsefav.data || [];
        if (favData) {
          setFavGroupData(favData);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    redirectIfNoToken(token, navigate);
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
          const array = data[1].groups;
          const newArray = array.filter((group) => !group.is_cancer);
          return (
            <>
              <div>
                <h1>Découvrez nos suggestions de forums</h1>
                <p>Accédez à d'autres groupes par la suite.</p>
              </div>
              <div className="div-select">
                {/* Mapping of suggestions  => use a components for render */}
                {newArray.map((group) => {
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
                <button
                  className="buttonStep"
                  onClick={() => handleNextStep(suggestion)}
                >
                  Suivant
                </button>
              </div>
            </>
          );
        }
      case 2:
        if (isLoading === true) {
          return (
            <>
              <div>
                <h1>EN CHARGEMENT</h1>
              </div>
            </>
          );
        } else {
          const nonFavGroups = groupData.filter(
            (group) =>
              !favGroupData.some(
                (favGroup) => favGroup.groupId === group.groupId
              )
          );
          return (
            <>
              <div className="handleDisplay">
                <button 
                  className="buttonCreateSearch"
                  onClick={() => navigate("/forums")}
                >
                  Chercher un forum
                </button>
                <button
                  className="buttonCreateSearch"
                  onClick={() => navigate("/group/create")}
                >
                  Créer un forum +
                </button>
              </div>
              <div>
                <h2>Vos forums favoris</h2>
                <div className="forum-list">
                  {/* Mapping favoris */}
                  {favGroupData.length > 0 ? (
                    favGroupData.map((group, index) => (
                      <div className="forum-content" key={index}>
                        <Link to={`/group/${group.groupId}`}>
                          <div>
                            <p className="forum-name">{group.groupName}</p>
                            <p className="forum-member">
                              {group.numberOfUsers} membres
                            </p>
                          </div>
                        </Link>
                        <div
                          className="forum-button"
                          onClick={() => handleFav(group.groupId)}
                        >
                          <p>
                            Retirer favori{" "}
                            <FontAwesomeIcon icon="circle-xmark" size="lg" />
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      <p>Vous n'avez pas de forum favoris !</p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h2>Vos forums</h2>
                <div className="forum-list">
                  {/* Mapping forum with 2 / 3 results */}
                  {nonFavGroups.length > 0 ? (
                    nonFavGroups.map((group, index) => (
                      <div className="forum-content" key={index}>
                        <Link to={`/group/${group.groupId}`}>
                          <div>
                            <p className="forum-name">{group.groupName}</p>
                            <p className="forum-member">
                              {group.numberOfUsers} membres
                            </p>
                          </div>
                        </Link>
                        <div
                          className="forum-button"
                          onClick={() => handleFav(group.groupId)}
                        >
                          <p>
                            Ajouter favoris{" "}
                            <FontAwesomeIcon
                              icon="fa-solid fa-heart"
                              size="lg"
                            />
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      <p>Vous n'avez pas de forum !</p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h2>Autres forums</h2>
                {/* Mapping suggestions with 2 / 3 results */}
                {otherGroup && otherGroup.length > 0 ? (
                  <>
                    {otherGroup
                      .filter((group) => !group.is_cancer)
                      .slice(0, 2)
                      .map((group, index) => (
                        <div className="forum-content" key={index}>
                          <Link to={`/group/${group._id}`}>
                            <div className="forum-text">
                              <p className="forum-name">{group.group_name}</p>
                              <p className="forum-member">
                                {group.group_members
                                  ? group.group_members.length
                                  : 0}{" "}
                                membres
                              </p>
                            </div>
                          </Link>
                          <div className="forum-button">
                            <Link to={`/group/${group._id}`}>
                              <p className="forum-button-eye">
                                Voir{" "}
                                <FontAwesomeIcon
                                  icon="fa-regular fa-eye"
                                  size="lg"
                                />
                              </p>
                            </Link>
                          </div>
                        </div>
                      ))}
                  </>
                ) : (
                  <div>
                    <p>Aucun autre forum disponible</p>
                  </div>
                )}
              </div>
            </>
          );
        }
    }
  };

  return (
    <>
      <section className="forum-section">
        <div className="container-forum">{displayForum()}</div>
      </section>
      <Footer selected="forum"></Footer>
    </>
  );
};

export default Forum;
