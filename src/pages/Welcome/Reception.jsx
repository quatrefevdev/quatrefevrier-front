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
import { redirectIfNoToken } from "../../components/RedirectIfNoToken/RedirectIfNoToken";
import Loader from "../../components/loader/Loader";

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
      } catch (error) {}
    };
    redirectIfNoToken(token, navigate);
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader
          visible={true}
          height="80"
          width="80"
          color="#4c548c"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <div>
          <main className="container-rdv">
            <h1> Bonjour {data.account.firstname},</h1>
            <h3 style={{ marginTop: "20px" }}> Vos prochains rendez-vous:</h3>
            {appointmentsdata.length === 0 ? (
              <h4> Pas de rendez vous à venir </h4>
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
            <h3 style={{ marginTop: "20px" }}> Vos forums favoris:</h3>
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
                    </Link>
                  </div>
                ))
              ) : (
                <div>
                  <h4>Vous n'avez pas de forum favoris !</h4>
                </div>
              )}
            </div>
            <Footer selected=""></Footer>
          </main>
        </div>
      )}
    </>
  );
};
export default Reception;
