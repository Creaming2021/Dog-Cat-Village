export interface WalletType {
	contractAddress: string;
	privateKey: string;
}

export interface TransactionListType {
	contractAddress: string,
	fromId: number,
	fromName: string,
	fromProfileImage: string,
	time: string,
	toId: number,
	toName: string,
	toProfileImage: string,
	value: number
}

export interface TransactionAddressRequireType {
	consumerId: number,
	shelterId: number,
}

export interface TransactionAddressType {
	consumerAddress: string;
	consumerPrivateKet: string;
	shelterAddress: string;
}

export interface TranscationFilteredListType{
	id: number,
	img: string,
	amount: number,
	transaction: string,
	date: string
}