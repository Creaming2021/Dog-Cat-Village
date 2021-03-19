import React, { useState } from 'react';
import styles from './animal.module.css';
import commons from '../../../common/common.module.css';
import { faMars, faVenus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SearchProps = {
}

const Search = ({}: SearchProps) => {
    return(
    <div className={styles.search}>
        <select className={`${styles.input}`}>
            <option>모두</option>
            <option>개</option>
            <option>고양이</option>
            <option>그 외</option>
        </select>
        <input className={`${commons['input-medium']} ${styles.input}`} 
            placeholder="동물 이름"/>
        <FontAwesomeIcon className={styles.icon} icon={faSearch}/>
    </div>);
}

type ListProps = {
    animalList: AnimalCardProps[]
}

const List = ({ animalList }: ListProps) => {
    return(<div className={styles.list}>
        { animalList.map((animal: AnimalCardProps) => (
            <AnimalCard
                key={animal.id}
                id={animal.id}
                imageUrl={animal.imageUrl}
                name={animal.name}
                birthday={animal.birthday}
                age={animal.age}
                sex={animal.sex} />
        ))}
    </div>);
}

type AnimalCardProps = {
    id: number,
    imageUrl: string,
    name: string,
    birthday: string,
    age: number,
    sex: string,
}

const AnimalCard = ({ imageUrl, name, birthday, age, sex }: AnimalCardProps) => {
    return(
    <div className={styles.card}>
        <img src={imageUrl}/>
        <div className={styles['card-hover']}>
            <div className={styles.name}>{name}</div>
            <div className={styles.age}>{age} 살 / 
                { sex === '여'
                ? <FontAwesomeIcon icon={faVenus}/> 
                : <FontAwesomeIcon icon={faMars}/>}</div>
            <div className={styles.birthday}>{birthday}</div>
        </div>
    </div>);
}

type AnimalProps = {
    type: string;
}

const Animal = ({ type }: AnimalProps) => {
    const animalList: AnimalCardProps[] = [
        {
            id: 1,
            imageUrl: 'https://i.pinimg.com/originals/87/97/b8/8797b830f3d85fdb96f6ad87ef9fc4fe.jpg',
            name: '뽀삐',
            birthday: '2021.02.01',
            age: 1,
            sex: '여',
        },
        {
            id: 2,
            imageUrl: 'https://blog.hmgjournal.com/images/contents/article/201603211108-Reissue-pet-family-01.jpg',
            name: '뽀빠이',
            birthday: '2021.02.01',
            age: 1,
            sex: '남',
        },
        {
            id: 3,
            imageUrl: 'http://img.insight.co.kr/static/2018/09/12/700/z7n04ul8ig3y27w6l6ok.jpg',
            name: '뽀삐',
            birthday: '2021.02.01',
            age: 1,
            sex: '여',
        },
        {
            id: 4,
            imageUrl: 'http://c.files.bbci.co.uk/AD6E/production/_104889344_kitten.jpg',
            name: '뽀삐',
            birthday: '2021.02.01',
            age: 1,
            sex: '여',
        },
        {
            id: 5,
            imageUrl: 'https://images.mypetlife.co.kr/content/uploads/2019/09/04222847/dog-panting-1024x683.jpg',
            name: '뽀삐',
            birthday: '2021.02.01',
            age: 1,
            sex: '여',
        },
        {
            id: 6,
            imageUrl: 'https://lh3.googleusercontent.com/proxy/O8go5-U9W1BJ6LYwMxMRfC8SAEDqQkVfunlsfGKEeQ5vMk_Fv6MJ2xycDJbCW2jwAHV6bg1Fu2_e6xiPaGG0ymUGZx55HiSI8hqbcsrRLikzsBOq5VOYuM1H3fk-U2A5dvMXJYwLkYrV7dL9ZgzS_Szw2l7IL7K8TutM2Uvs5yu0rfKjnWf2jWUKgAL0stdcDqcHJoFjpzhZyzlRAko5FYr2zfaQOXcgUnvMqmbmTmB3oHXBg3nShg4mZcYSE0q4nYpeSq3A2vuZ4VmUAyFbk4W3ZTmCwcXXPTKethn9RIr5D80AzfgNXCVy9tYT5BXd1eTOcdwtVbf1xOofjarP3_6tvx9fUYClhsTaE_q-FWHw9Q',
            name: '뽀삐',
            birthday: '2021.02.01',
            age: 1,
            sex: '여',
        },
    ]

    return (
    <div className={styles.animal}>
        { type === 'center' &&
            <button className={`${styles['btn-manage']}`}>
                동물 관리 하기</button>}
        <Search />
        <List animalList={animalList}/>
    </div>);
}

export default Animal;