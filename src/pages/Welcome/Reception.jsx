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
        const response = await axios.get(`http://localhost:3000/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);

        const appointments = await axios.get(
          `http://localhost:3000/appointments/${response.data._id}?limit=+${appLimit}`,

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
          <main className="container-rdv">
            <h2> Bonjour {data.firstname}</h2>
            <p> Vos prochains rendez-vous</p>
            {appointmentsdata.length === 0 ? (
              <div> Pas de rendez vous à venir </div>
            ) : (
              <div>
                {appointmentsdata.map((appointment, idx) => {
                  return (
                    <div key={appointment._id} className="rdv">
                      <div className="rdv-left">
                        <p>{`${appointment.date} - ${appointment.time}`}</p>
                        {appointment.speciality && (
                          <p>appointment.speciality</p>
                        )}
                        {appointment.institution && (
                          <p>appointment.institution</p>
                        )}
                        {appointment.address && <p>appointment.address</p>}
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
                  );
                })}
              </div>
            )}
            <p> Vos forums favoris</p>
            <div className="favoris-list">
              {/* Mapping favoris */}
              {favorisData.length > 0 ? (
                favorisData.map((group, index) => (
                  <div className="favoris-content" key={index}>
                    <Link to={`/group/${group.groupId}`}>
                      <div>
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
                      </div>
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
