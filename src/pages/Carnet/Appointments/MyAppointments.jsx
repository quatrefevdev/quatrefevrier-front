import "./myAppointments.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import ButtonComponent from "../../../components/Button/ButtonComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";

const MyAppointments = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [comingAppointments, setComingAppointments] = useState("");
  const [pastAppointments, setPastAppointments] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [noRdv, setNoRdv] = useState(false);
  const formatDate = (date) => {
    const dateObject = new Date(date);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Note: getMonth() returns zero-based month, so we add 1
    const year = dateObject.getFullYear();
    const formattedDate = `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;
    // console.log(formattedDate); // Output: "dd/mm/yyyy"
    return formattedDate;
  };
  const fetchData = async () => {
    const url = "http://localhost:3000/appointments/" + id;
    // console.log(url);
    try {
      const { data, status } = await axios.get(url);
      if (status === 204) {
        setNoRdv(true);
        setIsLoading(false);
      } else {
        setData(data);
        let pastApp = [];
        let comingApp = [];
        data.map((rdv) => {
          const date = new Date(rdv.date);
          if (date.getTime() > Date.now()) {
            comingApp.push(rdv);
          } else {
            pastApp.push(rdv);
          }
        });
        setComingAppointments(comingApp);
        setPastAppointments(pastApp);
        setIsLoading(false);
      }
      // console.log(status);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return isLoading ? (
    <h2>Chargement de la page...</h2>
  ) : (
    <main className="container-rdv">
      <Link to="/carnetHome">
        <FontAwesomeIcon
          style={{ alignSelf: "start", color: "#4C548C" }}
          icon="fa-solid fa-arrow-left"
        />
      </Link>
      <div className="title">
        <h3>Mes rendez-vous</h3>
        <Link to={"/addAppointment/" + id}>
          <ButtonComponent txt="Ajouter +" />
        </Link>
      </div>
      {noRdv ? (
        <h2>Pas de rendez-vous enregistré</h2>
      ) : (
        <>
          <div className="eventList">
            <h4>A venir</h4>

            {comingAppointments.map((rdv) => {
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
          <div className="eventList">
            <h4>Historique</h4>
            {pastAppointments.map((rdv) => {
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
        </>
      )}
    </main>
  );
};

export default MyAppointments;
