import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import FormInput from "../../components/FormInput/FormInput";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState("");
  const navigate = useNavigate(); // rappel
  const handleSubmit = (event) => {
    // Empêche le rafraichissement par défaut du navigateur lors de la soumission
    event.preventDefault();
    if (!email || !password) {
      setError("Email or Password is missing");
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
          setError("");
          navigate("/");
        } catch (error) {
          setError("Wrong password or email");
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
        // onSubmit sera déclenché lors du clique sur un bouton ou un input de type submit présent dans mon form
        onSubmit={handleSubmit}
      >
        {/* Form Input email
        <FormInput
          name="email"
          placeholder="Email"
          state={email}
          setState={setEmail}
          type={email}
        /> */}

        <input
          className="emaillogin"
          value={email}
          type="email"
          placeholder="Email"
          name="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <input
          className="passwordlogin"
          value={password}
          type="password"
          placeholder="Password"
          name="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {error && <p className="errorreportlogin"> {error}</p>}
        <input className="buttonsubmitlogin" type="submit" value="Login" />
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
