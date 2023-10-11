import React from "react";
import './Recommended.css';
import { addItem } from "../Redux/cartSlice";
import { useDispatch } from "react-redux";

const Recommended = (props) => {

    const {itemCardValue} = props;
    const {name, price} = itemCardValue?.card?.info;
    const dispatch = useDispatch();
    

    const handleClick = (items) => {
        dispatch(addItem(items));
    }

    return (
        <div className="recommended-container">
            <div className="accordion">
            <div className="dis-item">
            <p>{name}</p> 
            <p>-</p>
            <p>₹ {(price/100).toFixed(2)}</p>
            </div>
            <button onClick={() => handleClick([name,price])}>ADD</button>
            </div>
        </div>
    )
}

export default Recommended;