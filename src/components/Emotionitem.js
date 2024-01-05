// 감정이미지 선택과 관련된 기능을 구현하기 위한 컴포넌트

import React from "react";
import "./Emotionitem.css"
//함수 EmotionItem은 부모인 editor 컴포넌트에서 props를 통해 5개의 값을 받는다
// id, img, name, onClick, isSelected
const EmotionItem = ({ id, img, name, onClick, isSelected }) => {
    const handleOnClick = () => {
        onClick(id);
    }
    return (
        <div className={["EmotionItem", isSelected ? `EmotionItem_on_${id}` : `EmotionItem_off`].join(" ")}
            onClick={handleOnClick}>
            <img alt={`emotion${id}`} src={img} />
            <span>{name}</span>
        </div>
    )
}

export default React.memo(EmotionItem);

