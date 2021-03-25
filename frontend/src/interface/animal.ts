export interface AnimalBasicType {
	id: number;
	name: string;
	imageUrl: string;
	sex: string;
	breedType: string;
}

export interface AnimalExtraType {
	weight: string; 
	breed: string;
	personality: string;
	neuter: string; 
	condition: string;
}

export interface AnimalListType extends AnimalBasicType {
	birthday: string;
	age: string;
}

export interface AnimalDetailType extends AnimalListType, AnimalExtraType {
	shelterId: number;
}

export interface AnimalInputType extends AnimalBasicType, AnimalExtraType {
	year: string;
	month: string;
	date: string;
}

export interface AnimalEditType extends AnimalBasicType, AnimalExtraType {
	birthday: string;
}
