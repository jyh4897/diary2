import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된순"}
]

const DiaryList = ({ data }) => {
    const navigate = useNavigate();
    // useState를 호출해서 select option에 따라 state 업데이트가 일어날수 있게
    // 리액트 훅스 state를 설정
    const [sortType, setSortType] = useState("latest");
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        const compare = (a,b) => {
            // 기준이 최신순이라면 명시적 형변환 후 내림차순으로 날짜 객체 기준 정렬
            if (sortType === "latest") {
                return Number(b.date) - Number(a.date);
            }
            else {
                return Number(a.date) - Number(b.date);
            }
        }
        // 데이터의 형식은 json이므로 정렬한 데이터를 해석하여 나열
        // json데이터 해석 후 compare함수를 사용하여 데이터 졍렬하고 그 데이터를 저장
    const copyList = JSON.parse(JSON.stringify(data))
    copyList.sort(compare);
    setSortedData(copyList);
    }, [data, sortType])

    


    // 상태 업데이트 초기 세팅 후 이벤트 핸들러 함수 선언
    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    }
    

    const onClickNew = () => {
        navigate("/new");
    }

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <select value={sortType} onChange={onChangeSortType}>
                        {sortOptionList.map((it,idx) => (
                            <option key={idx} value={it.value}>
                                {it.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="right_col">
                    <Button 
                    type={'positive'} 
                    text={"새일기 쓰기"} 
                    onClick={onClickNew} />
                </div>
            </div>
            <div className="list_wrapper">
                {sortedData.map((it) => (
                    <DiaryItem key={it.id} {...it} />
                ))}
            </div>
        </div>
    );
};

export default DiaryList;