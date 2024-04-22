import axios from "axios";
import "./BinWarning.scss";
const BinWarning = ({ setVisibility, setDel }) => {
  return (
    <div
      className="modal-root"
      onMouseDown={() => {
        setVisibility(false);
      }}
    >
      <div
        className="modal"
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        <h3>Confirmer la suppression?</h3>
        <div>
          <button
            onClick={() => {
              setDel(true);
              setVisibility(false);
            }}
          >
            Oui
          </button>
          <button onClick={() => setVisibility(false)}>non</button>
        </div>
      </div>
    </div>
  );
};

export default BinWarning;
