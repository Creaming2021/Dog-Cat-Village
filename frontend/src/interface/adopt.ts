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

export interface AdoptListType {
  id: number;
  petName: string;
  name?: string;
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
  id: number;
  adoptId: number;
}

export interface AdoptRegisterRequestType{
  id: number,
  adoptRegisterForm: AdoptRegisterType
}

export interface GetAdoptDetailRequestType{
  id: number,
  adoptId: number,
}