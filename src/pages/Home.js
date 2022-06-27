import React, { useContext, useState, useEffect } from "react";
import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "../components/DiaryList";
import { DiaryStateContext } from "../App";
export default function Home() {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장`;
  }, []);
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);

  const [curDate, setCurDate] = useState(new Date());

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();
      console.log(new Date(lastDay));

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [curDate, diaryList]);

  const increMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };
  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreMonth} />}
        rightChild={<MyButton text={">"} onClick={increMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
}
