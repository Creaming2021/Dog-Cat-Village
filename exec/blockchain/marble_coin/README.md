## OpenZeppelin을 활용한 ERC20 토큰 발행하기

[OpenZeppelin을 활용한 ERC20 토큰 발행하기](https://medium.com/@yangga0070/openzeppelin%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%9C-erc20-%ED%86%A0%ED%81%B0-%EB%B0%9C%ED%96%89%ED%95%98%EA%B8%B0-68a143337e50)

- 최초 실행
```
npm install
```

- @truffle/hdwallet-provider

```
npm install @truffle/hdwallet-provider
```

- 컴파일 및 배포

```
truffle compile
truffle migrate
```

- truffle console을 사용한 테스트

```
truffle console

// 발행된 토큰 확인
truffle(develop)> let instance = await MarbleCoin.deployed()
truffle(develop)> instance.totalSupply()
<BN: 71afd498cfff6>

truffle(develop)> let accounts = await web3.eth.getAccounts()
truffle(develop)> instance.balanceOf(accounts[0])
<BN: 71afd498cfff6>
```

### ropsten 테스트넷에 배포

```
truffle migrate --network ropsten --reset
```

### MarbleCoin(MABL) smart contract address

```json
0x0B21843cdf103F67a513c001e02606ba2384a650
```

- ropsten 테스트넷 이더스캔

    [](https://ropsten.etherscan.io/)

- 참고사이트

[[Inflearn] 블록체인 이더리움 부동산 댑(Dapp) 만들기 - 기본편](https://coding-dahee.tistory.com/90)

[리액트(React) 프로젝트에 스마트컨트랙트(Smart contract) 사용하기](https://medium.com/@han7096/create-react-app-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-%EC%8A%A4%EB%A7%88%ED%8A%B8%EC%BB%A8%ED%8A%B8%EB%9E%99%ED%8A%B8-smart-contract-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-9d2905587985)

- ropsten apis

[](https://ropsten.etherscan.io/apis)