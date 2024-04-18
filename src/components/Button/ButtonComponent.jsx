import "./ButtonComponent.scss";

const ButtonComponent = ({ value, pressFct, txt, id }) => {
  console.log(value);
  return (
    <div>
      {value === 0 ? (
        <button className="buttonclass" id={id} onClick={pressFct}>
          {" "}
          {txt}
        </button>
      ) : (
        <button className="buttonclassselected" id={id} onClick={pressFct}>
          {" "}
          {txt}
        </button>
      )}
    </div>
  );
};

export default ButtonComponent;
