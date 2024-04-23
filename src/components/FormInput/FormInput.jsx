import "./FormInput.scss";

const FormInput = ({
  title,
  undertitle,
  name,
  placeholder,
  state,
  setState,
  type,
}) => {
  return (
    <div>
      <h2 className="titleinput">{title}</h2>
      <div className="inputundertitle">
        <p>{undertitle}</p>
      </div>
      <div className="divforminput">
        <input
          className="forminput"
          value={state}
          type={type}
          placeholder={placeholder}
          name={name}
          color="white"
          autoCapitalize="none"
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
