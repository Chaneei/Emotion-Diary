import React, { useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";

import DiaryItem from "./DiaryItem";
export default function DiaryList({ diaryList }) {
  const navigate = useNavigate();

  const [sortType, setSortType] = useState("lastest");

  const [filter, setFilter] = useState("all");

  const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된순" },
  ];
  const filterOptionList = [
    { value: "all", name: "전부" },
    { value: "good", name: "좋은감정만" },
    { value: "bad", name: "안좋은감정만" },
  ];

  const ControlMenu = React.memo(({ value, onChange, optionList }) => {
    return (
      <select
        className="ControlMenu"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {optionList.map((it, idx) => (
          <option value={it.value} key={idx}>
            {it.name}
          </option>
        ))}
      </select>
    );
  });
  //강화된 컴포넌트를 돌려주는 고차 컴포넌트
  //컴포넌트 하나를 인자로 받아 전달받는 prop이 바뀌지 않으면
  //렌더링 되지않게끔 memorization해줌
  const getProcessedDirayList = () => {
    const filterCallback = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallback(it));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <>
      <div className="DiaryList">
        <div className="menuwrap">
          <div className="left">
            <ControlMenu
              className="ControlMenu"
              value={sortType}
              onChange={setSortType}
              optionList={sortOptionList}
            />
            <ControlMenu
              className="ControlMenu"
              value={filter}
              onChange={setFilter}
              optionList={filterOptionList}
            />
          </div>
          <div className="right">
            <MyButton
              type={"positive"}
              text={"새 일기쓰기"}
              onClick={() => navigate("/new")}
            />
          </div>
        </div>
        {getProcessedDirayList().map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};
