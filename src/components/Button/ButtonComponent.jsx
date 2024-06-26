import "./ButtonComponent.scss";

const ButtonComponent = ({ value, pressFct, txt, id }) => {
  return (
    <div>
      {value === 0 || !value ? (
        <button className="buttonclass" id={id} onClick={pressFct}>
          <p>{txt}</p>
        </button>
      ) : (
        <button className="buttonclassselected" id={id} onClick={pressFct}>
          {txt}
        </button>
      )}
    </div>
  );
};

export default ButtonComponent;
