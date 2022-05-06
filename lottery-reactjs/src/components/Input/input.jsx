import React from "react";
import "./input.styles.css"

const Input = ({ initialValue, onChange }) => {
    return (
        <input type="number" name="ether" id="ether" onChange={ onChange } value={ initialValue }/>
    )
}

export default Input