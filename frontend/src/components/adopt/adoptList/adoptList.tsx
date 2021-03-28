import React, { useState } from 'react';
import styles from './adoptList.module.css';
import { AdoptListType } from '../../../interface/adopt';

type AdoptListFormProps = {
	adopt: AdoptListType,
	type: string,
}

const AdoptListForm = ({ adopt, type }: AdoptListFormProps) => {
	const { adoptId, petName, userName, createdAt, acceptStatus } = adopt;
	
	return (
	<tr>
		<td>{adoptId}</td>
		<td>{acceptStatus}/{petName}</td>
		{type === 'shelter' && <td>{userName}</td>}
		<td>{createdAt}</td>
	</tr>
	);
}

type AdoptListProps = {
	adoptList: AdoptListType[],
	type: string,
}

const AdoptList = ({ adoptList, type }: AdoptListProps) => {


	return (<>
	<table className={styles['adopt-list-container']}>
		<thead className={styles['list-header']}>
			<tr>
				<th>No</th>
				<th>Animal Name</th>
				{type === 'shelter' && <th>User Name</th>}
				<th>Date</th>
			</tr>
		</thead>
		<tbody>
			{ adoptList.map((adopt) => 
				<AdoptListForm 
					key={adopt.adoptId}
					adopt={adopt} 
					type={type}/>
			)}
		</tbody>
	</table>
	</>);
}

export default AdoptList;