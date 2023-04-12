const CreateShop = artifacts.require('CreateShop');

contract('CreateShop', ()=>{
    it('Should deploy smart contract properly', async ()=>{
        const createShop = await CreateShop.deployed();
        console.log(createShop.address);
        assert(createShop.address!='');
    })

    
})