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
    "constant": false,
    "inputs": [
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "bet",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }
]

// Instantiate contract object
const contract = new window.web3.eth.Contract(contractABI, contractAddress)

// Bet function
async function bet() {
  const amount = document.getElementById('amount').value
  const accounts = await window.web3.eth.getAccounts()
  const from = accounts[0]
  const options = { from, value: amount }
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
