import React from "react";
import './card.styles.css'
import Input from "../Input/input";
import Button from "../Button/buttton"

const Card = ({ manager, players, price, winner, enter, pickWinner }) => {
    return(
       <div className="container">
        <div className="card">
           <h2> Lottery Contract</h2>
           <h5>This contract is managed by { manager }</h5>
           <h5>There are currently { players } players entered, competing to win { price } ether</h5>
           <h4>Want to try your luck.....</h4>
           <h5>Amount of ether to enter <Input initialValue={ 0.1 }/> </h5>
            <Button text={'Enter'} click={ enter }/>
            <br></br>
           <h4>Time to pick a winner...</h4>
           <Button text={'Pick Winner'} click={ pickWinner }/>
           <br></br>
           <h4>{ winner } has won</h4>
        </div>
       </div>
    )
}

export default Card