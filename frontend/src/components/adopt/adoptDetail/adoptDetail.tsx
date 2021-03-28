import React from 'react';
import styles from './adoptDetail.module.css'
import commons from '../../common/common.module.css';
import { AdoptDetailType } from '../../../interface/adopt';
import { ButtonSmall, ImageMedium } from '../../common/common';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type AdoptDetailProps = {
	selectedAdopt: AdoptDetailType,
	type: string,
	goToBack: () => void,
	onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

const AdoptDetail = ({ selectedAdopt, type, goToBack, onSubmit }: AdoptDetailProps) => {
	const { adoptId, petId, petName, user, userName, userSex, userAge, 
					userLiveIn, description, day, time, acceptStatus, createdAt } = selectedAdopt;

	return (
	<div className={styles['adopt-detail-container']}>
		<button 
			className={commons['btn-text']} 
			onClick={goToBack}>
				<FontAwesomeIcon
        	icon={faArrowLeft}/> 목록으로</button>
		<div className={styles['user-info-box']}>
			<ImageMedium src={user.imageUrl} alt="프로필 이미지"/>
			{user.name}<br/>{createdAt}
		</div>
		<table className={styles['adopt-info-box']}>
			<tbody>
				<tr>
					<td>신청자 정보</td>
					<td>{userName} / {userSex} / {userAge}살</td>
					<td>신청 동물</td>
					<td>{petName}</td>
				</tr>
				<tr>
					<td>전화번호</td>
					<td>{user.phoneNumber}</td>
					<td>통화하기 편한 요일</td>
					<td>{day}</td>
				</tr>
				<tr>
					<td>이메일</td>
					<td>{user.email}</td>
					<td>통화하기 편한 시간</td>
					<td>{time}</td>
				</tr>
				<tr>
					<td>사시는 지역</td>
					<td colSpan={3}>{userLiveIn}</td>
				</tr>
				<tr>
					<td>입양 신청 사유</td>
					<td colSpan={3}>{description}</td>
				</tr>
			</tbody>
		</table>

		{ acceptStatus === "PENDING"
			&& 
			<div className={styles[`button-box`]}>
				<ButtonSmall 
					content="입양 완료" 
					value="ACCEPTED"
					onClick={onSubmit} 
					buttonColor="bg-blue"/>
				<ButtonSmall 
					content="입양 거절" 
					value="REFUSED"
					onClick={onSubmit} 
					buttonColor="bg-yellow"/>
			</div>}
	</div>);
}

export default AdoptDetail;