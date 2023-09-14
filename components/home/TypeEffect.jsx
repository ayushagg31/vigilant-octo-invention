import { TypeAnimation } from "react-type-animation";

const TypeEffect = ({ message }) => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        message,
      ]}
      speed={10}
      cursor={false}
      onCom
    />
  );
};

export default TypeEffect;
