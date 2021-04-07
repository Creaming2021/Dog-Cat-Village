import { security } from './instance';
import { TransactionAddressRequireType, TransactionAddressType, TransactionListType, WalletType } from '../interface/blockchain';

// 지갑 정보 조회
export const getWalletInfo = async ( memberId:  number ) => {
  const response = await security.get<WalletType>(`members/${memberId}/address`, {
    'headers': {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    },
  });
  return response.data;
}

// 아이디를 주소로 변환
export const changeIdToAddress = async ( { consumerId, shelterId }: TransactionAddressRequireType ) => {
  const response = await security.get<TransactionAddressType>(
    'blockchain/address', 
    {
      'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    },
    'params': { consumerId, shelterId },
  });  
  return response.data;
}

// 지갑 정보 등록
export const setWalletInfo = async ( walletInfo: WalletType ) => {
  const response = await security.post<undefined>(
    'blockchain/address',
    walletInfo,
    {
      'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    }
  });
  return response.data;
}

// 마블 코인 거래 내역 리스트
export const getTransactionList = async ( address: string ) => {
  const response = await security.get<TransactionListType[]>(`blockchain/address/${address}`, {
    'headers': {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    }
  });
  return response.data;
}

// 지갑 충전하기
export const chargeCoin = async ( amount: string ) => {
  const response = await security.get<any>('kakao-pay', {
    'headers': {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    },
    'params': { amount }
  });
  console.log(`axios 요청 응답 : ${response.data}`)  
  window.location.href = response.data.url;
  return response.data;
}