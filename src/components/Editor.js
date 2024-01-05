// 취소하기 버튼은 누르면 메인페이지로 되돌아감
// 리액트에서 뒤로가기 이벤트가 동작하려면 react-router-dom 기능 중 useNavigate 이용

import { useNavigate } from "react-router-dom";
import "./Editor.css";
import { useState, useEffect, useCallback } from "react";
import { emotionList,getFormattedDate } from "../util";
import Button from "./Button";
import EmotionItem from "./Emotionitem";

const Editor = ({ initData, onSubmit }) => {
    // useNavigate를 호출해서 함수 navigate 생성시 페이지 간의 이동이 간편해진다
  const navigate = useNavigate();
  const [state, setState] = useState({
    date: getFormattedDate(new Date()),
    emotionId: 3,
    content: "",
  });
  // 날짜관련 이벤트 핸들러 만들기
  // 사용자가 입력된 날짜를 변경하면 함수가 호출, state를 업데이트
  const handleChangeDate = (e) => {
    setState({
      ...state,
      date: e.target.value,
    });
  };

  const handleChangeContet = (e) => {
    setState({
      ...state,
      content: e.target.value,
    });
  };

  // 작성완료 버튼의 onClick 함수
  const handleSubmit = () => {
    onSubmit(state);
  };

  const handleOnGoBack = () => {
    navigate(-1);
  };

  // 감정이미지를 클릭하면 호출할 이벤트 함수 생성
  // 감정이미지 선택 섹션에 클릭한 이미지 번호를 매개변수 emotionId에 저장
  // 이 저장된 번호로 현재 state의 emotionId값 업데이트
  const handleChangeEmotion = useCallback((emotionId) => {
    setState((state) => ({
        ...state,
        emotionId
    }));
  }, []);
  // editor 컴포넌트에서 useEffect를 호출하고 props로 받은 initData를 의존성 배열에 저장,
  // useEffect의 콜백 함수가 실행될 때 initData 참,거짓 여부를 확인하여 setState로 상태를 업데이트
  useEffect(() => {
    if (initData) {
        setState({
            ...initData,
            date: getFormattedDate(new Date(parseInt(initData.date)))
        })
    }
  }, [initData])

  return (
    <div className="Editor">
      <div className="editor_section">
        <h4>오늘의 날짜</h4>
        <div className="input_wrapper">
          <input
            type="date"
            value={state.date}
            onChange={handleChangeDate}
          ></input>
        </div>
      </div>
      <div className="editor_section">
        <h4>오늘의 감정</h4>
        <div className="input_wrapper emotion_list_wrapper">
            {/* map 함수를 이용해 emotionList에 저장된 5개의 이미지 객체렌더링 props의 key로 감정이미지의 id와 프로퍼티 전달,
            마지막으로 현재 배열요소의 id와 state.emotionId가 동일한지 확인작업을 통해 현재 선택된 감정이미지 여부 파악 */}
            {emotionList.map((it) => (
                <EmotionItem key={it.id} {...it} 
                onClick={handleChangeEmotion} 
                isSelected={state.emotionId === it.id} />
            ))}
        </div>
      </div>
      <div className="editor_section">
        <h4>오늘의 일기</h4>
        <div className="input_wrapper">
          <textarea
            placeholder="오늘은 어땠나요?"
            value={state.content}
            onChange={handleChangeContet}
          />
        </div>
      </div>
      <div className="editor_section bottom_section">
        <Button text={"취소하기"} onClick={handleOnGoBack} />
        <Button text={"작성완료"} type={"positive"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Editor;
