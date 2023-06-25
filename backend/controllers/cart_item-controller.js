const Cart_Item = require('../models/cart_item');

const addCartItem = async (req, res) => {
    //BITNO: ako nije vec ovaj proizvod dodan za ovog usera, dodat ga, u suprotnom ne ...ovo cu kasnije nmg sad 
    const { cart_id, product_id, user_id } = req.body;
    const check = await Cart_Item.findOne({ cart_id: cart_id, product_id: product_id });
    if (check) {
        return res.status(404).send({ success: false, message: "Product already in database for this cart" });
    }
    const newCartItem = new Cart_Item({
        cart_id: req.body.cart_id,
        product_id: req.body.product_id
    });
     await newCartItem.save();
}


const getUserItems = async (req, res) => {
    const { cart_id } = req.query;
    const cart_items = await Cart_Item.find({ cart_id });
    if (cart_items) {
        const products = cart_items.map(u => (u.product_id));
        return res.status(200).json(products);
    }
    res.json(null);
  };


const deleteItem = async (req, res) => {
    const { product_id } = req.query;
    const { cart_id } = req.query;
    try {
        const item = await Cart_Item.findOneAndDelete({ cart_id, product_id });
      res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  };

exports.addCartItem = addCartItem;
exports.getUserItems = getUserItems;
exports.deleteItem = deleteItem;