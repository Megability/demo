const ethers = require('ethers');
/*
let text = "Hello World!"

let bytes32 = ethers.utils.formatBytes32String(text)
console.log(bytes32)
// "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000"

let originalText = ethers.utils.parseBytes32String(bytes32)
console.log(originalText)
// "Hello World!"
*/

let cc = "0x7f1bdd7600000000000000000000000000000000000000000000000048ed0401d8d011f00000000000000000000000000000000000000000000000000000000000000000"
let ccText = ethers.utils.defaultAbiCoder.decode(
    ['uint256','uint8'],
    ethers.utils.hexDataSlice(cc, 4)
)
console.log(ccText)

console.log(ccText[0].toString())

console.log(ethers.utils.formatEther(ccText[0].toString()));
