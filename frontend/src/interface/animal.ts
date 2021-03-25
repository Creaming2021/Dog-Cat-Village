export interface AnimalEditType {
	birthday?: string,
	imageUrl: string,
	name: string, 
	breed: string,
	weight: string, 
	year: string,
	month: string,
	day: string,
	breedType: string,
	personality: string,
	condition: string,
	sex: string, 
	neuter: string,
}

export interface AnimalDetailType {
	id: number,
	age: string,
	birthday: string,
	imageUrl: string,
	name: string, 
	breed: string,
	weight: string, 
	breedType: string,
	personality: string,
	condition: string,
	sex: string, 
	neuter: string,
	centerId: number,
	centerName: string,
	adoptStatus: string,
}

export interface AnimalListType {
  id: number;
  name: string;
  imageUrl: string;
  birthday: string;
  age: number;
  sex: string;
}