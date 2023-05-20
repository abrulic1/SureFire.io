const Order = require('../models/order');

const addOrder = async (req, res) => {
    const { user, product } = req.body;
    console.log("addOrder");
    const newOrder = new Order({
        user: user,
        product: product
    });

    await Order.create(newOrder).then(savedOrder => {
        console.log('Order saved successfully!');
        res.status(200).json(savedOrder);
    }
    ).catch(err => {
        console.error(err);
        res.status(500).json({error: 'Error saving order!'});
    })
};

// const updateOrder = async (req, res) => {
//     console.log("Pozvana ruta iz order controllera za update narudzbe");
// }

const getOrderByUser = async (req, res) => {
    try {
        const order = await Order.find({ user: req.params.user_id });
        if (order.length == 0) {
           return res.status(404).send("Order for this user not found");
        }
        res.status(200).send(order);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error. Check console for more info' });
    }
}

exports.addOrder = addOrder;
exports.getOrderByUser = getOrderByUser;
