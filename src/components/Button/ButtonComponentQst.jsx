import "./ButtonComponentQst.scss";

const ButtonComponentQst = ({ value, pressFct, txt, id }) => {
  return (
    <div>
      {value === 0 || !value ? (
        <button className="buttonclassqst" id={id} onClick={pressFct}>
          <p>{txt}</p>
        </button>
      ) : (
        <button className="buttonclassselectedqst" id={id} onClick={pressFct}>
          {txt}
        </button>
      )}
    </div>
  );
};

export default ButtonComponentQst;
