import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
//앞서 소개한 리액트 라우터를 적용하는 방법 
//실행할 App 스크립트를 <BrowserRouster></BrowserRouster>로 감싸면 된다
//BrowserRouter에는 브라우저의 주소변경을 감지하는 기능 존재
//이 라우터는 컴포넌트가 페이지를 구성하고 이동하는 데에 필요한 기능을 제공
//모바일 어플용은 react-router-native, 웹은 react-router-dom


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

// 컴포넌트
// home : 메인
// new : 쓰기
// diary : 일기 상세 조회
// edit : 수정
