import React from "react";

export default function MyButton({ text, type, onClick }) {
  const btnType = ["posivie", "negative"].includes(type) ? type : `default`;
  return (
    <button className={[`MyButton`, `${type}`].join(" ")} onClick={onClick}>
      {text}
    </button>
  );
}

MyButton.defaultProps = {
  type: "default",
};
