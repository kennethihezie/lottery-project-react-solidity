// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract Lottery {
    address public manager;
    address payable[] public players;
    address public lastWinner;
    /*
    The msg variable is global variable that is created once a function is invoked on the contract
    Properties of the msg varible
    msg.data = Data field from the call or transaction that invoked the current function.
    msg.gas = amount of gas the current function invocation has availiable
    msg.sender = address of the account that started the current function invocation
    msg.value = amount of ether (in wei) that was sent along with the function invocation.
    */
    constructor() {
       manager = msg.sender;
    }

    //when using payable. it means the function expects some ether
    function enter() public payable {
        //just like in eos. if the values in require evaluate to true excute the function else break
        //here we making sure anyone entering the game pays atleast .01 ether. now remember .01 ether authomatically converts to wei
        require(msg.value > .01 ether);
        players.push(payable(msg.sender));
        //solidity does have a random number generator
    }

    //pick winner randomly
    function pickWinner() public restricted {
         uint index = generateRandomNumber() % players.length;
         //calling transfer on the addresses variable
         //this.balance is the actual money balance in the contract 
         
         players[index].transfer(address(this).balance);
         lastWinner = players[index];
         //clear out players and start new lotter
         players = new address payable[](0);
    }

    //function modifiers
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }


    //don't use in production
    function generateRandomNumber() private view returns(uint) {
        //We will be using this params to generate random number
        /*
        Current block difficulty refers to the time taken to validate a block on the chain
        current time refers to the realtime
        Addresses of players refers to the wallet address of players
        Then we will feed this three above to the sha3 algorithm
        The sha3 will give us a really big hexadecimal number. WHich we now use to select the random number.
        */
        //keccak256(x) is the same thing as sha3
        return uint(keccak256(abi.encode(block.difficulty, block.timestamp, players)));
    }

    function getAllPlayers() public view returns(address payable[] memory player){
        return players;
    }
}


