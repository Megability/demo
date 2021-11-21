const ethers = require('ethers');
const bluebird = require('bluebird');

const abi = [
    "event ValueChanged(address indexed author, string oldValue, string newValue)",
    "constructor(string value)",
    "function getValue() view returns (string value)",
    "function setValue(string value)"
];

// Connect to the network
const provider = new ethers.getDefaultProvider('ropsten');

// 地址来自上面部署的合约
const contractAddress = "0x2bD9aAa2953F988153c8629926D22A6a5F69b14E";

// 使用Provider 连接合约，将只有对合约的可读权限
const contract = new ethers.Contract(contractAddress, abi, provider);


async function getValue(obj) {
    await bluebird.delay(1000);
    const response = await contract.getValue();
    return await response;
}
async function setValue(obj) {
    console.log(obj.addr);
    let privateKey = obj.s;
    let wallet = new ethers.Wallet(privateKey, provider);

    // 使用签名器创建一个新的合约实例，它允许使用可更新状态的方法
    let contractWithSigner = contract.connect(wallet);
    // ... 或 ...
    // let contractWithSigner = new Contract(contractAddress, abi, wallet)

    let overrides = {

        // The maximum units of gas for the transaction to use
        //gasLimit: 23000,
    
        // The price (in wei) per unit of gas
        gasPrice: ethers.utils.parseUnits('7.0', 'gwei'),
    
        // The nonce to use in the transaction
        //nonce: 123,
    
        // The amount to send with the transaction (i.e. msg.value)
        //value: ethers.utils.parseEther('1.0'),
    
        // The chain ID (or network ID) to use
        //chainId: 1
    
    };
    // 设置一个新值，返回交易
    let tx = await contractWithSigner.setValue(obj.addr, overrides);

    console.log(tx.hash);

    // 操作还没完成，需要等待挖矿
    await tx.wait();

    return await contract.getValue();
}
//并行
const start = async () => {

    const wallets = [
        {"addr":"0x14791697260E4c9A71f18484C9f997B308e59325","s":"0x0123456789012345678901234567890123456789012345678901234567890123"},
        {"addr":"","s":""}
    ];

    console.time('getValue');
    const promises = wallets.map(x => getValue(x));
    for (const promise of promises) {
        //try{
            const data = await promise;
            console.log(`Data: ${data}`);
        //} catch (err) {
        //    console.error(err)
        //}
    }
    console.timeEnd('getValue');


    console.time('setValue');
    const spromises = wallets.map(x => setValue(x));
    for (const spromise of spromises) {
        //try{
            const data = await spromise;
            console.log(`Data: ${data}`);
        //} catch (err) {
        //    console.error(err)
        //}
    }
    console.timeEnd('setValue');

}

start();