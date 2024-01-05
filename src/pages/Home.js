// 메인페이지에 이번달 기준 날짜 데이터가 필요
// state의 초기값으로 날짜 객체를 부르는 방법을 통하여 현재 날짜를 초기값으로 전달
// 월별로 일기 데이터를 구분 하려면 date 객체에서 해당 월의 가장 빠른 시간과 가장 늦은 시간의 타임스탬프 값을 구해야 함
import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";
import DiaryList from "../components/DiaryList"
import { useState, useContext, useEffect } from 'react';
import { DiaryStateContext } from "../App";
import { getMonthRangeByDate, setPageTitle } from "../util";


const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);
    const headerTitle = `${pivotDate.getFullYear()}년
                        ${pivotDate.getMonth() + 1}월`;
    useEffect(() => {
      setPageTitle("Home")
      if (data.length >= 1) {
        const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
        setFilteredData(
          data.filter(
            (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
          )
        );
      } else {
        setFilteredData([]);
      }
    }, [data, pivotDate]);
  
    const onIncreaseMonth = () => {
      setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    };
  
    const onDecreaseMonth = () => {
      setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    };
  
    return (
      <div>
        <div>
          <Header
            title={headerTitle}
            leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
            rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
          />
        </div>
        <DiaryList data={filteredData} />
  
      </div>
    );
  };
  export default Home;
