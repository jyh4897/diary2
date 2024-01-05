// 세종류 버튼을 리액트 컴포넌트로 구현
// 버튼에 표시할 문자열 = text
// 버튼의 색상을 결정 = type
// 버튼 클릭시 발생하는 이벤트핸들러 = onClick
// 버튼에 props로 전달되는 type에 따라 스타일을 다르게
import "./Button.css";

const Button = ({ text, type, onClick }) => {
    // 요소가 positive, neagetive인 배열에서 전달 type에 해당 요소가 있는지 includes 메서드로 확인
    const btnType = ["positive", "negative"].includes(type) ? type : "default";
    // 중괄호 > 복수의 데이터가 들어가는 객체 처리, 대괄호 > 데이터의 배열처리
    // props 통해 넘겨받은 type값을 기준으로 버튼의 이름 지정, 그 데이터처리를 배열로 복수데이터 > 하나의 데이터셋 처리
    return <button className={["Button", `Button_${btnType}`].join(" ")} onClick={onClick}>
        {text}
        </button>
};
// 아무런 type도 props로 전달되지 않을 때를 대비한 케이스 지정
// type 지정이 실패하면 default가 기본값으로 설정됨
Button.defaultProps = {
    type: "defalut", 
}


export default Button;