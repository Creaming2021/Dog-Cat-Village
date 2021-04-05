export interface ShelterInfoType {
  id: number;
  introduce: string;
  siteUrl: string;
}

export interface ModifyShelterInfoType {
	shelterId: number;
	introduce: string;
	siteUrl: string;
}

export interface DonatedShelterType {
	profileImage: string;
	name: string;
	time: string;
	value: number;
}