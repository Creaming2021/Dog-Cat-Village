export interface PetBasicType {
  id: number;
  name: string;
  profileImage: string;
  sex: string;
  breedType: string;
}

export interface PetExtraType {
  weight: string;
  breed: string;
  personality: string;
  neuter: string;
  condition: string;
  shelterId: number;
  file?: File;
}

export interface PetListType extends PetBasicType {
  birthday: string;
  age: string;
  shelterName?: string;
  shelterId?: number;
}

export interface PetDetailType extends PetBasicType, PetExtraType {
  birthday: string;
  age: string;
}

export interface PetInputType extends PetBasicType, PetExtraType {
  year: string;
  month: string;
  date: string;
}

export interface PetEditType extends PetBasicType, PetExtraType {
  birthday: string;
}

export interface PetProfileImage {
  file: File;
  petId: number;
}