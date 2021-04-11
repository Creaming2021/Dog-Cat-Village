import Web3 from "web3";
import abiArray from "./mycoin.json";

const PROJECT_ID = "f8bb83919afd48fe855f54e33595a3ec";
const CONTRACT_ADDRESS = "0x0B21843cdf103F67a513c001e02606ba2384a650";
const API_KEY = '6QMEM9F74YBT8WM8E1I8W5XGE4G7GT824M';
const MABL_ADDRESS = "0xA9e4f0d5332b26C9B323cC299604D001dA25db1B";
const PRIVKEY =
  "cf61f430c051df6dc8d650d7a65c95a15b6a1a1df685785e3d75096964836585";

// 계정 생성
export const createAccount = () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://ropsten.infura.io/v3/${PROJECT_ID}`
    )
  );

  const newAccount = web3.eth.accounts.create("test");
  // console.log("생성된 계정", newAccount); // address, privateKey
  return newAccount;
};

// 코인 잔액 조회
export const getTokenBalance = async (address) => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://ropsten.infura.io/v3/${PROJECT_ID}`
    )
  );

  const contract = new web3.eth.Contract(abiArray, CONTRACT_ADDRESS);

  let tokenBalance = 0;

  await contract.methods.balanceOf(address).call()
  .then(result => {
      tokenBalance = result / 100000;
  });

  // console.log(address, tokenBalance);

  return tokenBalance;
};

// 이더 주는 거
export const sendTransaction = ({ toAddress }) => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://ropsten.infura.io/v3/${PROJECT_ID}`
    )
  );

  var Tx = require('ethereumjs-tx').Transaction;

  web3.eth.getTransactionCount(MABL_ADDRESS, (err, txCount) => {
    const rawTx = {
      nonce: web3.utils.toHex(txCount),
      value: '0x2386f26fc10000',
      to: toAddress,
      gasLimit: web3.utils.toHex(1000000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
    };
    
    // console.log('data : ', rawTx.data);
    
    // tx 만들어 주실때 chain : ropsten 해주시고
    var tx = new Tx(rawTx, { chain: 'ropsten' });
    const privateKeyBuffer = Buffer.from(PRIVKEY, 'hex');

    // 트랜잭션 서명 해주시고
    tx.sign(privateKeyBuffer);
    if (tx.verifySignature()) {
      // console.log('서명 완료!');
      // console.log(
      //   '서명에서 추적한 발신자 주소: ',
      //   tx.getSenderAddress().toString('hex')
      // );
    }

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');
        
    // 보내주시고 돌아오는거 로그에 찍고 좀 기다리면 롭슨으로 바로 확인가능합니다.!
    // 가스비가 작아서 그런가 좀 늦게 되는 감이있네요 
    web3.eth
      .sendSignedTransaction(raw)
      .once('transactionHash', (hash) => {
        // console.info(
        //   'transactionHash',
        //   'https://ropsten.etherscan.io/tx/' + hash
        // );
      })
      .once('receipt', (receipt) => {
        // console.info('receipt', receipt);
      })
      .on('error', console.error);
  });
};

// 관리자가 충전 하는 유저한테 주는거
export const chargeTransaction = ({ toAddress, amount }) => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://ropsten.infura.io/v3/${PROJECT_ID}`
    )
  );

  const marbleContract = new web3.eth.Contract(abiArray, CONTRACT_ADDRESS, {
    from: toAddress,
  });

  const cost = web3.utils.toHex(amount * 100000);

  var Tx = require('ethereumjs-tx').Transaction;

  web3.eth.getTransactionCount(MABL_ADDRESS, (err, txCount) => {
    const rawTx = {
      from: MABL_ADDRESS,
      nonce: web3.utils.toHex(txCount),
      value: '0x0',
      to: CONTRACT_ADDRESS,
      gasLimit: web3.utils.toHex(210000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
      // 여기가 중요!! 위에서 만든 DBC컨트렉트의 주소로 보내야함 
      data: marbleContract.methods
      .transfer(toAddress, cost)
      .encodeABI(),
    };
    
    // console.log('data : ', rawTx.data);
    
    // tx 만들어 주실때 chain : ropsten 해주시고
    var tx = new Tx(rawTx, { chain: 'ropsten' });
    const privateKeyBuffer = Buffer.from(PRIVKEY, 'hex');

    // 트랜잭션 서명 해주시고
    tx.sign(privateKeyBuffer);
    if (tx.verifySignature()) {
      // console.log('서명 완료!');
      // console.log(
      //   '서명에서 추적한 발신자 주소: ',
      //   tx.getSenderAddress().toString('hex')
      // );
    }

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');
        
    // 보내주시고 돌아오는거 로그에 찍고 좀 기다리면 롭슨으로 바로 확인가능합니다.!
    // 가스비가 작아서 그런가 좀 늦게 되는 감이있네요 
    web3.eth
      .sendSignedTransaction(raw)
      .once('transactionHash', (hash) => {
        // console.info(
        //   'transactionHash',
        //   'https://ropsten.etherscan.io/tx/' + hash
        // );
      })
      .once('receipt', (receipt) => {
        // console.info('receipt', receipt);
      })
      .on('error', console.error);
  });
};

// 유저가 보호소한테 주는거
export const donateTransaction = ({ toAddress, amount, fromAddress, fromPrivateKey }) => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://ropsten.infura.io/v3/${PROJECT_ID}`
    )
  );

  const marbleContract = new web3.eth.Contract(abiArray, CONTRACT_ADDRESS, {
    from: toAddress,
  });

  const cost = web3.utils.toHex(amount * 100000);

  var Tx = require('ethereumjs-tx').Transaction;

  web3.eth.getTransactionCount(fromAddress, (err, txCount) => {
    const rawTx = {
      from: fromAddress,
      nonce: web3.utils.toHex(txCount),
      value: '0x0',
      to: CONTRACT_ADDRESS,
      gasLimit: web3.utils.toHex(210000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
      // 여기가 중요!! 위에서 만든 DBC컨트렉트의 주소로 보내야함 
      data: marbleContract.methods
      .transfer(toAddress, cost)
      .encodeABI(),
    };
    
    // console.log('data : ', rawTx.data);
    
    // tx 만들어 주실때 chain : ropsten 해주시고
    var tx = new Tx(rawTx, { chain: 'ropsten' });
    const privateKeyBuffer = Buffer.from(fromPrivateKey, 'hex');

    // 트랜잭션 서명 해주시고
    tx.sign(privateKeyBuffer);
    if (tx.verifySignature()) {
      // console.log('서명 완료!');
      // console.log(
      //   '서명에서 추적한 발신자 주소: ',
      //   tx.getSenderAddress().toString('hex')
      // );
    }

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');
        
    // 보내주시고 돌아오는거 로그에 찍고 좀 기다리면 롭슨으로 바로 확인가능합니다.!
    // 가스비가 작아서 그런가 좀 늦게 되는 감이있네요 
    web3.eth
      .sendSignedTransaction(raw)
      .once('transactionHash', (hash) => {
        // console.info(
        //   'transactionHash',
        //   'https://ropsten.etherscan.io/tx/' + hash
        // );
      })
      .once('receipt', (receipt) => {
        // console.info('receipt', receipt);
      })
      .on('error', console.error);
  });
};