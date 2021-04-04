export interface ShelterInfoType {
  id: number;
  introduce: string;
  name: string;
  phoneNumber: string;
  siteUrl: string;
}

export interface ModifyShelterInfoType{
	shelterId: number;
	introduce: string;
	siteUrl: string;
}