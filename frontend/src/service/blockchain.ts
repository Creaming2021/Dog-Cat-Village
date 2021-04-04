import { security } from './instance';
import { TransactionListType, RegisterWalletType, TransactionInfoType, WalletInfoType } from '../interface/blockchain';

// 지갑 정보 조회
export const getWalletInfo = async () => {
  const response = await security.get<WalletInfoType>('/blockchain/address', {
    'headers': {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    }
  });
  return response.data;
}

// 지갑 정보 등록
export const setWalletInfo = async ( walletInfo: RegisterWalletType ) => {
  const response = await security.post<undefined>('/blockchain/address', {
    'headers': {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    },
    walletInfo,
  });
  return response.data;
}

// 마블 코인 거래 내역 리스트
export const getTransactionList = async ( address: string ) => {
  const response = await security.get<TransactionListType>(`/blockchain/address/${address}`, {
    'headers': {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    }
  });
  return response.data;
}