import { Product, User, Order } from '../models/';

export const getTotals = (req, res, next) => {
  const getTotalProducts = Product.countDocuments();
  const getTotalUsers = User.countDocuments();
  const getTotalOrders = Order.countDocuments();
  const getTotalPurchases = Order.countDocuments({ orderStatus: 'complete' });

  Promise.all([
    getTotalProducts,
    getTotalUsers,
    getTotalOrders,
    getTotalPurchases,
  ]).then(([totalProducts, totalUsers, totalOrders, getTotalPurchases]) => {
    res.status(200).send({
      total: [
        { name: 'total products', total: totalProducts },
        { name: 'total users', total: totalUsers },
        { name: 'total orders', total: totalOrders },
        { name: 'total purchases', total: getTotalPurchases },
      ],
    });
  });
};
