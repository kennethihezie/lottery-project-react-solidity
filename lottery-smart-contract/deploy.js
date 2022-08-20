const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const { abi, evm } = require('./compile')

//first param is the account memonic
//second param the link to the testnet or mainnet we want to deploy our contract to.
const memonicPhrase = '{REPLACE_WITH_WALLET_PHRASE}'
const providerUrl = '{REPLACE_WITH_PROVIDER_URL}'

const provider = new HDWalletProvider(memonicPhrase, providerUrl)

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

              console.log('Contracts deployed at: ' + result.options.address);
    //To prevent a hanging deployment, add this code directly below.
    provider.engine.stop()
}

//deployed at 0xf1C0e6F92da08880eD966Ffa804C93C4DC608579

deploy()