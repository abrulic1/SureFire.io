// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract CreateShop {
    address public owner;
    mapping(uint => Product) public products;
    uint public productCount = 0;

    struct Product {
        string name;
        string description;
        uint price;
        uint stock;
    }

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function.");
        _;
    }

    function addProduct(string memory name, string memory description, uint price, uint stock) public onlyOwner() returns (Product memory){
        require(price > 0, "Price must be greater than zero.");
        require(stock > 0, "Amount must be greater than zero.");
        Product memory newProduct = Product(name, description, price, stock);
        products[productCount++] = newProduct;
        return newProduct;
    }

    function convertToWei(uint amountInEth) private pure returns (uint) {
        return amountInEth * 10 ** 18;
    }

    function restock(string memory name, uint amount) public onlyOwner() returns (Product memory){
        require(amount > 0, "Amount must be greater than zero.");

        for (uint i = 0; i < productCount; i++) {
            if (keccak256(bytes(products[i].name)) == keccak256(bytes(name))) {
                products[i].stock += amount;
                return products[i];
            }
        }
        revert("Product not found");
    }

    function purchase(string memory name, uint amount) public payable returns (Product memory){
        for (uint i = 0; i < productCount; i++) {
            if (keccak256(bytes(products[i].name)) == keccak256(bytes(name))) {
                require(products[i].stock > amount, "There are not enough products with this name!");
                require(msg.value >= products[i].price * amount, "Incorrect payment amount!");
                products[i].stock -= amount;
                payable(owner).transfer(convertToWei(msg.value));
                return products[i];
              }
            }
            revert("Product not found!");
    }
  } 
