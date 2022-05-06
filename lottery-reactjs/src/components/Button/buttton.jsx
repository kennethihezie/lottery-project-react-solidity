import React from "react";
import './button.styles.css'

const Button = ({ click, text }) => {
   return (
     <button onClick={ click }>{ text }</button>
   )
}

export default Button