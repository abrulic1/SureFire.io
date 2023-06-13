import React, { useRef, useState } from "react";
import AddItemStyles from './AddItem.module.css';
import AddItemIcon from './add-image.png';
import Button from '../Button/Button';
import { addProduct } from "../../services/contract-service";

const AddItem = () => {
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleStockChange = (event) => {
    setStock(event.target.value);
  };

  const handleSave = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("owner", localStorage.getItem("account"));
      formData.append('name', name);
      formData.append('image', imageFile);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('stock', stock);
      await addProduct(localStorage.getItem("account"), formData, name, price, stock);
    }
  };

  return (
    <>
     <h1>ADD PRODUCT</h1>
      <div className={AddItemStyles.item}>
        <div className={AddItemStyles['item-photo']}>
          {imagePreview ? (
            <img src={imagePreview} alt="Selected" onClick={handleImageUpload} className={AddItemStyles.uploaded}/>
          ) : (
            <img src={AddItemIcon} alt="Add Item Icon" onClick={handleImageUpload} />
          )}
          
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
          <input type="text" value={name} onChange={handleNameChange} />
          <h2>Description</h2>
          <input type="text" value={description} onChange={handleDescriptionChange} />
          <h2>Price</h2>
          <input type="number" value={price} onChange={handlePriceChange} />
          <h2>Quantity</h2>
          <input type="number" value={stock} onChange={handleStockChange} />
        </div>
      </div>
      <div>
        <button onClick={handleSave}>Save</button>
      </div>
  
    </>
  );
};

export default AddItem;
