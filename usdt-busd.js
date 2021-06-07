import * as fs from "fs"
import * as os from "os"
import { ethers } from 'ethers'

const url = 'https://bsc-dataseed1.binance.org';
const provider = new ethers.providers.JsonRpcProvider(url);

const addresses = {
    IN: '0x55d398326f99059ff775485246999027b3197955',//USDT
    OUT: '0xe9e7cea3dedca5984780bafc599bd69add087d56',//BUSD
    factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    router: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
    recipient: '0x07dC45c241CeEd12961d9aBd6aBB83Fe4B53ab27'
}
const PRIVATE_KEY = ""
const lowprice  = 0.9
const highprice = 1.1
const inAmount = '10';//每笔交易数量 value must be a string

// JSON files from here: https://github.com/risingsun007/pancakeswap_get_price
const pancakeFactoryJson = "pancake_factory.json";
const pancakeFactory = JSON.parse(fs.readFileSync(pancakeFactoryJson));
const pancakePairJson = "pancakepair.json";
const pancakePair = JSON.parse(fs.readFileSync(pancakePairJson));

const pancake = new ethers.Contract(addresses.factory, pancakeFactory, provider);


const wallet = new ethers.Wallet(PRIVATE_KEY);
const account = wallet.connect(provider);

const router = new ethers.Contract(
    addresses.router,
    [
        'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
    ],
    account
);


export const getPrice = async (token0, token1) => {
    const pairAddress = await pancake.getPair(token0, token1);

    if(pairAddress === '0x0000000000000000000000000000000000000000'){
        return {
        status: 'Pair not found'
        }
    }

    const tokenContract0 = new ethers.Contract(token0, pancakePair, provider),
            tokenContract1 = new ethers.Contract(token1, pancakePair, provider),
            tokenDecimals0 = tokenContract0.decimals(),
            tokenDecimals1 = tokenContract1.decimals(),
            pairContract = new ethers.Contract(pairAddress, pancakePair, provider),
            reserves = await pairContract.getReserves(),
            totalSupply = await pairContract.totalSupply()

    let r0, r1;
    r0 = reserves._reserve0;
    r1 = reserves._reserve1;

    return {
        tokens: [await tokenContract0.name(), await tokenContract1.name()],
        decimals: [await tokenDecimals0, await tokenDecimals1],
        pairAddress: pairAddress,
        totalSupply: totalSupply.toString(),
        reserves: [
        r0.toString(), 
        r1.toString()
        ],
        price: (r1 / 10 ** await tokenDecimals1) / (r0 / 10 ** await tokenDecimals0)
    }
}

export const buy = async () => {

    let tokenIn = addresses.IN, tokenOut = addresses.OUT;

    const amountIn = ethers.utils.parseUnits(inAmount, 'ether');
    const amountOutMin = 0;

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
    const receipt = await tx.wait();
    //console.log('Transaction receipt');
    //console.log(receipt);
}
export const sell = async (amountSell) => {

    let tokenIn = addresses.OUT, tokenOut = addresses.IN;

    const amountIn = ethers.utils.parseUnits(amountSell, 'ether');
    const amountOutMin = 0;

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
    const receipt = await tx.wait();
    //console.log('Transaction receipt');
    //console.log(receipt);
}


//----------------approve-----------------------
export const INContract = new ethers.Contract(
    addresses.IN,
    [
        'function approve(address spender, uint amount) public returns(bool)',
        "function balanceOf(address) view returns (uint)",
    ],
    account
);
export const approveIn = async () => {
    const tx = await INContract.approve(
        router.address,
        ethers.utils.parseUnits('99999999', 'ether')
    );
    const receipt = await tx.wait();
    console.log('Transaction receipt');
    console.log(receipt);
}
//approveIn()
export const OUTContract = new ethers.Contract(
    addresses.OUT,
    [
        'function approve(address spender, uint amount) public returns(bool)',
        "function balanceOf(address) view returns (uint)",
    ],
    account
);
export const approveOut = async () => {
    const tx = await OUTContract.approve(
        router.address,
        ethers.utils.parseUnits(9.9e20.toString(), 'ether')
    );
    const receipt = await tx.wait();
    console.log('Transaction receipt');
    console.log(receipt);
}
//approveOut()

export const getInBalance = async () => {
    let balance = await INContract.balanceOf(addresses.recipient)
    //console.log(balance.toString())
    return balance.toString()
}
export const getOutBalance = async () => {
    let balance = await OUTContract.balanceOf(addresses.recipient)
    //console.log(balance.toString())
    return balance.toString()
}
//----------------approve-----------------------

export const log = async (text) => {
    fs.appendFileSync('log.txt', new Date().toLocaleString() + ' ' + text + os.EOL)
}

export const start = async () => {
    log(' start----------------------')
    getPrice(addresses.IN, addresses.OUT).then((result) => {
        let price = 1/result.price // 价格比较
        log(' Price: ' + price)
        if(price<lowprice){
            getInBalance().then((balanceIn)=>{
                balanceIn = ethers.utils.formatEther(balanceIn)
                log(' balanceIn: ' + balanceIn)
                if(balanceIn>inAmount){
                    buy()
                    log(' done')
                }
            })
        }
        if(price>highprice){
            getOutBalance().then((balanceOut)=>{
                balanceOut = ethers.utils.formatEther(balanceOut)
                log(' balanceOut: ' + balanceOut)
                if(balanceOut>inAmount/price){
                    sell(inAmount/price+'') //value must be a string
                }else{
                    sell(balanceOut.toString())
                }
                log(' done')
            })
        }
    })
}

start()
//setInterval(start, 30000);
