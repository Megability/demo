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

/*
let cc = "0x7f1bdd7600000000000000000000000000000000000000000000000048ed0401d8d011f00000000000000000000000000000000000000000000000000000000000000000"
let ccText = ethers.utils.defaultAbiCoder.decode(
    ['uint256','uint8'],
    ethers.utils.hexDataSlice(cc, 4)
)
console.log(ccText)

console.log(ccText[0].toString())

console.log(ethers.utils.formatEther(ccText[0].toString()));


*/

let cc = "0x93a09352000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001bde6b281e59bade698a5c2b7e995bfe6b29920e6af9be6b3bde4b89c20e78bace7ab8be5af92e7a78befbc8ce6b998e6b19fe58c97e58ebbefbc8ce6a998e5ad90e6b4b2e5a4b4e38082e79c8be4b887e5b1b1e7baa2e9818defbc8ce5b182e69e97e5b0bde69f93efbc9be6bcabe6b19fe7a2a7e9808fefbc8ce799bee888b8e4ba89e6b581e38082e9b9b0e587bbe995bfe7a9baefbc8ce9b1bce7bf94e6b585e5ba95efbc8ce4b887e7b1bbe99c9ce5a4a9e7ab9ee887aae794b1e38082e68085e5afa5e5bb93efbc8ce997aee88b8de88cabe5a4a7e59cb0efbc8ce8b081e4b8bbe6b289e6b5aeefbc9fe690bae69da5e799bee4bea3e69bbee6b8b8efbc8ce5bf86e5be80e69894e5b3a5e5b598e5b281e69c88e7a8a0e38082e681b0e5908ce5ada6e5b091e5b9b4efbc8ce9a38ee58d8ee6ada3e88c82efbc9be4b9a6e7949fe6848fe6b094efbc8ce68ca5e696a5e696b9e98192e38082e68c87e782b9e6b19fe5b1b1efbc8ce6bf80e689ace69687e5ad97efbc8ce7b2aae59c9fe5bd93e5b9b4e4b887e688b7e4beafe38082e69bbee8aeb0e590a6efbc8ce588b0e4b8ade6b581e587bbe6b0b4efbc8ce6b5aae9818fe9a39ee8889fefbc81000000"
let ccText = ethers.utils.defaultAbiCoder.decode(
    ['string'],
    ethers.utils.hexDataSlice(cc, 4)
)
console.log(ccText)

console.log(ccText[0].toString())
