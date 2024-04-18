import "./myAppointments.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import ButtonComponent from "../../../components/Button/ButtonComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";

const MyAppointments = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [noRdv, setNoRdv] = useState(false);
  const fetchData = async () => {
    const url = "http://localhost:3000/appointments/" + id;
    console.log(url);
    try {
      const { data, status } = await axios.get(url);
      if (status === 204) {
        setNoRdv(true);
      } else {
        setData(data);
      }
      setIsLoading(false);
      console.log(status);
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

      <div className="eventList">
        <h4>A venir</h4>
        {/* Mapping sur les rdv à venir */}

        {noRdv ? (
          <p>Pas de rendez-vous enregistré</p>
        ) : (
          data.map((rdv) => {
            return (
              <div key={rdv._id} className="rdv">
                <div className="rdv-left">
                  <p>{`${rdv.date} - ${rdv.time}`}</p>
                  <p>{`${rdv.speciality} - ${rdv.institution}`}</p>
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
          })
        )}
      </div>
      <div className="eventList">
        <h4>Historique</h4>
        {/* Mapping sur les rdv à venir */}
        <div className="rdv">
          <div className="rdv-left">
            <p>date - heure</p>
            <p>type de rdv - institut</p>
          </div>
          <div className="rdv-right">
            <FontAwesomeIcon color="#4C548C" icon="fa-solid fa-bell" />
            <FontAwesomeIcon color="#4C548C" icon="fa-solid fa-share-nodes" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyAppointments;
