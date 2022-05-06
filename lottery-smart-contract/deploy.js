const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const { abi, evm } = require('./compile')

//first param is the account memonic
//second param the link to the testnet or mainnet we want to deploy our contract to.
const provider = new HDWalletProvider(
    'table multiply tree blood base knife keen sea police shield furnace wise',
    'https://rinkeby.infura.io/v3/c012c66a9a614b3eb2f378cb7fa1451f'
 )

 //this instance of web3 here is completely for the rinkeby network
const web3 = new Web3(provider)

const deploy = async () => {
    //remeber our memeonic can be used to generate multiple accounts, so we are just using the first one
    const accounts = await web3.eth.getAccounts()
    // console.log('Account', accounts[1]);
    // console.log('All accounts', accounts);
    const result = await new web3.eth.Contract(abi)
          .deploy({ data: evm.bytecode.object })
          .send({ gas: '5000000', from: accounts[1] })

          
    console.log(abi);
    console.log('Contracts deployed at: ' + result.options.address);
    //To prevent a hanging deployment, add this code directly below.
    provider.engine.stop()
}

deploy()