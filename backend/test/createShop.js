const CreateShop = artifacts.require('CreateShop');
/**
 * Test suite for CreateShop contract
 * @module contract/CreateShop
 */

/*
  You have to install ganache and open that on your local machine, or add ganache-cli dependency and import here in tests and use it to get test accounts. 
  More informations can be find on internet, I am using ganache app 
  Steps to run tests: npx truffle test --network development (with this we will get 10 test accounts from Ganache - local blockchain, and use them in test methods)
 */

contract('CreateShop', async accounts => {
    let shop;

    before('Should check is smart contract deployed', async () => {
        shop = await CreateShop.new({ from: accounts[0] });
        assert(shop.address != '');
    });

    /**
     * addProduct tests
     */
    it('Should check if a non-owner tried to add a product', async () => {
        try {
            await shop.addProduct('apple', 'description will be added later', web3.utils.toWei("0.1", "ether"), 4, { from: accounts[1] });
            assert.fail("Expected an error");
        }catch (error) {
            assert.include(error.message, "revert", "Error should be a revert");
        }
    });
        
    it('Should check if owner tried to add a product', async () => {
        try {
            await shop.addProduct('apple', 'description will be added later', web3.utils.toWei("5", "ether"), 4, { from: accounts[0] });
            const result = await shop.products(await shop.productCount() - 1);
            assert.equal(result.name, 'apple', `Actual value is ${result.name} and expected is apple`);
            assert.equal(result.price, web3.utils.toWei("5", "ether"), `Actual value is ${result.price} and expected is ${web3.utils.toWei("0.1", "ether")}`);
            assert.equal(result.stock, 4, `Actual value is ${result.stock} and expected is 4`);
        } catch (error) {
            assert.fail('This account cannot add a new product');
        }
    });

    it('Should check if owner tried to add a product that already exists', async () => {
        try {
            await shop.addProduct('headphones', 'description will be added later', web3.utils.toWei("5", "ether"), 2, { from: accounts[0] });
            const result = await shop.products(await shop.productCount() - 1);
            assert.equal(result.name, 'headphones', `Actual value is ${result.name} and expected is headphones`);

            await shop.addProduct('headphones', 'description will be added later', web3.utils.toWei("5", "ether"), 2, { from: accounts[0] });
            assert.fail("Expected an error");
        } catch (error) {
            assert.include(error.message, "revert", "Error should be a revert");
        }
    });



    /**
     * restock tests
     */


    //This will be added later ... 


    /**
     * purchase tests
     */
    
    debugger
    it("Should check does buyer sent enought value to buy a product", async () => {
        const amountToSend = web3.utils.toWei("15", "ether");
                try {
                    const tx = await shop.purchase("apple", 2, {from: accounts[0]});
                    tx.send({ from: accounts[1] });
                    assert.equal(tx.receipt.status, true, "Transaction failed");
                } catch (error) {
                    assert.include(error.message, "revert", "Error should be a revert");
                }
    });
})