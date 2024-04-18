import "./ButtonComponent.scss";

const ButtonComponent = ({ pressFct, txt, id }) => {
  return (
    <button className="buttonclass" id={id} onClick={pressFct}>
      {" "}
      {txt}
    </button>
  );
};

export default ButtonComponent;
