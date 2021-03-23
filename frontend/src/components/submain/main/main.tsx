import React from 'react';
import { faChild, faHotel } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from './main.module.css';
import commons from '../../common/common.module.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type ImageButtonProps = {
    event: React.MouseEventHandler<HTMLDivElement>,
    text: string,
    icon: IconProp,
    color: string,
}

const ImageButton = ({ event, text, icon, color } : ImageButtonProps ) => {
    return (
        <div className={styles.btn} onClick={event}>
            <div className={`${styles.circle} ${commons[`bg-${color}`]}`}>
                <FontAwesomeIcon className={styles.icon} icon={icon}/>
            </div>
            <div className={commons['text-middle-bold']}>{text}</div>
        </div>
    );
}

type MainProps = {
    goToLogIn: ( type: string ) => void;
};

const Main = ({ goToLogIn } : MainProps ) => {  

    const goToLogInUser = (): void  => {
        goToLogIn("user");
    }

    const goToLogInCenter = (): void  => {
        goToLogIn("center");
    }

    return (
        <div className={`${styles.main} ${commons['bg-gradient-yellow-blue']}`}>
            <div className={styles.box}>
                <div className={commons['text-big']}>
                    명냥이 빌리지에<br/>
                    오신 걸 환영합니다.
                </div>
                <ImageButton 
                    event={goToLogInUser}
                    text="개인으로 시작하기" 
                    icon={faChild} 
                    color="yellow"/>
                <ImageButton 
                    event={goToLogInCenter}
                    text="보호소로 시작하기" 
                    icon={faHotel} 
                    color="blue"/>
                <div className={commons['text-middle-light']}>입장하시려는 계정을 선택해 주세요</div>
            </div>
        </div>
    );
}

export default Main;