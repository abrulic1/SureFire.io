import React, { useRef } from "react";
import AddItemStyles from './AddItem.module.css';
import AddItemIcon from './add-image.png';

const AddItem = () => {
  const fileInputRef = useRef(null);

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
  };

  return (
    <>
      <div className={AddItemStyles.item}>
        <div className={AddItemStyles['item-photo']}>
          <img
            src={AddItemIcon}
            alt="Add Item Icon"
            onClick={handleImageUpload}
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        <div className={AddItemStyles.info}>
          <h2>Name</h2>
          <input></input>
          <h2>Description</h2>
          <input></input>
          <h2>Price</h2>
          <input></input>
          <h2>ETH</h2>
        </div>
      </div>
      <div>
        <button>Save</button>
      </div>
    </>
  );
};

export default AddItem;
