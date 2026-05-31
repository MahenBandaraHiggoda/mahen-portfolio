import "./FloatingRobot.css";

export default function FloatingRobot({ src = "/assets/robot.gif" }) {
  return (
    <img
      className="floating-robot"
      src={src}
      alt=""
      aria-hidden="true"
      onError={(event) => {
        event.currentTarget.hidden = true;
      }}
    />
  );
}
