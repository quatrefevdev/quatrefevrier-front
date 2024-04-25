import { TailSpin } from "react-loader-spinner";
import "./Loader.scss";
const Loader = ({
  visible,
  height,
  width,
  color,
  ariaLabel,
  radius,
  wrapperStyle,
  wrapperClass,
}) => {
  return (
    <div className="main-loader">
      <TailSpin
        visible={visible}
        height={height}
        width={width}
        color={color}
        ariaLabel={ariaLabel}
        radius={radius}
        wrapperStyle={wrapperStyle}
        wrapperClass={wrapperClass}
      />
    </div>
  );
};
export default Loader;
