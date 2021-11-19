const ethers = require('ethers');

//https://learnblockchain.cn/docs/ethers.js/api-contract.html

// The Contract interface
//const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountTokens","type":"uint256"}],"name":"AdminTokenRecovery","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amountLP","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOfferingToken","type":"uint256"}],"name":"AdminWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"uint8","name":"pid","type":"uint8"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"offeringAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"excessAmount","type":"uint256"},{"indexed":true,"internalType":"uint8","name":"pid","type":"uint8"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"startBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endBlock","type":"uint256"}],"name":"NewStartAndEndBlocks","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"campaignId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"numberPoints","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"thresholdPoints","type":"uint256"}],"name":"PointParametersSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"offeringAmountPool","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"raisingAmountPool","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"pid","type":"uint8"}],"name":"PoolParametersSet","type":"event"},{"inputs":[],"name":"IFO_FACTORY","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_BUFFER_BLOCKS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NUMBER_POOLS","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"campaignId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint8","name":"_pid","type":"uint8"}],"name":"depositPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lpAmount","type":"uint256"},{"internalType":"uint256","name":"_offerAmount","type":"uint256"}],"name":"finalWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_pid","type":"uint8"}],"name":"harvestPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_offeringToken","type":"address"},{"internalType":"address","name":"_pancakeProfileAddress","type":"address"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"},{"internalType":"uint256","name":"_maxBufferBlocks","type":"uint256"},{"internalType":"address","name":"_adminAddress","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isInitialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numberPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"offeringToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pancakeProfile","outputs":[{"internalType":"contract PancakeProfile","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"recoverWrongTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_offeringAmountPool","type":"uint256"},{"internalType":"uint256","name":"_raisingAmountPool","type":"uint256"},{"internalType":"uint256","name":"_limitPerUserInLP","type":"uint256"},{"internalType":"bool","name":"_hasTax","type":"bool"},{"internalType":"uint8","name":"_pid","type":"uint8"}],"name":"setPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"thresholdPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTokensOffered","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignId","type":"uint256"},{"internalType":"uint256","name":"_numberPoints","type":"uint256"},{"internalType":"uint256","name":"_thresholdPoints","type":"uint256"}],"name":"updatePointParameters","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"}],"name":"updateStartAndEndBlocks","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"viewPoolInformation","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"viewPoolTaxRateOverflow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint8[]","name":"_pids","type":"uint8[]"}],"name":"viewUserAllocationPools","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint8[]","name":"_pids","type":"uint8[]"}],"name":"viewUserInfo","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"bool[]","name":"","type":"bool[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint8[]","name":"_pids","type":"uint8[]"}],"name":"viewUserOfferingAndRefundingAmountsForPools","outputs":[{"internalType":"uint256[3][]","name":"","type":"uint256[3][]"}],"stateMutability":"view","type":"function"}];
const abi = [
    "event ValueChanged(address indexed author, string oldValue, string newValue)",
    "constructor(string value)",
    "function getValue() view returns (string value)",
    "function setValue(string value)"
];
// Connect to the network
const url = 'https://bsc-dataseed1.binance.org';
const provider = new ethers.providers.JsonRpcProvider(url);
//console.log(provider)
// 地址来自上面部署的合约
const contractAddress = "0xEd14d49C13269DBD321A2F64337cB046AF4F5C29";


//---------------demo------------------
/*
// The Contract interface
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
*/
//---------------demo------------------

// 使用Provider 连接合约，将只有对合约的可读权限
const contract = new ethers.Contract(contractAddress, abi, provider);


const init = async () => {

    let currentValue = await contract.getValue();

    console.log(currentValue);



    
    // 从私钥获取一个签名器 Signer
    //let privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';
    let privateKey = '';
    let wallet = new ethers.Wallet(privateKey, provider);

    // 使用签名器创建一个新的合约实例，它允许使用可更新状态的方法
    let contractWithSigner = contract.connect(wallet);
    // ... 或 ...
    // let contractWithSigner = new Contract(contractAddress, abi, wallet)

    // 设置一个新值，返回交易
    let tx = await contractWithSigner.setValue("123");

    console.log(tx.hash);

    // 操作还没完成，需要等待挖矿
    await tx.wait();

    // 再次调用合约的 getValue()
    let newValue = await contract.getValue();

    console.log(newValue);
    
}

init();

