// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract CreateShop {
    
    struct ProductInfo {
        string name;
        string description;
        uint price;
        uint quantity;
    }
    
    mapping (address => ProductInfo) public products;
    address public owner;

    constructor(){
        owner = msg.sender; 
        products[address(this)] = ProductInfo("Product", "No description", 0, 0); 
    }
    
    function addProduct(string memory name, string memory description, uint price, uint quantity) public {
        require(msg.sender == owner, "Only the owner can add the product.");
        require(price > 0, "Price must be greater than zero.");
        require(quantity > 0, "Quantity must be greater than zero.");
        products[address(this)] = ProductInfo(name, description, price, quantity);
    }
    
    function getProduct() public view returns (string memory, string memory, uint, uint) {
        ProductInfo storage product = products[address(this)];
        return (product.name, product.description, product.price, product.quantity);
    }
    
    function convertToWei(uint amountInEth) public pure returns (uint) {
        return amountInEth * 10**15;
    }

      function restock(uint amount) public {
        require(msg.sender == owner, "Only the owner can restock this product.");   
        require(amount > 0, "Quantity must be greater than zero.");
        products[address(this)].quantity += amount;
    }

    function purchase(uint amount) public payable {
        //payable - function which needs to receive ethers
        require(msg.value >= amount * products[address(this)].price, string(abi.encodePacked("You must pay at least ", products[address(this)].price, " Wei per ", products[address(this)].name)));
        require(amount <= products[address(this)].quantity, "Not enough products in stock.");
        products[address(this)].quantity -= amount;
        products[msg.sender].quantity += amount; //purchaser account 
    }
    
}
