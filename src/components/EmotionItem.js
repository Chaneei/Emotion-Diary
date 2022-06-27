import React from "react";

const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  //전달받는 요소중에 함수가 있다
  //useState를 통해 전달받은 상태 변화함수가 아니거나
  //useCallback으로 묶어놓은 함수가 아니라면
  //컴포넌트 렌더링될때 렌더링되기에 상위 컴포넌트에서 useCallback
  isSelected,
}) => {
  return (
    <div
      onClick={() => onClick(emotion_id)}
      className={[
        "EmotionItem",
        isSelected ? `emotion-select-${emotion_id}` : `emotion-noselect`,
      ].join(" ")}
    >
      <img src={emotion_img} alt="emotion" />
      <span>{emotion_descript}</span>
    </div>
  );
};
export default React.memo(EmotionItem);
