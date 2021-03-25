import React, { useState } from 'react';
import { ButtonSmall } from '../../../../common/common';
import styles from './animalModal.module.css';

type RegisterAnimalFormProps = {
	onClose: () => void,
}

export const RegisterAnimalForm = ({ onClose }: RegisterAnimalFormProps) => {
	const [imageUrl, setImageUrl] = useState('');

	const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

	return (
	<table className={styles['register-animal-form-container']}>
		<tr>
			<td rowSpan={9}>
				<img src={imageUrl} alt="파일을 업로드하세요"
					className={styles.image}/>
			</td>
			<td>
				<label htmlFor="img-file" className={styles['image-upload-btn']}>
          동물 사진 업로드
        </label>
				<input 
          type="file" id="img-file" className={styles['image-upload-tag']} 
          onChange={handleChangeImg}/>
			</td>
		</tr>
		<tr>
			<td>
				<input placeholder="이름"/>
			</td>
		</tr>
		<tr>
			<td>
				<input type="checkbox" name="sex" value="male"/> 남
				<input type="checkbox" name="sex" value="male"/> 여
			</td>
		</tr>
		<tr>
			<td>
				<select name="type">
					<option value="dog">개</option>
					<option value="cat">고양이</option>
					<option value="etc">기타</option>
				</select>
				<input name="breed" placeholder="품종"/>
			</td>
		</tr>
		<tr>
			<td>
				생일
				<select name="year">
					<option value="dog">개</option>
					<option value="cat">고양이</option>
					<option value="etc">기타</option>
				</select>
				<select name="month">
					<option value="01">01</option>
					<option value="02">02</option>
					<option value="03">03</option>
				</select>
				<select name="day">
					<option value="dog">개</option>
					<option value="cat">고양이</option>
					<option value="etc">기타</option>
				</select>
			</td>
		</tr>
		<tr>
			<td>
				<input placeholder="몸무게"/>
				중성화
				<input type="checkbox" name="" value=""/> 함
				<input type="checkbox" name="" value=""/> 안함
				<input type="checkbox" name="" value=""/> 수술 예정
			</td>
		</tr>
		<tr>
			<td>
				<input placeholder="성격"/>
			</td>
		</tr>
		<tr>
			<td>
				<input placeholder="건강상태"/>
			</td>
		</tr>
		<tr>
			<ButtonSmall 
				content="등록" 
				onClick={onClose} 
				buttonColor="bg-blue"/>
			<ButtonSmall 
				content="취소" 
				onClick={onClose} 
				buttonColor="bg-yellow"/>
		</tr>
	</table>);
}