import { useEffect, useState } from 'react';
import Web3 from 'web3';
// import EthereumTx from 'ethereumjs-tx';
import abiArray from './mycoin.json';

const Web3Test = () => {
    
    const PROJECT_ID = "f8bb83919afd48fe855f54e33595a3ec";
    const MABL_ADDRESS = '0xA9e4f0d5332b26C9B323cC299604D001dA25db1B';
    const PRIVKEY = 'cf61f430c051df6dc8d650d7a65c95a15b6a1a1df685785e3d75096964836585';
    const CONTRACT_ADDRESS = '0x0B21843cdf103F67a513c001e02606ba2384a650';
    
    let web3;
    let contractAddress = MABL_ADDRESS;
    
    const [text, setText] = useState('');
    const [rawTx, setRawTx] = useState('');


    useEffect(() => {
        web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${PROJECT_ID}`));
    }, [text, rawTx]);

    const onChange = ({ target: { value }}) => {
        setText(value);
    };

    // test3
    const test3 = () => {
        const fromAddress = '0xA9e4f0d5332b26C9B323cC299604D001dA25db1B';
        const toAddress = '0x97E3EfFFE90BF2A980e360DEe8dd36383349c65d';

        const contract = new web3.eth.Contract(abiArray, CONTRACT_ADDRESS);
        const Tx = require('ethereumjs-tx').Transaction;
        const privateKey = Buffer.from(PRIVKEY, 'hex');
        const data = contract.methods.transfer(toAddress, 1).encodeABI();
        const count = web3.eth.getTransactionCount(fromAddress, 'pending');
        console.log(count);
        const rawTx = {
            nonce: web3.utils.toHex(count),
            gasPrice: '0x09184e72a000',
            gasLimit: '0x7458',
            to: fromAddress,
            value: '0x01',
            data: data,
        }

        let tx = new Tx(rawTx, {'chain': 'ropsten'});
        tx.sign(privateKey);

        let serializedTx = tx.serialize();

        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
            .on('receipt', console.log);


    }


    const getBalance = () => {
        let address, wei, balance;
        address = document.getElementById('address').value;
        try {
            web3.eth.getBalance(address, (error, wei) => {
                if (!error) {
                    balance = web3.utils.fromWei(wei, 'ether');
                    document.getElementById('output').innerHTML = balance + 'ETH';
                }
            });
        } catch (err) {
            document.getElementById('output').innerHTML = err;
        }
    }

    const getNewAccount = () => {
        const result = web3.eth.accounts.create('test');
        console.log(result);
        document.getElementById('newAccount').innerHTML = `<h2>${result.address}</h2><h3>${result.privateKey}</h3>`;
        contractAddress = result.address;
        setText(result.address);
    }

    // const getTokenBalnce = (addr) => {
    //     if (addr == '') {
    //         return;
    //     }

    //     console.log(addr);

    //     const count = web3.eth.getTransactionCount(CONTRACT_ADDRESS);
    //     console.log(count);
    
    //     const contract = new web3.eth.Contract(abiArray, CONTRACT_ADDRESS, {from: MABL_ADDRESS});

    //     let myTokenBalnce;
    //     contract.methods.balanceOf(addr).call()
    //         .then(result => {
    //             myTokenBalnce = result;
    //             console.log(myTokenBalnce / 100000);
    //             return result;
    //         });
    // }


    const test = async () => {
        const count = web3.eth.getTransactionCount(CONTRACT_ADDRESS);
        console.log(count);
    
        const contract = new web3.eth.Contract(abiArray, CONTRACT_ADDRESS);
        console.log(contract);
        const addr = '0x97E3EfFFE90BF2A980e360DEe8dd36383349c65d';
        // const data = contract.events.Transfer.getData(addr, 10, {from: MABL_ADDRESS})


        const rawTransaction = {
            "from": MABL_ADDRESS,
            "nonce": web3.utils.toHex(count),
            "gasPrice": "0x04e3b29200",
            "gasLimit": "0x7458",
            "to": addr,
            "value": "0x033",
            // "data": abiArray,
            // "data": contract.transfer.getData(addr, 10, {from: MABL_ADDRESS}),
            "chainId": 0x03
        };

        const signed = await web3.eth.accounts.signTransaction(rawTransaction, PRIVKEY)
            .then(e => {
                console.log(e);
                return e;
            }).catch(err => {
                console.log(err);
            });


        const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction).then(result => {
            console.log(result);
            return result;
        }).catch(err => {
            console.log(err);
        });
        
    }

    useEffect(() => {
        
    }, [rawTx]);

    const getTotalSupply = async () => {
        const contract = new web3.eth.Contract(abiArray, CONTRACT_ADDRESS);
        let totalSupply;
        await contract.methods.totalSupply().call()
            .then(result => {
                totalSupply = result / 100000;
            });
        
        console.log(totalSupply);
    }

    const getTokenBalance = async (address) => {
        // 안되면 수정해야 함... (자꾸 에러나는데 왠지 모르겠다...)
        // address = '0xA9e4f0d5332b26C9B323cC299604D001dA25db1B';
        const contract = new web3.eth.Contract(abiArray, CONTRACT_ADDRESS);
        let tokenBalance;
        await contract.methods.balanceOf(address).call().then(result => {
            tokenBalance = result / 100000;
        })
        console.log(address, tokenBalance);
    }
    
    const sendToken = async (fromAddress, toAddress, amount) => {
        const count = web3.eth.getTransactionCount(CONTRACT_ADDRESS);
        console.log(count);
        console.log(web3.utils.toHex(count));
        
        fromAddress = '0xA9e4f0d5332b26C9B323cC299604D001dA25db1B';
        toAddress = '0x97E3EfFFE90BF2A980e360DEe8dd36383349c65d';
        amount = 1;

        const contract = new web3.eth.Contract(abiArray, CONTRACT_ADDRESS);
        console.log(contract);
        contract.defaultAccount = fromAddress;
        console.log('fromAddress', contract.defaultAccount)

        const data = contract.methods.transfer(toAddress, 10);
        const gasPrice = await web3.eth.getGasPrice();
        
        const rawTransaction = {
            "from": fromAddress,
            "nonce": web3.utils.toHex(count),
            "gasPrice": gasPrice,
            "gasLimit": "0x00817c8",
            "to": toAddress,
            "value": "0x033",
            // "data": data,
            "chainId": 0x03
        };

        const signed = web3.eth.accounts.signTransaction(rawTransaction, PRIVKEY)
            .then(result => {
                console.log('Doing');
                web3.eth.sendSignedTransaction(result.rawTransaction).then(result => {
                    console.log(result);
                }).catch(err => {
                    console.log('send', err);
                });
                
            }).catch(err => {
                console.log('sign', err);
            });
        
        
        // const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction)
        // .then(result => {
        //     console.log(1, result);
        // });

        // console.log(2)
        
        // const isTransfer = await contract.methods.transfer(toAddress, amount).send({from: fromAddress}).then(result => {
        //     console.log(result);
        // });
        // const owner = await contract.methods.owner().call().then(result => {
        //     console.log(result);
        // })
        
    }

    const test2 = async () => {
        const count = web3.eth.getTransactionCount(CONTRACT_ADDRESS);
        const fromAddress = '0xA9e4f0d5332b26C9B323cC299604D001dA25db1B';
        const toAddress = '0x97E3EfFFE90BF2A980e360DEe8dd36383349c65d';
        const amount = 1;

        const contract = new web3.eth.Contract(abiArray, CONTRACT_ADDRESS);
        const tx = contract.methods.transfer(toAddress, amount);
        tx._method.payable = true;
        console.log(tx);

        const gas = await tx.estimateGas({to: toAddress, data: tx});
        console.log(3);
        const gasPrice = await web3.eth.getGasPrice();
        console.log(2);
        const data = tx.encodeABI();
        const nonce = await web3.eth.getTransactionCount(CONTRACT_ADDRESS);
        console.log(1);
        const signedTx = await web3.eth.accounts.signTransaction({
            data,
            gas,
            gasPrice,
            nonce,
            chainId: 0x03
        }, PRIVKEY);
        
        console.log(`Old data value: ${await contract.methods.data().call()}`);
        const receipt = await web3.eth.sendTransaction(signedTx.rawTransaction);
        console.log(`Transaction hash: ${receipt.transactionHash}`);
        console.log(`New data value: ${await contract.methods.data().call()}`);

    
    }

    return (
        <div>
            
            <h1>ETH Balance Fetcher</h1>
            <p>Enter your Ethereum Address:</p>
            <input type="text" size="50" id="address" />
            <button onClick={getBalance}>Get Balance</button>
            <button onClick={getNewAccount}>Get new account</button>
            <button type="button" onClick={test}>test</button>

            <br/>
            <div id="output"></div>
            <br/>
            <div id="newAccount"></div>
            <br/>
            <div id="test"></div>
            <br/>

            <input onChange={onChange} value={text} />
            <button onClick={() => getTokenBalance(text)}>Get myTokenBalnce</button>
            <button onClick={getTotalSupply}>Get Total Supply</button>
            <button onClick={sendToken}>send Token</button>
            <button onClick={test2}>test2</button>
            <br/>
            <br/>

            <button onClick={test3}>test3</button>
        </div>
    )

}

export default Web3Test;