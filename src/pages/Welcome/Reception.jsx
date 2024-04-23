import { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
//Css style
import "../../App.scss";
import "../Carnet/Appointments/myAppointments.scss";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/Footer/Footer";
import formatDate from "../../assets/utils";

const Reception = ({ token, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [appointmentsdata, setAppointments] = useState([]);
  const [favorisData, setFavorisData] = useState([]);
  const [appLimit, setAppLimit] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);

        const appointments = await axios.get(
          `${import.meta.env.VITE_API_URL}/appointments?limit=+${appLimit}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
              limit: appLimit,
            },
          }
        );
        setAppointments(appointments.data);
        console.log("Appointments : ", appointmentsdata);

        const favoris = await axios.get(
          `${import.meta.env.VITE_API_URL}/forum/group/favoris`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavorisData(favoris.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <h2>Chargement de la page...</h2>
      ) : token ? (
        <div>
          {console.log(data)}
          <main className="container-rdv">
            <h2> Bonjour {data.account.firstname}</h2>
            <h3> Vos prochains rendez-vous</h3>
            {appointmentsdata.length === 0 ? (
              <div> Pas de rendez vous à venir </div>
            ) : (
              <div>
                {appointmentsdata.map((rdv) => {
                  return (
                    <Link key={rdv._id} to={"/showAppointment/" + rdv._id}>
                      <div className="rdv">
                        <div className="rdv-left">
                          <p>{`${formatDate(rdv.date)} - ${rdv.time}`}</p>
                          <p>{`${rdv.speciality} - ${rdv.institution}`}</p>
                        </div>
                        <div className="rdv-right">
                          <FontAwesomeIcon
                            color="#4C548C"
                            icon="fa-solid fa-bell"
                          />
                          <FontAwesomeIcon
                            color="#4C548C"
                            icon="fa-solid fa-share-nodes"
                          />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
            <h3> Vos forums favoris</h3>
            <div className="favoris-list">
              {/* Mapping favoris */}
              {favorisData.length > 0 ? (
                favorisData.map((group, index) => (
                  <div className="favoris-content" key={index}>
                    <Link to={`/group/${group.groupId}`}>
                      <div className="rdv">
                        <div className="rdv-left">
                          <p>{group.groupName}</p>
                          <p> {group.numberOfUsers} membres</p>
                        </div>
                        <div className="rdv-right">
                          <p>
                            Allez voir{" "}
                            <FontAwesomeIcon
                              color="#4C548C"
                              icon="fa-regular fa-eye"
                              size="lg"
                            />
                          </p>
                        </div>
                      </div>

                      {/* <div>
                        <p className="favoris-name">{group.groupName}</p>
                        <p className="favoris-member">
                          {group.numberOfUsers} membres
                        </p>
                      </div>

                      <div className="favoris-button">
                        <p>
                          Allez voir{" "}
                          <FontAwesomeIcon icon="fa-regular fa-eye" size="lg" />
                        </p>
                      </div> */}
                    </Link>
                  </div>
                ))
              ) : (
                <div>
                  <p>Vous n'avez pas de forum favoris !</p>
                </div>
              )}
            </div>
            <Footer selected=""></Footer>
          </main>
        </div>
      ) : (
        <div>
          <Navigate to="/login" />
        </div>
      )}
    </>
  );
};
export default Reception;
