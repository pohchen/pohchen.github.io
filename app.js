// 取得使用者帳戶
let userAccounts = []
async function getUserAccounts() {
  userAccounts = await web3.eth.getAccounts()
}

async function startApp() {
  // Contract address and ABI
  const contractAddress = '0x4b3C45f25aBd6a1B6D7e63e7bc3499E8bc06444b'
  const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"bet","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"get","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

  getUserAccounts()

  // Instantiate contract object
  const contractInstance = new window.web3.eth.Contract(contractABI, contractAddress)
}

async function bet(amount) {
  const accounts = await web3.eth.getAccounts();
  const options = { from: accounts[0], value: amount };
  contractInstance.methods.bet().send(options, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log(result);
    }
  });
}

async function get() {
  const accounts = await web3.eth.getAccounts();
  contractInstance.methods.get().send({ from: accounts[0] }, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log(result);
    }
  });
}

async function getBalance() {
  const accounts = await web3.eth.getAccounts();
  contractInstance.methods.getBalance().call({ from: accounts[0] }, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log(result);
    }
  });
}
 

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
  
   startApp()
})
