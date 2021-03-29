export interface AdoptRegisterType {
	petId: number;
	name: string;
	sex: string;
	age: string;
	address: string;
	description: string;
	day: string;
	time: string; 
}

export interface ShelterAdoptListType {
  id: number;
  petName: string;
  name: string;
  createdDate: string;
  acceptStatus: string;
}

export interface ConsumerAdoptListType {
  id: number;
  petName: string;
  createdDate: string;
  acceptStatus: string;
}

export interface AdoptDetailType {
	id: number;
	petId: number;
	petName: string;
	consumer: {
					id: number;
					profileImage: string;
					name: string;
					email: string;
					phoneNumber: string;
	};
	name: string;
	sex: string;
	age: string;
	address: string;
	description: string;
	day: string;
	time: string; 
	acceptStatus: string;
	createdDate: string;
}

export interface AdoptChangeStatusType {
  status: string;
}
