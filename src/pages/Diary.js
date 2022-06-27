import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

//사용자 정의 훅 커스텀훅스
//전달받아서 들어오는 path varialbe(:id)를 모아서 객체로 가져도 줌
export default function Diary() {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `${parseInt(id) + 1}번째 일기`;
  }, []);
  const { id } = useParams();
  const navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        //일기가 존재할때
        setData(targetDiary);
      } else {
        //일기가 존재하지 않을때
        alert("없는 일기입니다");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    console.log(curEmotionData);
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton text={`< 뒤로가기`} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={`수정하기`}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary-img-wrap",
                `diary-img-wrap-${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} />
              <div className="emotion-descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary-content-wrap">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
}
