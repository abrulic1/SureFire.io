// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract Product{
    //name, description, price, quantity
    address public owner;    
    string public name;
    string public description;
    
    mapping (address => uint) public productBalances;           

    constructor(){
        owner = msg.sender; 
        productBalances[address(this)] = 100; 
    }

    function getVendingMachineBalance() public view returns (uint){
        return productBalances[address(this)];
    }

    function restock(uint amount) public {
        require(msg.sender == owner, "Only the owner can restock this machine.");   //You have to be an owner of this contract to increase amount of donuts on the blockchain.
        productBalances[address(this)] += amount;
    }

    function purchase(uint amount) public payable {
        //payable - function which needs to receive ether

        require(msg.value >= amount * 0.00001 ether, "You must pay at least 0.00001 ether per donut.");    //2 ether is donut's price 
        require(amount <= productBalances[address(this)], "Not enough donuts in stock.");

        productBalances[address(this)] -= amount;
        productBalances[msg.sender] += amount; //purchaser account 
    }
}