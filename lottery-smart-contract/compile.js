const path = require('path')
const fs = require('fs')
const solc = require('solc')

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol')
const src = fs.readFileSync(lotteryPath, 'utf8')
const input = {
    language: 'Solidity',
    sources: {
      'Lottery.sol': {
        content: src,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

//console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts);

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Lottery.sol'].Lottery