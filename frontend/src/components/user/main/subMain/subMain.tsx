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
    type CategoryType = 'home' | 'notice' | 'board' | 'animal' | 'chatting' | 'donation';  
    
    const [category, setCategory] = useState<CategoryType>('home');

    const onChangeCategory = (category: CategoryType): void => {
        setCategory(category);
    }

    return (
    <div className={styles['sub-main']}>
        <Nav/>
        <MainCategory
            onChangeCategory={onChangeCategory}/>
        {category === 'home' &&
            <Home type='user'/>}
        {category === 'notice' &&
            <Notice/>}
        {category === 'board' &&
            <Board/>}
        {category === 'animal' &&
            <Animal/>}
        {category === 'chatting' &&
            <Chatting/>}
        {category === 'donation' &&
            <Donation/>}
    </div>);
}

export default SubMain;