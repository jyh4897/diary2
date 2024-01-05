
import {Routes, Route, Link} from 'react-router-dom'
// routes는 여러 route컴포넌트를 감쌈, 그리고 현재 url 경로에 맞게 적절한 route컴포넌트를 페이지에 렌더링함
import React, { useReducer, useRef, useEffect, useState } from "react";
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';
import './App.css';

// 일기 state값 컴포넌트 그룹에 전달할 context를 만듦
// 이 때 이 컨텍스트를 다른 파일(컴포넌트)에서 불러올 수 있게 export
// context 사용 시 지나친 페이지 리렌더링 이슈를 막기 위한 dispatch도 불러옴
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newState = [action.data, ...state];
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "UPDATE": {
      const newState = state.map((it) => 
      String(it.id) === String(action.data.id) ? {...action.data} : it)
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "DELETE": {
      const newState = state.filter((it) => String(it.id) !== String(action.targetId));
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    default: {
      return state;
    }
  }
}

const mockData = [
  {
    id: "mock1",
    date: new Date().getTime()-1,
    content: "mock1",
    emotionId: 1,
  },
  {
    id: "mock2",
    date: new Date().getTime()-2,
    content: "mock2",
    emotionId: 2,
  },
  {
    id: "mock3",
    date: new Date().getTime()-3,
    content: "mock3",
    emotionId: 3,
  }
]


function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);
  // 함수 onCreate는 사용자가 선택한 날짜, 일기 데이터, 이모티콘 세가지 데이터를 인풋으로 받아서 저장
  // 상단의 함수 dispatch를 호출하여 데이터를 객체 데이터로 저장할 때 타입은 "CREATE"로 한다.

  useEffect(() => {
    // 로컬 스토리지로부터 diary라는 키 값에 저장해둔 데이터를 불러와서 rawData에 저장
    // rawData가 존재하지 않는다면 setIsDataLoaded를 true로 업데이트하고 종료
    // 존재한다면 JSON객체로 복원
    const rawData = localStorage.getItem("diary");
    if (!rawData) {
      setIsDataLoaded(true);
      return;
    }
    const localData = JSON.parse(rawData)
    if (localData.length === 0) {
      setIsDataLoaded(true);
      return;
    }
    // 불러온 일기 데이터를 id기준 내림차순 정렬
    // 따라서 localData[0]이 id 중 가장 큰 값이 됨
    // id의 현재값은 일기 id에서 가장 큰 값에 1 더한 값으로 설정
    localData.sort((a,b) => Number(b.id) - Number(a.id));
    idRef.current = localData[0].id + 1
    dispatch({
      type: "INIT",
      data: localData
    });
    setIsDataLoaded(true);
  }, []);

  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
    idRef.current += 1
  };

  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId
      }
    })
  }
  // 일기 state를 dispatch로 업데이트하는 삭제함수. 변수 targetId로 삭제할 아이디 저장
  // 일기 객체의 타입으로 삭제를 의미하는 delete와 targetId로 삭제할 일기 id를 저장
  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId
    })
  }

  if (!isDataLoaded){
    return <div>데이터를 불러오는 중입니다</div>
  }
  else {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider 
        value={{
          onCreate,
          onUpdate,
          onDelete
        }}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
          </Routes>
        </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}
export default App;


// html5에서는 웹 스토리지 기능을 지원, 최대 5mb 정도의 데이터 저장 가능
// 로컬스토리지: window.localStorage 라는 명령어를 사용해서 웹데이터 저장
// 고유 도메인이 바뀌면 기존 데이터 접속 불가 같은 도메인 주소에서만 데이터 접근 가능(사용자가 직접 지워야 함)
// 데이터 생성/수정하기
// 객체 localStorage에서 setItem 호출해서 key & value 전달
// localStorage.setItem("key", value);
// value가 객체일 때 JSON.stringify 메서드를 사용하여 문자열 데이터로 변환 사용
// localStorage.setItem("key", JSON.stringify(value))
// 원래 객체 상태로 원복하고 싶다면
// const data = JSON.parse(localStorage.getItem("key"))
// 데이터를 지우려면 localStorage.removeItem("key") 



// 세션스토리지: window.SessionStorage라는 명령어로 웹데이터 저장
// 대신 브라우저 종료시 데이터도 증발, 새로고침이 발생해도 멀쩡
// sessionStorage.setIem("key", value);
// sessionStorage.setItem("key", JSON.stringify(value))
// sessionStorage.removeItem("key") 

// 오픈 그래프 태그 : 링크 공유시 섬네일 페이지, 제목, 간단한 설명 등이 노출되는 태그

// firebase > 빌드 - hosting - 시작하기 > npm install -g firebase-tools
// cmd 다시 켜서 firebase login 입력 > 내 컴퓨터와 연결
// firebase init : firebase.json 생성
// npm run build && firebase deploy
// 빌드 - hosting - '다른 사이트 추가' - firebase.json에 site: "설정한 주소" 추가
// 수정이나 오류 픽스가 있다면 npm run build && firebase deploy 재실행
// 오픈 그래프 체크

