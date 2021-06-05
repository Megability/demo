import { ethers } from 'ethers'

const addresses = {
    USDT: '0x55d398326f99059ff775485246999027b3197955',
    BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    router: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
    recipient: '0x07dC45c241CeEd12961d9aBd6aBB83Fe4B53ab27'
}

const PRIVATE_KEY = ""

const url = 'https://bsc-dataseed1.binance.org';
const provider = new ethers.providers.JsonRpcProvider(url);

const wallet = new ethers.Wallet(PRIVATE_KEY);
const account = wallet.connect(provider);

const router = new ethers.Contract(
    addresses.router,
    [
        'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
    ],
    account
);


const usdt = new ethers.Contract(
  addresses.USDT,
  [
    'function approve(address spender, uint amount) public returns(bool)',
  ],
  account
);
const init0 = async () => {
  
  const tx = await usdt.approve(
    router.address,
    ethers.utils.parseUnits('1', 'ether')
  );
  const receipt = await tx.wait(); 
  console.log('Transaction receipt');
  console.log(receipt);
  
}

const init = async () => {
    console.log("Test TX");

    let tokenIn = addresses.USDT, tokenOut = addresses.BUSD;

    const amountIn = ethers.utils.parseUnits('1', 'ether');
    const amountOutMin = 0;

    console.log("Starting swap...");

    const tx = await router.swapExactTokensForTokens(
        amountIn,
        amountOutMin,
        [tokenIn, tokenOut],
        addresses.recipient,
        Date.now() + 1000 * 60 * 10, //10 minutes
        {
          gasPrice: ethers.utils.parseUnits('5', 'gwei'),
          gasLimit: 500000
        }
    );
    console.log("Swap done!");
    const receipt = await tx.wait();
    console.log("Transaction receipt");
    console.log(receipt);
    
}

init();
