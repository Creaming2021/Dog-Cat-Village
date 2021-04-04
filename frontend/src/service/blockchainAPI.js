import axios from 'axios';
import Web3 from "web3";

const PROJECT_ID = "f8bb83919afd48fe855f54e33595a3ec";
const MABL_ADDRESS = "0xA9e4f0d5332b26C9B323cC299604D001dA25db1B";
const PRIVKEY =
  "cf61f430c051df6dc8d650d7a65c95a15b6a1a1df685785e3d75096964836585";
const CONTRACT_ADDRESS = "0x0B21843cdf103F67a513c001e02606ba2384a650";
const API_KEY = '6QMEM9F74YBT8WM8E1I8W5XGE4G7GT824M';

// 계정 생성
export const createAccount = () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://ropsten.infura.io/v3/${PROJECT_ID}`
    )
  );

  const newAccount = web3.eth.accounts.create("test");
  console.log("생성된 계정", newAccount); // address, privateKey
  return newAccount;
};