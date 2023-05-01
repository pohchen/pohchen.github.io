// Initialize web3 provider
window.addEventListener('load', async () => {
  if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.enable()
  }
  if (typeof window.web3 !== 'undefined') {
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    window.alert('Please install Metamask to use this dApp')
  }
})

// Contract address and ABI
const contractAddress = '0x4b3C45f25aBd6a1B6D7e63e7bc3499E8bc06444b'
const contractABI = [
	{
		"inputs": [],
		"name": "bet",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// 取得使用者帳戶
let userAccounts = []
async function getUserAccounts() {
  userAccounts = await web3.eth.getAccounts()
}
getUserAccounts()

// Instantiate contract object
const contract = new window.web3.eth.Contract(contractABI, contractAddress)

// Bet function
async function bet() {
  const amount = web3.utils.toWei("0.0005", "ether")  // document.getElementById('amount').value
  const options = { from: userAccounts[0], value: amount }
  contract.methods.bet(amount).send(options, (error, result) => {
    if (error) {
      console.error(error)
      document.getElementById('message').innerHTML = 'Error: ' + error.message
    } else {
      console.log(result)
      document.getElementById('message').innerHTML = 'Transaction hash: ' + result
    }
  })
}

// getBalance function
async function getBalance() {
  const balance = await contract.methods.getBalance().call({ from: userAccounts[0] });
  console.log('Your balance is ${web3.utils.fromWei(balance, "ether")} ETH');
}

// getByOwner function
async function getByOwner() {
  const balance = await contract.methods.get().send({ from: userAccounts[0] });
  console.log('Your balance is ${web3.utils.fromWei(balance, "ether")} ETH');
}
  
