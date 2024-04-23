import { useState } from "react";
import "./ForgetPassword.scss";
import "../../css/fonts.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

//Components
import FormInput from "../../components/FormInput/FormInput";
import ButtonComponent from "../../components/Button/ButtonComponent";

const FortgetPassword = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState("");
  const navigate = useNavigate(); // rappel
  const handleSubmit = (event) => {
    // Empêche le rafraichissement par défaut du navigateur lors de la soumission
    event.preventDefault();
    if (!email) {
      setError("Merci de saisir une adresse email");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/user/send_verification_email`,
            {
              email: email,
            }
          );
          setData(response.data);
          console.log("Email envoyé", response.data);
          setError("");
          navigate("/login");
        } catch (error) {
          setError("Erreur dans l'envoi du mail, désolé");
        }
      };
      fetchData();
    }
  };

  return (
    <div className="containerfgpass">
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="titlefgpass">
          <h1 className="h1fgpass">Réinitialiser le mot de passe</h1>
          <FormInput
            title=""
            name="inputsignup"
            placeholder="Adresse email"
            state={email}
            setState={setEmail}
            type="text"
          />

          {error && <p className="errorreportfgpass"> {error}</p>}
          <div className="buttondivfgpass">
            <ButtonComponent pressFct={handleSubmit} txt="Se connecter >" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FortgetPassword;
