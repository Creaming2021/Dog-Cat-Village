import React, { useState } from 'react';
import Nav from '../../nav/nav';
import FindPassword from '../findPassword/findPassword';
import Join from '../join/join';
import LogIn from '../logIn/logIn';
import Main from '../main/main';

const Control = () => {
    type ViewType = 'main' | 'logIn' | 'join' | 'findPassword';
    
    const [view, setView] = useState<ViewType>('main');
    const [type, setType] = useState<string>('');

    const goToMain = (): void => {
        setView('main');
        setType('');
    }

    const goToLogIn = (type: string): void  => {
        setView('logIn');
        setType(type);
    }

    const goToJoin = (type: string): void  => {
        setView('join');
        setType(type);
    }

    const goToFindPassword = (type: string): void  => {
        setView('findPassword');
        setType(type);
    }

    return (<>
        <Nav name="subMain"/>
        { view === 'main' && 
            <Main
                goToLogIn={goToLogIn}/>}
        { view === 'logIn' && 
            <LogIn 
                type={type}
                goToMain={goToMain}
                goToJoin={goToJoin}
                goToFindPassword={goToFindPassword}/>}
        { view === 'join' && 
            <Join 
                type={type}
                goToLogIn={goToLogIn}/>} 
        { view === 'findPassword' && 
            <FindPassword 
                type={type}
                goToJoin={goToJoin}
                goToLogIn={goToLogIn}/>}
    </>);
}

export default Control;