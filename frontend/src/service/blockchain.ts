import { security } from './instance';
import { TransactionAddressRequireType, TransactionAddressType, TransactionListType, WalletType } from '../interface/blockchain';

// 지갑 정보 조회
export const getWalletInfo = async ( memberId: string ) => {
  const response = await security.get<WalletType>('/blockchain/address', {
    'headers': {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    },
  });
  return response.data;
}


// 아이디를 주소로 변환
export const changeIdToAddress = async ( { consumerId, shelterId }: TransactionAddressRequireType ) => {
  const response = await security.get<TransactionAddressType>(
    '/blockchain/address', 
    {
      'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      'params': { consumerId, shelterId },
    }
  });
  return response.data;
}

// 지갑 정보 등록
export const setWalletInfo = async ( walletInfo: WalletType ) => {
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