const CreateShop = artifacts.require('CreateShop');

/**
 * You have to install ganache and open that on your local machine, or add ganache-cli dependency and import here in tests and use it to get test accounts. 
 * More informations can be find on internet, I am using ganache app 
 * Steps to run tests: npx truffle test --network development (with this we will get 10 test accounts from Ganache - local blockchain, and use them in test methods)
 * 
 */

contract('CreateShop', async accounts => {
    let shop;

    before('Should check is smart contract deployed', async () => {
        shop = await CreateShop.new({ from: accounts[0] });
        assert(shop.address != '');
    });

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
            await shop.addProduct('apple', 'description will be added later', web3.utils.toWei("0.1", "ether"), 4, { from: accounts[0] });
            const result = await shop.products(await shop.productCount() - 1);
            assert.equal(result.name, 'apple', `Actual value is ${result.name} and expected is apple`);
            assert.equal(result.price, web3.utils.toWei("0.1", "ether"), `Actual value is ${result.price} and expected is ${web3.utils.toWei("0.1", "ether")}`);
            assert.equal(result.stock, 4, `Actual value is ${result.stock} and expected is 4`);
        } catch (error) {
            assert.fail('This account cannot add a new product');
        }
    });

})