import "./FormInput.css";

const FormInput = ({ name, placeholder, state, setState, type }) => {
  return (
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
  );
};

export default FormInput;
