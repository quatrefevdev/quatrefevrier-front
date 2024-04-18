import "./addAppointment.scss";
import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";

const AddAppointment = () => {
  return (
    <main className="container-rdv">
      <Link to="/carnetHome">
        <FontAwesomeIcon
          style={{ alignSelf: "start", color: "#4C548C" }}
          icon="fa-solid fa-arrow-left"
        />
      </Link>
      <div className="title">
        <h3>Ajoutez votre prochain rendez-vous</h3>
      </div>
      <form action="">
        <div className="inline-inputs">
          <div className="input-div">
            <label htmlFor="date">
              <h4>Date*</h4>
            </label>
            <input type="text" name="date" />
          </div>
          <div className="input-div">
            <label htmlFor="heure">
              <h4>Heure*</h4>
            </label>
            <input type="text" name="heure" />
          </div>
        </div>
        <div className="inline-inputs">
          <div className="input-div">
            <label htmlFor="doctor">
              <h4>Nom du médecin</h4>
            </label>
            <input type="text" name="doctor" />
          </div>
          <div className="input-div">
            <label htmlFor="spec">
              <h4>Spécialité</h4>
            </label>
            <input type="text" name="spec" />
          </div>
        </div>
        <div>
          <label htmlFor="adress">
            <h4>Adresse</h4>
          </label>
          <input type="text" name="adress" />
        </div>
        <div>
          <label htmlFor="notes">
            <h4>Notes</h4>
          </label>
          <textarea
            rows={5}
            cols={50}
            type="text"
            name="notes"
            placeholder="Code bâtiment, questions, apparition d'effets secondaire, etc."
          />
        </div>
        <div id="upload">
          <label htmlFor="picture" style={{ marginRight: "10px" }}>
            Téléchargez un document
          </label>
          <input
            id="picture"
            style={{ display: "none" }}
            type="file"
            onChange={(e) => {
              setPicture(e.target.files[0]);
            }}
          />
          <FontAwesomeIcon icon="fa-solid fa-upload" color="#32365a" />
        </div>
        <span>Ordonnance, compte-rendu, etc</span>
        <div className="checkbox-div">
          <div>
            <input type="checkbox" />
            <p>Recevoir une alerte 24h avant</p>
          </div>
          <div>
            <input type="checkbox" />
            <p>Partager avec mon aidant.e</p>
          </div>
        </div>
        <button
          type="submit"
          className="buttonclass"
          style={{ alignSelf: "center", marginTop: "20px" }}
        >
          Enregistrer
        </button>
      </form>
    </main>
  );
};
export default AddAppointment;
