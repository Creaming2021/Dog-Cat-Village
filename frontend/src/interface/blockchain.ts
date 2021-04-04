export interface WalletInfoType {
	consumerAddress: string;
	consumerPrivateKey: string;
	shelterAddress: string;
}

export interface RegisterWalletType {
	address: string;
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

export interface TransactionInfoType {
	fromAddress: string;
	toAddress: string;
	amount: number;
	privateKey: string;
}