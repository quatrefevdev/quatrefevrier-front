import "./mesRdv.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import ButtonComponent from "../../../components/Button/ButtonComponent";

const MesRdv = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // route en get
  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/mesrdv");
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <main className="container-rdv">
      <button>GoBack</button>
      <div className="title">
        <h3>Mes rendez-vous</h3>
        <ButtonComponent txt="Ajouter +" />
      </div>
      <div className="eventList">
        <h4>A venir</h4>
        {/* Mapping sur les rdv à venir */}
        <div className="rdv">
          <div className="rdv-left">
            <p>date - heure</p>
            <p>type de rdv - institut</p>
          </div>
          <div className="rdv-right">
            <span>alarme</span>
            <span>partage</span>
          </div>
        </div>
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
            <span>alarme</span>
            <span>partage</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MesRdv;
