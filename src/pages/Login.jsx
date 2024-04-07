import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState("");

  const handleSubmit = async (event) => {
    // Empêche le rafraichissement par défaut du navigateur lors de la soumission
    event.preventDefault();
    if (!email || !password) {
      setError("Email or Password is missing");
    } else {
      try {
        const response = await axios.post(
          "https://site--marvelback--7q2nrc54m6wr.code.run/user/login",
          {
            email: email,
            password: password,
          }
        );
        console.log("log", response);
        setData(response.data);
        console.log(response.data.token);
        handleToken(response.data.token);
        useNavigate("/");
      } catch (error) {
        console.log(error);
        setError("Wrong password or email");
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="container-Login">
      <section className="lgunderheader">
        <img src="../public/LogoHulk.png" alt="LogoCharMarvel" />
        <h1>Login</h1>
        <img src="../public/LogoHulk.png" alt="LogoCharMarvel" />
      </section>

      <form
        style={{ display: "flex", flexDirection: "column" }}
        // onSubmit sera déclenché lors du clique sur un bouton ou un input de type submit présent dans mon form
        onSubmit={handleSubmit}
      >
        <input
          className="email"
          // Mon input est de type email
          value={email}
          type="email"
          placeholder="Mail"
          name="email"
          // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
          onChange={handleEmailChange}
        />

        <input
          className="password"
          value={password}
          type="password"
          placeholder="Password"
          name="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {error && <p className="errorreport"> {error}</p>}
        <input className="buttonsubmit" type="submit" value="Login" />
        <Link to={"/Signup"}>
          <div className="noaccount">
            <p>Still no account? What are you doing? Sign up !</p>
          </div>
        </Link>
      </form>
    </div>
  );
};

export default Login;
