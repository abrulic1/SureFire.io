import React from "react";
import AddItemStyles from './AddItem.module.css';
import AddItemIcon from './add-image.png';
const AddItem = () => {
    return (
        <>
        <div className={AddItemStyles.item}>
        <div className={AddItemStyles['item-photo']}>
            <img src={AddItemIcon}></img>
        </div>
        <div className={AddItemStyles.info}>
        <h2>Name</h2>
        <input></input>
        <h2>Description</h2>
        <input></input>
        <h2>Price</h2>
        <input></input><h2>ETH</h2>
        </div>
        </div>
        <div>
            <button>Save</button>
        </div>
        </>
    )
}


export default AddItem;