import React from 'react';
import styles from './myPage.module.css';

function MyPage() {
  const [userType, setUserType] = useState('user');

  return (
    <div className={`${styles.logIn} ${type === 'user' ? styles.user : styles.shelter}`}>

    </div>
  );
};

export default MyPage;
