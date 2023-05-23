// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract CreateShop {
    address public owner;
    mapping(address => bool) public admins;
    mapping(uint => Product) public products;
    uint public productCount = 0;
    uint public adminCount = 1;  //owner added
    struct Product {
        string name;
        string description;
        uint price;
        uint stock;
        address owner;
    }

    constructor() {
        owner = msg.sender;
        admins[msg.sender] = true; // Owner is also an admin
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function.");
        _;
    }
    
    modifier onlyOwnerOrAdmin() {
        require(msg.sender == owner || admins[msg.sender], "Only contract owner or admins can call this function.");
        _;
    }

    function addAdmin(address adminAddress) public onlyOwner() {
        require(!admins[adminAddress], "Admin with this address already exists.");
        admins[adminAddress] = true;
        adminCount++;
    }

    function removeAdmin(address adminAddress) public onlyOwner() {
        require(adminAddress != owner, "Cannot remove the contract owner as admin.");
        require(admins[adminAddress], "Admin with this address does not exist.");
        admins[adminAddress] = false;    //because I cannot remove admin from mapping
        adminCount--;
    }

    function addProduct(string memory name, string memory description, uint price, uint stock) public onlyOwnerOrAdmin() returns (Product memory) {
        require(price > 0, "Price must be greater than zero.");
        require(stock > 0, "Amount must be greater than zero.");
        for (uint i = 0; i < productCount; i++) {
            if (keccak256(bytes(products[i].name)) == keccak256(bytes(name)))
                revert("Product with this name already added");
        }

        Product memory newProduct = Product(name, description, price, stock, msg.sender);
        products[productCount++] = newProduct;
        return newProduct;
    }

    function convertToWei(uint amountInEth) private pure returns (uint) {
        return amountInEth * 10 ** 18;
    }

    function restock(string memory name, uint amount) public onlyOwnerOrAdmin() returns (Product memory) {
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

    function purchase(string memory name, uint amount) public payable {
        for (uint i = 0; i < productCount; i++) {
            if (keccak256(abi.encodePacked(products[i].name)) == keccak256(abi.encodePacked(name))) {
                require(products[i].stock >= amount, "There are not enough products with this name!");
                require(msg.value >= products[i].price * amount, "Incorrect payment amount!");
                products[i].stock -= amount;
                transferToAdmin(msg.value, msg.sender);
                return;
            }
        }
        revert("Product not found!");
    }

    //sol contract complexity will increase if I add a function to return an array of admins, which is not provided automaticaly (beucase its 'mapping') and it will cost more gas, because of that I will on backend store all admins in database

    function transferToAdmin(uint amount, address sender) private {
        uint adminShare = amount / 2; // Split the payment equally between the owner and the sender (admin)
        payable(owner).transfer(adminShare);
        payable(sender).transfer(adminShare);
    }
}
