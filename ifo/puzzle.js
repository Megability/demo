const ethers = require('ethers');

const url = 'https://polygon-rpc.com';
const provider = new ethers.providers.JsonRpcProvider(url);

let privateKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
let wallet = new ethers.Wallet(privateKey, provider);

let tx = {
    to: "0xc1fae1924303CC7a816919B7A3935Cda8Bf8eF3d",
    data: "0x0000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000006e5ad90e5a49c0000000000000000000000000000000000000000000000000000"
};
//子夜
let sendPromise = wallet.sendTransaction(tx);

sendPromise.then((tx) => {
    console.log(tx);
});
