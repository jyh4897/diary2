import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import { setPageTitle } from "../util"

// "작성완료" 버튼 누르면 일기 데이터 추가되어야 함
// App 함수의 onCreate 추가를 위해 DiaryDispatchContext 호출

const New = () => {
    useEffect(() => {
        setPageTitle("새일기")
    }, []);
    // 중괄호의 이유는 일기 데이터의 구조가 json파일 형식의 객체 데이터 형태이기 때문
    const { onCreate } = useContext(DiaryDispatchContext);
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    const onSubmit = (data) => {
        const { date, content, emotionId } = data;
        onCreate(date, content, emotionId);
        navigate("/", {replace: true})
    }
    return (
        <div>
            <Header 
                title={"새 일기 쓰기"}
                leftChild={<Button text={"<뒤로가기"} onClick={goBack}/>} />
            <Editor onSubmit={onSubmit}/>
        </div>
    )
};

export default New;