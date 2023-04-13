import axios from 'axios';
import { getPaymentToken } from '../middlewares/payment.middlewares';
import Orders from '../models/Order';
import User from '../models/User';
import {
  PAYPAL_API,
  PAYPAL_API_SECRET,
  PAYPAL_CLIENT_ID,
  ELEMENTX_ONLINE_HOME_PAGE,
} from '../config';
export const createOrder = async (req, res) => {
  let products;
  const {
    cartUser,
    cart_id,
    totalItems,
    totalPrice,
    province,
    subsidiary,
    desc,
    cartProducts,
  } = req.body;
  products = JSON.parse(cartProducts);
  try {
    const user = await User.findById(req.userId);
    const newOrder = new Orders({
      userId: cartUser,
      products,
      amount: totalPrice,
      province,
      subsidiary,
      cartId: cart_id,
      totalItems,
    });
    newOrder.userId = user._id;
    const savedOrder = await newOrder.save();
    user.orders = user.orders.concat(savedOrder._id);
    await user.save();

    const order = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: `${totalPrice}`,
          },
          description: `compra de: ${desc}`,
        },
      ],
      application_context: {
        brand_name: 'Elementx',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url:
          'https:/elementx-production.up.railway.app/payment/capture-order',
        cancel_url:
          'https:/elementx-production.up.railway.app/payment/cancel-order',
      },
    };
    const access_token = await getPaymentToken();
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
    );
    const links = await response.data.links[1];
    res.json(links);
  } catch (error) {
    console.log(error);
  }
};
export const captureOrder = async (req, res) => {
  const { token } = req.query;
  console.log(req.query);
  console.log(req.body);
  try {
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: PAYPAL_CLIENT_ID,
          password: PAYPAL_API_SECRET,
        },
      }
    );
    res.redirect(`http://localhost:3000/confirm-order/${response.data.id}`);
  } catch (error) {
    console.log(error);
  }
};
export const cancelOrder = async (req, res) => {
  res.redirect(ELEMENTX_ONLINE_HOME_PAGE);
};
