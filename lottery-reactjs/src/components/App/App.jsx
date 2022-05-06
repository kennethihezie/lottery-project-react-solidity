import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import web3 from '../../web3/web3';
import lottery from '../../web3/lottery';
import './card.styles.css'
import Input from "../Input/input";
import Button from "../Button/buttton"


class App extends Component{
  // constructor(props){
  //   super(props)

  //   this.state = {
  //    manager: '',
  //    players: [],
  //    poolPrice: '',
  //    winner: ''
  //   }
  // }

  //this is equivalent to the above code.
    state = {
       manager: '',
       players: [],
       balance: '',
       winner: '0',
       value: '0.11',
       isManager: false
    }


  async componentDidMount(){
     const manager = await lottery.methods.manager().call()
     const players = await lottery.methods.getAllPlayers().call()
     const balance = await web3.eth.getBalance(lottery.options.address)
     const account = await web3.eth.getAccounts()
     if(account[0] == '0x3372de3f5424524561783282D4Fb59f7B341E696'){
       this.setState({ isManager: true})
     }
     this.setState({ manager, players, balance })
  }

  onSubmit = async (event) => {
    event.preventDefault()
    // const accounts = await web3.eth.getAccounts()
    // this.setState({ message: 'Waiting on transaction success...' })
    // await lottery.methods.enter().send({ from: accounts[0], value: web3.utils.toWei(this.state.value, 'ether') })
    // this.setState({ message: 'You have been successfully entered the game...' })

    web3.eth.getAccounts().then(async (acct) => {
          this.setState({ message: 'Waiting on transaction success...' })
          lottery.methods.enter().send({ from: acct[0], value: web3.utils.toWei(this.state.value, 'ether') }).then( async () => {
              this.setState({ 
                message: 'You have successfully entered the game...', 
                players: await lottery.methods.getAllPlayers().call(), 
                balance: await web3.eth.getBalance(lottery.options.address) 
              })
              console.log('players', await lottery.methods.getAllPlayers().call());
          })
    })
  }

  onClick = async (event) => {
    event.preventDefault()

    // const accounts = await web3.eth.getAccounts()
    // this.setState({ message: 'Waiting on transaction success...' })
    // await lottery.methods.pickWinner().send({
    //   from: accounts[0]
    // })
    // this.setState({ message: 'A winner has been picked...', winner: await lottery.methods.lastWinner().call() })

    web3.eth.getAccounts().then( async (acct) => {
        this.setState({ message: 'Waiting on transaction success...' })
        lottery.methods.pickWinner().send({ from: acct[0] }).then( async () => {
            this.setState({ message: 'A winner has been picked...', 
            winner: await lottery.methods.lastWinner().call(),
            players: await lottery.methods.getAllPlayers().call(), 
            balance: await web3.eth.getBalance(lottery.options.address) 
          })
        })
    })
  }

  onChange = (event) => {
     this.setState({ value: event.target.value })
  }


  render(){
    return (
      // <div>
      //   <h2>Lottery Contract</h2>
      //   <p>This contract is managed by { this.state.manager }</p>
      //   <p>TThere are currently { this.state.players.length } people competting to win { web3.utils.fromWei(this.state.balance, 'ether') } ether!</p>
      //   {/* horozontal divider */}
      //   <hr />
      //   <form onSubmit={ this.onSubmit }>
      //     <h4>Want to try your luck</h4>
      //     <div>
      //       <label>Amount of ether to enter</label>
      //       <input 
      //       value={ this.state.value }
      //       onChange={ event => this.setState({ value: event.target.value })} />
      //     </div>
      //     <button>Enter</button>
      //   </form>

      //   <hr />
      //   <h4>Ready to pick a winner?</h4>
      //   <button onClick={ this.onClick }>Pick a winner</button>
      //   <hr />
      //   <h1>{ this.state.message }</h1>
      // </div>
      // <Card 
      // manager= { this.state.manager } 
      // players={ this.state.players.length } price={ web3.utils.fromWei(this.state.balance, 'ether') } 
      // winner={ this.state.winner }
      // enter={ enter }
      // pickWinner={ pickWinner }/>

      <div className="container">
      <div className="card">
        <center>
        <h2> Lottery Contract</h2>
         <h5>This contract is managed by { this.state.manager }</h5>
         <h5>There are currently { this.state.players.length } players entered, competing to win { web3.utils.fromWei(this.state.balance, 'ether') } ether</h5>
         <h4>Want to try your luck.....</h4>

         <form onSubmit={ this.onSubmit }>
            <h5>Amount of ether to enter <Input onChange={ this.onChange } initialValue={ this.state.value }/> </h5>
              <Button text={ 'Enter' }/>
         </form>
        

          { this.state.isManager ? 
          <div>
            <hr />
              <h4>Time to pick a winner...</h4>
              <Button text={ 'Pick Winner' } click={ this.onClick }/> 
              <hr />
          </div> : '' 
          }
         

         <h4>{ this.state.winner } players has won</h4>

         <h4>{ this.state.message }</h4>
        </center>
      </div>
     </div>    
     );
  }

}

export default App;
