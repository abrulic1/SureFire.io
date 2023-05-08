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
        // // Calculate gas cost of the transaction
        // uint gasCost = gasleft() * tx.gasprice;
        // // Check if the sender has enough ether to cover gas cost
        // require(msg.sender.balance >= gasCost, "Not enough ether to cover gas costs.");
        require(price > 0, "Price must be greater than zero.");
        require(stock > 0, "Amount must be greater than zero.");
        for(uint i=0; i<productCount; i++)
            if(keccak256(bytes(products[i].name)) == keccak256(bytes(name)))
             revert("Product with this name already added");
        
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


    function getContractBalance() public view returns (uint) {
            return address(this).balance;
        }



    function purchase(string memory name, uint amount) public payable{
        for (uint i = 0; i < productCount; i++) {
            if (keccak256(abi.encodePacked(products[i].name)) == keccak256(abi.encodePacked(name))) {
                require(products[i].stock >= amount, "There are not enough products with this name!");
                require(msg.value >= products[i].price * amount, "Incorrect payment amount!");
                products[i].stock -= amount;
                payable(owner).transfer(convertToWei(msg.value));
                return;
              }
            }
            revert("Product not found!");
    }
  } 
