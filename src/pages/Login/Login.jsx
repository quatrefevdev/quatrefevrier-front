import { useState } from "react";
import "./Login.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

//Components
import FormInput from "../../components/FormInput/FormInput";
import ButtonComponent from "../../components/Button/ButtonComponent";

const Login = ({ handleToken, setId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState("");
  const navigate = useNavigate(); // rappel
  const handleSubmit = (event) => {
    // Empêche le rafraichissement par défaut du navigateur lors de la soumission
    event.preventDefault();
    if (!email || !password) {
      setError("Il manque l'adresse email ou le mot de passe");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "http://localhost:3000/user/login",
            {
              email: email,
              password: password,
            }
          );
          console.log("log", response);
          setData(response.data);
          console.log("Data", response.data.token);
          handleToken(response.data.token);
          setId(response.data._id);
          setError("");
          navigate("/");
        } catch (error) {
          setError("Mauvais mot de passe ou adresse email");
        }
      };
      fetchData();
    }
  };

  return (
    <div className="containerlogin">
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="titlelogin">
          <h1 className="h1login">Connexion</h1>
          <FormInput
            title=""
            name="inputsignup"
            placeholder="Adresse email"
            state={email}
            setState={setEmail}
            type="text"
          />

          <FormInput
            title=""
            name="inputsignup"
            placeholder="Mot de passe"
            state={password}
            setState={setPassword}
            type="password"
          />
        </div>

        {error && <p className="errorreportlogin"> {error}</p>}

        <Link to={"/forgetpassword"}>
          <div className="forgetpasswordlogin">
            <p>Mot de passe oublié?</p>
          </div>
        </Link>

        <div className="buttondivlogin">
          <ButtonComponent pressFct={handleSubmit} txt="Se connecter >" />
        </div>

        <Link to={"/Signup"}>
          <div className="noaccountlogin">
            <p>Toujours pas de compte ? Inscris-toi !</p>
          </div>
        </Link>
      </form>
    </div>
  );
};

export default Login;
