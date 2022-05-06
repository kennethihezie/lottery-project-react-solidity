import web3 from "./web3";

const address = '0xB5421c64895e5e3fF9eacE2122455e962dE098CC'

// const abi = [
//   {
//     inputs: [],
//     stateMutability: 'nonpayable',
//     type: 'constructor',
//     constant: undefined,
//     payable: undefined,
//     signature: 'constructor'
//   },
//   {
//     inputs: [],
//     name: 'enter',
//     outputs: [],
//     stateMutability: 'payable',
//     type: 'function',
//     constant: undefined,
//     payable: true,
//     signature: '0xe97dcb62'
//   },
//   {
//     inputs: [],
//     name: 'getAllPlayers',
//     outputs: [ [Object] ],
//     stateMutability: 'view',
//     type: 'function',
//     constant: true,
//     payable: undefined,
//     signature: '0xefa1c482'
//   },
//   {
//     inputs: [],
//     name: 'lastWinner',
//     outputs: [ [Object] ],
//     stateMutability: 'view',
//     type: 'function',
//     constant: true,
//     payable: undefined,
//     signature: '0xfe188184'
//   },
//   {
//     inputs: [],
//     name: 'manager',
//     outputs: [ [Object] ],
//     stateMutability: 'view',
//     type: 'function',
//     constant: true,
//     payable: undefined,
//     signature: '0x481c6a75'
//   },
//   {
//     inputs: [],
//     name: 'pickWinner',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//     constant: undefined,
//     payable: undefined,
//     signature: '0x5d495aea'
//   },
//   {
//     inputs: [ [Object] ],
//     name: 'players',
//     outputs: [ [Object] ],
//     stateMutability: 'view',
//     type: 'function',
//     constant: true,
//     payable: undefined,
//     signature: '0xf71d96cb'
//   }
// ]

const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "enter",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllPlayers",
		"outputs": [
			{
				"internalType": "address payable[]",
				"name": "player",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastWinner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "manager",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pickWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "players",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export default new web3.eth.Contract(abi, address)