import { useState, useEffect } from "react";
import axios from "axios";
//Css style
import "../../App.scss";
import "../Carnet/Appointments/myAppointments.scss";
import React from "react";
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Reception = ({ token, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [appointmentsdata, setAppointments] = useState([]);
  const [appLimit, setAppLimit] = useState(3);
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
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <h2>Chargement de la page...</h2>
  ) : (
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
                    {appointment.speciality && <p>appointment.speciality</p>}
                    {appointment.institution && <p>appointment.institution</p>}
                    {appointment.address && <p>appointment.address</p>}
                  </div>
                  <div className="rdv-right">
                    <FontAwesomeIcon color="#4C548C" icon="fa-solid fa-bell" />
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
        <p> Les dernières actus de vos forums favoris</p>
      </main>
      <Footer selected="none"></Footer>
    </div>
  );
};
export default Reception;
