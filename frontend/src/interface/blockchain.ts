export interface walletInfoType {
	consumerAddress: string;
	consumerPrivateKey: string;
	shelterAddress: string;
}

export interface registerWalletType {
	address: string;
	privateKey: string;
}

export interface getTransactionListType {
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

export interface transactionInfoType {
	fromAddress: string;
	toAddress: string;
	amount: number;
	privateKey: string;
}