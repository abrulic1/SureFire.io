// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract CreateShop {
    mapping(address => Product[]) public products;
    address public owner;

    struct Product {
        string name;
        string description;
        uint price;
        uint quantity;
        string category;
    }

    constructor() {
        owner = msg.sender;
    }

    function addProduct(
        string memory name,
        string memory description,
        uint price,
        uint quantity,
        string memory category
    ) public {
        //Product[] memory allProducts = products[owner];
        //ako se proba sa postojecim imenom dodati, da preusmjeri na edit il nest, ali se tu javlja onda problem da isti proizvod moze imat razlicita imena isl...
        require(msg.sender == owner, "Only the owner can add the product.");
        require(price > 0, "Price must be greater than zero.");
        require(quantity > 0, "Quantity must be greater than zero.");
        Product memory newProduct = Product({
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            category: category
        });
        products[owner].push(newProduct);
    }

    /*
    function getProducts(address _address) public view returns (Product[] memory ) {
        return products[_address];
    }
    */

    /*
    function convertToWei(uint amountInEth) public pure returns (uint) {
        return amountInEth * 10**15;
    }
    */

    function restock(string memory name, uint amount) public {
        require(
            msg.sender == owner,
            "Only the owner can restock this product."
        );
        require(amount > 0, "Quantity must be greater than zero.");

        for (uint i = 0; i < products[msg.sender].length; i++) {
            if (
                keccak256(bytes(products[msg.sender][i].name)) ==
                keccak256(bytes(name))
            ) {
                products[msg.sender][i].quantity += amount;
                return;
            }
        }

        // // If we didn't find the product with the specified name, revert the transaction
        // revert("Product not found");
    }

    function purchase(string memory productName, uint amount) public payable {
        Product[] memory allProducts = products[owner];
        for (uint i = 0; i < allProducts.length; i++) {
            if (
                keccak256(bytes(allProducts[i].name)) ==
                keccak256(bytes(productName))
            ) {
                require(
                    msg.value >= amount * allProducts[i].price,
                    string(
                        abi.encodePacked(
                            "You must pay at least ",
                            allProducts[i].price,
                            " Wei per ",
                            allProducts[i].name
                        )
                    )
                );
                require(
                    amount <= allProducts[i].quantity,
                    "Not enough products in stock."
                );
                allProducts[i].quantity -= amount;
                payable(owner).transfer(amount * allProducts[i].price);
                payable(msg.sender).transfer(amount * allProducts[i].price);
                //products[msg.sender].quantity += amount; //purchaser account
            } else revert("Product not found!");
        }
    }
}
