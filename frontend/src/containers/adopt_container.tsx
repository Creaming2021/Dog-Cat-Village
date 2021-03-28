import React, { useState } from 'react';
import AdoptList from '../components/adopt/adoptList/adoptList';
import { Search } from '../components/common/common';
import Animal from '../components/user/main/animal/animal';
import { AdoptListType } from '../interface/adopt';

const AdoptContainer = () => {
	const adoptList : AdoptListType[] = [
		{
			adoptId: 1,
			petName: "petname",
			userName: "username",
			createdAt: "2021.03.02",
			acceptStatus: "ACCEPTED"
		},
		{
			adoptId: 2,
			petName: "petname",
			userName: "username",
			createdAt: "2021.03.02",
			acceptStatus: "PENDING"
		},
		{
			adoptId: 3,
			petName: "petname",
			userName: "username",
			createdAt: "2021.03.02",
			acceptStatus: "REFUSED"
		},
		{
			adoptId: 4,
			petName: "petname",
			userName: "username",
			createdAt: "2021.03.02",
			acceptStatus: "ACCEPTED"
		}
	];

	const [searchInput, setSearchInput] = useState({ adopt: '', type: 'member', input: ''});
	const [resultAdoptList, setResultAdoptList] = useState<AdoptListType[]>(adoptList);
	
	const onChange = (e: React.ChangeEvent<HTMLSelectElement> 
										| React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;

		setSearchInput({
			...searchInput,
			[name]: value,
		})
	}

	const onSearch = ()=> {
		if(searchInput.type === 'member'){

			setResultAdoptList(
				adoptList.filter(adopt =>
					adopt.acceptStatus.includes(searchInput.adopt)
					&& (adopt.userName && adopt.userName.includes(searchInput.input)))
				);
		}else if(searchInput.type === 'pet'){

			setResultAdoptList(
				adoptList.filter(adopt =>
					adopt.acceptStatus.includes(searchInput.adopt)
					&& adopt.petName.includes(searchInput.input))
				);
		}
	}

	const selectList = [
		{
      name: "adopt", options: [
        { value: "", option: "모두" },
        { value: "ACCEPTED", option: "입양 완료" },
        { value: "PENDING", option: "진행 중" },
        { value: "REFUSED", option: "입양 거절" }
			]
    },
		{ 
      name: "type", options: [
        { value: "member", option: "유저" },
        { value: "pet", option: "동물" },
			]
    }
	];

	return (<>
		<Search
			selectList={selectList}
			selectValue={[searchInput.adopt, searchInput.type]}
			inputName="input"
			inputValue={searchInput.input}
			onSearch={onSearch}
			onChange={onChange}
			placeholder="검색어"
			inputSize="input-medium"/>
	
		<AdoptList adoptList={resultAdoptList} type="shelter"/>
	</>);
}

export default AdoptContainer;