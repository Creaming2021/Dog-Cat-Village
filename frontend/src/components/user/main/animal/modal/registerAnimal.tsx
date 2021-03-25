import React, { useEffect, useState } from 'react';
import { ButtonSmall, Select, selectType, optionType } from '../../../../common/common';
import styles from './registerAnimal.module.css';
import commons from '../../../../common/common.module.css';
import { AnimalRegisterType } from '../../../../../interface/animal';

type RegisterAnimalFormProps = {
	onCancle: () => void,
	onSubmit: () => void,
}

const RegisterAnimalForm = ({ onSubmit, onCancle }: RegisterAnimalFormProps) => {
	const initialRegisterState : AnimalRegisterType = {
		imageUrl: '',
		name: '', 
		breed: '',
		weight: '', 
		year: "생년",
		month: "월",
		day: "일",
		breedType: 'dog',
		personality: '',
		condition: '',
		sex: '', 
		neuter: ''
	};

	const [registerInput, setRegisterInput] = useState(initialRegisterState);
	const [birthday, setBirthday] = useState<selectType[]>([]);

	const typeList: selectType = {
		name: "breedType", options: [
			{ value: "dog", option: "개" },
			{ value: "cat", option: "고양이" },
			{ value: "etc", option: "기타" }]
	}

	const year: optionType[] = [{ value: "0", option: "생년" }];
	const month: optionType[] = [{ value: "0", option: "월" }];
	const day:optionType[] = [{ value: "0", option: "일" }];

	useEffect(() => {
		for(let i: number = 2021; i >= 1980; i--){
			year.push({ value: i.toString(), option: i.toString()+'년' });
		}

		for(let i: number = 1; i <= 12; i++){
			month.push({ value: i.toString(), option: i.toString()+'월' });
		}

		for(let i: number = 1; i <= 31; i++){
			day.push({ value: i.toString(), option: i.toString()+'일' });
		}
		
		setBirthday(birthday.concat({name: 'year', options: year})
												.concat({name: 'month', options: month})
												.concat({name: 'day', options: day}));
	}, []);

	const onChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
		
    setRegisterInput({
      ...registerInput,
      [name]: value,
    });
  }
	
	const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) 
			setRegisterInput({
				...registerInput,
				imageUrl: URL.createObjectURL(e.target.files[0]),
			});
  };

	return (
	<table className={styles['register-animal-form-container']}>
		<tr>
			<td rowSpan={9}>
				<img 
					src={registerInput.imageUrl} 
					alt="파일을 업로드하세요"
					className={styles.image}/>
			</td>
			<td>
				<label htmlFor="img-file" className={commons['btn-text']}>
          동물 사진 업로드
        </label>
				<input 
          type="file" 
					id="img-file" 
					className={styles['image-upload-tag']} 
          onChange={onChangeImage}/>
			</td>
		</tr>
		<tr>
			<td>
				<input 
					name="name" 
					value={registerInput.name}
					onChange={onChange} 
					placeholder="이름"/>
				<label><input 
					type="radio" 
					name="sex" 
					value="MALE" 
					onChange={onChange}/> 남</label>
				<label><input 
					type="radio" 
					name="sex" 
					value="FEMALE"
					onChange={onChange}/> 여</label>
			</td>
		</tr>
		<tr>
			<td>
				<Select
					select= {typeList}
					index={0}
					selectValue={[registerInput.breedType]}
					onChange={onChange}/>
				<input 
					name="breed" 
					value={registerInput.breed} 
					onChange={onChange} 
					placeholder="품종"/>
			</td>
		</tr>
		<tr>
			<td>
				<Select
					select={birthday[0]}
					index={0}
					selectValue={[registerInput.year]}
					onChange={onChange}/>
				<Select
					select={birthday[1]}
					index={0}
					selectValue={[registerInput.month]}
					onChange={onChange}/>
				<Select
					select={birthday[2]}
					index={0}
					selectValue={[registerInput.day]}
					onChange={onChange}/>
			</td>
		</tr>
		<tr>
			<td>
				<input 
					name="weight" 
					value={registerInput.weight} 
					onChange={onChange} 
					placeholder="몸무게"/>kg
			</td>
		</tr>
		<tr>
			<td>
				<input 
					name="personality" 
					value={registerInput.personality} 
					onChange={onChange} 
					placeholder="성격"/>
			</td>
		</tr>
		<tr>
			<td>
			중성화
				<label><input 
					type="radio" 
					onChange={onChange} 
					name="neuter" 
					value="YES"/> 함</label>
				<label><input 
					type="radio" 
					onChange={onChange} 
					name="neuter" 
					value="NO"/> 안함</label>
				<label><input 
					type="radio" 
					onChange={onChange} 
					name="neuter" 
					value="PLAN"/> 수술 예정</label>
			</td>
		</tr>
		<tr>
			<td>
				<input 
					name="condition" 
					value={registerInput.condition} 
					onChange={onChange}
					placeholder="건강상태"/>
			</td>
		</tr>
		<tr>
			<ButtonSmall 
				content="등록" 
				onClick={onSubmit} 
				buttonColor="bg-blue"/>
			<ButtonSmall 
				content="취소" 
				onClick={onCancle} 
				buttonColor="bg-yellow"/>
		</tr>
	</table>);
}

export default RegisterAnimalForm;