// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;
import "./Product.sol";

contract Order {
        
    struct OrderInfo{
        address customer;
        Product product;
        string paymentMethod;
        bool fulfilled;
    }
    
    mapping (address => OrderInfo) public orders;
    
    function recordOrder(address _customer, Product _product, string  memory _paymentMethod, bool _fulfilled) public {
        orders[address(this)] = OrderInfo(_customer, _product, _paymentMethod, _fulfilled);
    }
    
    function getOrder() public view returns (address, Product, string memory, bool) {
        OrderInfo storage order = orders[address(this)];
        return (order.customer, order.product, order.paymentMethod, order.fulfilled);
    }

}
