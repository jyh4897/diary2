// app.js에서 부여한 다이나믹 컨텐츠 라우팅 주소에 대한 컴포넌트 부여

// 데이터가 느리게 로딩이 되면 데이터를 표시하는 헤더와 뷰어섹션이
// 데이터 도착 전에 로딩 되어서는 안 됨
import { useParams, useNavigate } from 'react-router-dom';
import useDiary from "../hooks/useDiary";
import Button from '../components/Button';
import Header from '../components/Header';
import Viewer from '../components/Viewer';
import { getFormattedDate, setPageTitle } from '../util';
import { useEffect } from "react"

const Diary = () => {
    
    const {id} = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const goEdit = () => {
        navigate(`/edit/${id}`);
    }
    useEffect(() => {
        setPageTitle("일기")
    }, []);
    if (!data) {
        return <div>일기 데이터를 불러오고 있습니다</div>
    }
    else {
        const {date, emotionId, content} = data;
        const title = `${getFormattedDate(new Date(Number(date)))} 기록`
        return (
            <div>
                <Header title={title}
                leftChild={<Button text={"<뒤로가기"} onClick={goBack}/>}
                rightChild={<Button text={"수정하기"} onClick={goEdit}/>}
                />
                <div>{id}번 일기</div>
                <div>Diary 페이지</div>
                <Viewer content={content} emotionId={emotionId} />
            </div>
        )
    }   
};

export default Diary;