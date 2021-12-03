//此文件用来获取某合约的插槽信息
const { ethers,utils } = require("ethers");

const bsc_rpc_url = "https://bsc-dataseed1.binance.org"
const provider = new ethers.providers.JsonRpcProvider(bsc_rpc_url)
const proxy_address = "0x6778f69f83c7d42612500efe0Bcd278c112688F6"
const admin_slot = ethers.BigNumber.from("0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103")
const impl_slot = ethers.BigNumber.from("0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc")


async function start() {
    const admin_info = await provider.getStorageAt(proxy_address , admin_slot)
    console.log("admin_info:",admin_info)
    const admin_address = utils.getAddress("0x" + admin_info.substring(26))
    console.log("admin_address:",admin_address)
    console.log()
    //0xa45479B53B99b4A23792DFd9657C216d1901ca07

    const impl_info = await provider.getStorageAt(proxy_address , impl_slot)
    console.log("impl_info:",impl_info)
    const impl_address = utils.getAddress("0x" + impl_info.substring(26))
    console.log("impl_address:",impl_address)
    //0xbBF89e977394a387c52D6Ea25bd4f71685a42455
}

start()
