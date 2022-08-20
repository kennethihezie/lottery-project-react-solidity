const { abi, evm } = require('../compile')
const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')

//A provider is a communication layer to some etherum or bsc or some other network
//in the furture we can change the ganache to rinkeby
const web3 = new Web3(ganache.provider())
let accounts;
let lottery;

beforeEach(async ()=> {
     //Get a list of all account.
    //the web3 library has different modules associated with different cryptocurrencies.
    //in our case we are using etherum
    accounts = await web3.eth.getAccounts()
    lottery = await new web3.eth.Contract(abi)
    //Use one those account to deploy the contract
    .deploy({ data: evm.bytecode.object })
    //the account we are deploying the contract from
    .send({ from: accounts[0], gas: '1000000' })

    console.log(lottery);
})

describe('Lottery', () => {
    it('deploys a contract', () => {
        //every contract deploy has an address.
        //the ok method checks if the value is defined. if the value is null or undefined the test will fail
        assert.ok(lottery.options.address)
    })

    it('isManager valid', async () => {
        //we are checking if the manager address is valid..
        let managerAddress = await lottery.methods.manager().call()
        assert.equal(accounts[0], managerAddress)
    })

    it('create player', async () => {
        //when we are sending money...we use wei
        await lottery.methods.enter().send({ from: accounts[1], value: web3.utils.toWei('0.02', 'ether') })
        const getAllPlayers = await lottery.methods.getAllPlayers().call({ from: accounts[0] })

        assert.equal(accounts[1], getAllPlayers[0])
        assert.equal(1, getAllPlayers.length)
    })

    it('requires a minimum of ether to enter', async () => {
        try{
            await lottery.methods.enter().send({ from: accounts[2], value: web3.utils.toWei('0.0001', 'ether') })
            assert(false)
        } catch (err) {
            //it will pass the test cause the err is defined...
            assert.ok(err)
        } 
    })

    it('create multiple players', async () => {
        accounts.map( async address => {
            await lottery.methods.enter().send({ from: address, value: web3.utils.toWei('0.02', 'ether') })
        })
        const getAllPlayers = await lottery.methods.getAllPlayers().call({ from: accounts[0] })
        assert(accounts.length, getAllPlayers.length)
    })

    it('only manager can pick a manager', async () => {
       try{
           await lottery.methods.pickWinner().send({ from: accounts[1] })
           assert(false)
       } catch (err){
           assert(err)
       }
    })

    it('send money to winner', async () => {
        //so we entering one player and checking it account balance...so that when we call
        //pickWinner method we will also check the account balance to verify the player receives
        //the money
       await lottery.methods.enter().send({ from: accounts[0], value: web3.utils.toWei('2', 'ether') })
       //getBalance method is used to get the blanace of accounts or a ccontract in wei unit
       let initialBalance = await web3.eth.getBalance(accounts[0])

       await lottery.methods.pickWinner().send({ from: accounts[0] })
       const finalBalance = await web3.eth.getBalance(accounts[0])

       const difference = finalBalance - initialBalance
       //check how much you spent on gas
       console.log(difference);

       assert(difference > web3.utils.toWei('1.9', 'ether'))
       //check if players array get cleared out
       const players = await lottery.methods.getAllPlayers().call({ from: accounts[0] })
       //actual length for the players array is 0 cause it gets cleared out... when the pickWinner method is called
       assert.equal(0, players.length)       
    })
})
