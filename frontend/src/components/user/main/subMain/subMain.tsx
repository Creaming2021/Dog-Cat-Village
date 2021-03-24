import React, { useState } from 'react';
import Nav from '../../../nav/nav';
import Animal from '../animal/animal';
import Board from '../board/board';
import Chatting from '../chatting/chatting';
import Donation from '../donation/donation';
import Home from '../home/home';
import MainCategory from '../mainCategory/mainCategory';
import Notice from '../notice/notice';
import styles from './subMain.module.css';

const SubMain = () => {    
    const [category, setCategory] = useState<string>('animal');

    const onChangeCategory = (category: string): void => {
        setCategory(category);
    }

    const userInfo = {
        name: "동렬 아저씨의 동물 농장",
        imageUrl: "https://img2.sbs.co.kr/img/sbs_cms/WE/2020/07/10/WE61973057_ori.jpg",
        siteUrl: "www.naver.com",
        phoneNumber: "01012345678",
        email: "ssafy@ssafy.com",
        introduction: "안녕하세요 동아동입니다~ 많은 관심과 후원 감사합니다! 하는 등의 소개글"
    }

    return (
    <div className={styles['sub-main']}>
        <Nav name="centerMainPage"/>
        <MainCategory
            userInfo={userInfo}
            onChangeCategory={onChangeCategory}/>
        {category === 'home' &&
            <Home type='user'/>}
        {category === 'animal' &&
            <Animal type='center'/>}
        {category === 'chatting' &&
            <Chatting/>}
        {category === 'donation' &&
            <Donation/>}
    </div>);
}

export default SubMain;