import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Forum.scss";

// Import component
import { redirectIfNoToken } from "../../components/RedirectIfNoToken/RedirectIfNoToken";
//Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/Footer/Footer";

const Forum = ({ token, handleToken }) => {
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
      const response = await axios.put(
        "http://localhost:3000/user/updateuser/",
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
        `http://localhost:3000/forum/join`,
        {
          suggestion: suggestion,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //await Promise.all([request, response]);

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
  // const handlePreviousStep = () => {
  //   setStep(step - 1);
  // };

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
    //console.log(suggestion);
  };

  // const handleLogout = () => {
  //   console.log(token);
  //   handleToken();
  //   navigate("/login");
  // };

  // function to add / remove favoris
  const handleFav = async (id) => {
    try {
      await axios.post(
        `http://localhost:3000/forum/favoris`,
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
  // const redirectIfNoToken = async () => {
  //   if (!token) {
  //     navigate("/login");
  //   }
  // };
  const fetchData = async () => {
    try {
      setIsLoading(true);
      if (step === 1) {
        // Get the info about the user to know if he is new
        const response = await axios.get(`http://localhost:3000/user/forum`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        const isNew = response.data.userRef.account.needToChooseForum;
        console.log(isNew);
        const allGroups = response.data.userRef.account.forumlist;
        // console.log(allGroups);
        //console.log(step);
        // if he isn't new, he go to the next screen.
        if (!isNew) {
          setStep(2);
          return;
        }
        // if user is new , he stays at screen one and choose group of forum
        const responseGroups = await axios.get(` http://localhost:3000/groups`);
        setData(responseGroups.data);
        //console.log(responseGroups.data[1].groups);
        setIsLoading(false);
      } else {
        const [responseGroupData, responsefav, responseNotMember] =
          await Promise.all([
            axios.get(`http://localhost:3000/forum/group`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get("http://localhost:3000/forum/group/favoris", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get(`http://localhost:3000/forum/group/notin`, {
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
        //console.log(groupData);
        if (groupData) {
          setGroupData(groupData);
        }

        const favData = responsefav.data || [];
        //console.log(favData);
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

  //console.log(id);
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
          const newArray = array.filter((group) => !group.is_cancer);
          //console.log("ICI USER DATA ", userData);
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
          //console.log(otherGroup);
          return (
            <>
              <div className="handleDisplay">
                <button className="buttonCreateSearch">
                  Chercher un forum
                </button>
                <button
                  className="buttonCreateSearch"
                  // onClick={() => {
                  //   handleLogout();
                  // }}
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
                        <div>
                          <p className="forum-name">{group.groupName}</p>
                          <p className="forum-member">
                            {group.numberOfUsers} membres
                          </p>
                        </div>
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
                        <div>
                          <p className="forum-name">{group.groupName}</p>
                          <p className="forum-member">
                            {group.numberOfUsers} membres
                          </p>
                        </div>
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
                          <div className="forum-text">
                            <p className="forum-name">{group.group_name}</p>
                            <p className="forum-member">
                              {group.group_members
                                ? group.group_members.length
                                : 0}{" "}
                              membres
                            </p>
                          </div>
                          <div className="forum-button">
                            <p>
                              Voir{" "}
                              <FontAwesomeIcon
                                icon="fa-regular fa-eye"
                                size="lg"
                              />
                            </p>
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
