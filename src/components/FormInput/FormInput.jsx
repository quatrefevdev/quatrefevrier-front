import "./FormInput.css";

const FormInput = ({ title, name, placeholder, state, setState, type }) => {
  return (
    <div>
      <h1 className="titleinput">{title}</h1>
      <div className="divforminput">
        <input
          className="forminput"
          value={state}
          type={type}
          placeholder={placeholder}
          name={name}
          color="white"
          // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
          onChange={(event) => {
            setState(event.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default FormInput;
