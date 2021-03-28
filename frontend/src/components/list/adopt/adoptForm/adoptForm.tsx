import React, { useState } from "react";
import styles from './adoptForm.module.css'
import { AdoptRegisterType } from "../../../../interface/adopt";
import { ButtonSmall } from "../../../common/common";

type AdoptFormProps = {
	onSubmit: (adoptInputForm: AdoptRegisterType) => void,
	onClose: () => void,
};

const AdoptForm = ({ onSubmit, onClose }: AdoptFormProps) => {
	const [adoptInputForm, setAdoptInputForm] = useState<AdoptRegisterType>({
		petId: 1,
		userId: 1,
		userName: '',
		userSex: '',
		userAge: '',
		userLiveIn: '',
		description: '',
		day: '',
		time: '',
	});

	const {
		userName,
		userSex,
		userAge,
		userLiveIn,
		description,
		day,
		time,
	} = adoptInputForm;

	const onChange = (e: any) => {
			const {name, value} = e.target;
			setAdoptInputForm({
					...adoptInputForm,
					[name]:value,
			})
	}

	const onClickSubmit = () => {
		onSubmit(adoptInputForm);
	}

	return (
		<table className={styles['adopt-form-container']}>
			<tbody>
				<tr>
					<td>신청자 성명</td>
					<td colSpan={3}>
						<input
							type="text"
							name="userName"
							value={userName}
							onChange={onChange}
						/>
					</td>
				</tr>
				<tr>
					<td>성별</td>
					<td colSpan={3}>
						<label>
							<input
								type="radio"
								name="userSex"
								value="MALE"
								onChange={onChange}
							/>
							남
						</label>
						<label>
							<input
								type="radio"
								name="userSex"
								value="FEMALE"
								onChange={onChange}
							/>
							여
						</label>
					</td>
				</tr>
				<tr>
					<td>연령</td>
					<td colSpan={3}>
						<input
							name="userAge"
							value={userAge}
							onChange={onChange}
							placeholder="숫자만 입력"
						/>
					</td>
				</tr>
				<tr>
					<td>통화하기 편한 요일</td>
					<td>
						<input name="day" value={day} onChange={onChange} />
					</td>
					<td>통화하기 편한 시간</td>
					<td>
						<input name="time" value={time} onChange={onChange} />
					</td>
				</tr> 
				<tr>
					<td>사시는 지역</td>
					<td colSpan={3}>
						<input
							type="text"
							name="userLiveIn"
							value={userLiveIn}
							onChange={onChange}
							placeholder="서울, 경기 등등 정도만 입력하시면 됩니다."
						/>
					</td>
				</tr>
				<tr>
					<td>입양 신청 사유</td>
					<td colSpan={3}>
						<textarea
							name="description"
							value={description}
							onChange={onChange}
						/>
					</td>
				</tr>
				<tr>
					<td colSpan={4}>
						<ButtonSmall 
							content="신청 완료" 
							onClick={onClickSubmit} 
							buttonColor="bg-blue"/>
						<ButtonSmall 
							content="신청 취소" 
							onClick={onClose} 
							buttonColor="bg-yellow"/>
					</td>
				</tr>
			</tbody>
		</table>
  );
};

export default AdoptForm;
