export interface AdoptRegisterType {
  petId: number;
  userId: number;
  userName: string;
  userSex: string;
  userAge: string;
  userLiveIn: string;
  description: string;
  day: string;
  time: string;
}

export interface AdoptListType {
  adoptId: number;
  petName: string;
  userName?: string;
  createdAt: string;
  acceptStatus: string;
}

export interface AdoptDetailType {
  adoptId: number;
  petId: number;
  petName: string;
  user: {
    id: number;
    imageUrl: string;
    name: string;
    email: string;
    phoneNumber: string;
  };
  userName: string;
  userSex: string;
  userAge: string;
  userLiveIn: string;
  description: string;
  day: string;
  time: string;
  acceptStatus: string;
  createdAt: string;
}

export interface AdoptChangeStatusType {
  adoptId: string;
  status: string;
}
