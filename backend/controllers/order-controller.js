const Order = require('../models/order');

const addOrder = async (req, res) => {
  const newOrder = new Order({
    user: req.body.user,
    products: req.body.product
  });

  await Order.create(newOrder).then(savedOrder => {
    console.log('Order saved successfully!');
    res.status(200).json(savedOrder);
  }
  ).catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Error saving order!' });
  })
};


const getOrderByUserId = async (req, res) => {
  try {
    const order = await Order.findOne({ user: req.params.user_id });
    if (order == 0)
      return res.status(404).send("Order for this user not found");

    res.status(200).send(order);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Check console for more info' });
  }
}

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.order_id);
    if (!order)
      return res.status(404).json({ Error: 'Order not found' });

    order.products.push(req.body.product_id);
    await order.save();
    res.status(200).json(order);

  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: 'Server error' });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findOne({ user: req.params.user_id });
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: 'Server error' });
  }
};

exports.addOrder = addOrder;
exports.getOrderByUserId = getOrderByUserId;
exports.updateOrder = updateOrder;
exports.getUserOrders = getUserOrders;