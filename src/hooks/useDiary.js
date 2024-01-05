// 데이터 등을 새로운 페이지로 이동시킬 때 useNavigate 리액트 훅을 사용하면 쉬움
// but 리액트 훅은 페이지 구성요소인 '컴포넌트'에서만 사용 가능
// 앱 내 일반함수에서는 기능을 이용하지 못한다는 제약사항 때문에 커스텀훅 useDiary 생성
// 커스텀훅 useDiary를 만듦. 직접 프로그래밍한 함수가 리액트 훅스라는 것을 나타내기 위해 use를 붙임
// 고유데이터를 구분하는 id를 인풋값으로 받음

// useDiary 함수를 통해 일기 데이터를 불러오는 기능 구현
// useContext를 통해 전체 읽기데이터를 불러온 후 데이터 페이지 이동 처리
// home화면으로 사용자를 리다이렉트하는 기능 



import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App"
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
    const data = useContext(DiaryStateContext);
    const [diary, setDiary] = useState();
    const navigate = useNavigate();
    // useEffect를 이용해 id나 data 값이 바뀔 때마다 일기 데이터에서 id 값과 일치하는 일기를 찾아
    // 해당 일기 데이터를 업데이트
    useEffect(() => {
        const matchDiary = data.find((it) => String(it.id) === String(id));
        if (matchDiary) {
            setDiary(matchDiary)
        }
        else {
            alert("일기데이터가 존재하지 않습니다")
            navigate("/", {replace: true});
        }
    }, [id, data])

    return diary;
}

export default useDiary;