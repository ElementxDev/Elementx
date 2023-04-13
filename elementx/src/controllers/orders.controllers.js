import nodemailer from 'nodemailer';
import { Order, User, Product } from '../models';
import createError from 'http-errors';
import {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  ELEMENTX_LOCAL_HOME_PAGE,
} from '../config';
/*----------------CREATE ORDER-----------------*/

/*----------------function reduce stock-----------------*/
const reduceStock = async (products) => {
  for (let i = 0; i < products.length; i++) {
    try {
      const product = await Product.findById(products[i].id);
      product.stock = product.stock - products[i].quantity;
      await product.save();
    } catch (error) {
      console.log(error);
    }
  }
};
/*----------------function reduce stock-----------------*/
export const createOrder = async (req, res, next) => {
  console.warn(req.body);
  console.log(req.userId);
  try {
    const {
      paymentId,
      email,
      name,
      payer_id,
      amount,
      currency,
      cart_id,
      products,
      province,
      subsidiary,
      totalItems,
      address,
    } = req.body;

    const address_data = address !== '' ? '' : JSON.parse(address);
    // const address_data = JSON.parse(address);
    const user = await User.findById(req.userId);
    // const address = await Address.findById(addressId);
    console.log(user);
    const newOrder = new Order({
      paymentId,
      userId: user._id,
      products: JSON.parse(products),
      name,
      email,
      payer_id,
      currency,
      cartId: cart_id,
      amount,
      province,
      subsidiary,
      orderStatus: 'pending',
      totalItems,
      province: address_data.province || 'Cocle',
      branch: address_data.branch || 'Penonome',
      phoneNumber: address_data.phoneNumber || 'N/A',
      note: address_data.note || 'N/A',
    });

    reduceStock(JSON.parse(products));

    console.log(newOrder);
    const savedOrder = await newOrder.save();

    user.orders = user.orders.concat(savedOrder._id);

    // address.orderId = savedOrder._id;
    // await address.save();
    await user.save();
    /*----------------function to send email to confirm order-----------------*/
    const trasnsporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const contentHTML = `<h1>Gracias por su pedido</h1>
      <p>Su pedido se ha realizado correctamente. Le enviaremos un correo electrónico cuando su pedido esté listo para ser enviado.</p>
      <p>La identificación de su pedido es ${savedOrder._id}</p>
      <p>¡Gracias por comprar con nosotros!</p>`;

    const sendMail = await trasnsporter.sendMail({
      from: "'elementX Team' <support@elementx.online>",
      to: savedOrder.email,
      subject: 'Confirmation Email',
      html: contentHTML,
    });

    console.log(sendMail);

    // await sendEmail(emailData);
    /*----------------function to send email to confirm order-----------------*/

    res.json(savedOrder);
  } catch (error) {
    if (error.isJoi) error.status = 400;
    next(error);
    console.log(error);
  }
};
/*----------------UPDATE ORDER-----------------*/
export const updateOrder = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );
    res.json(updateOrder);
  } catch (error) {
    if (error.isJoi) error.status = 400;
    console.log(error);
    next(error);
  }
};
/*----------------DELETE ORDER-----------------*/
export const deleteOrder = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

    res.json(deletedOrder);
  } catch (error) {
    if (error.isJoi) error.status = 400;
    console.log(error);
    next(error);
  }
};
/*----------------GET ORDER-----------------*/
export const getOrder = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.userId);

  try {
    const userOrder = await Order.findById(id);

    if (userOrder.userId.toString() !== req.userId) {
      throw createError(404, 'Not Found');
    }

    res.json(userOrder);
  } catch (error) {
    if (error.isJoi) error.status = 400;
    console.log(error);
    next(error);
  }
};
/*----------------GET USER ORDERS-----------------*/
export const getUserOrders = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userOrders = await Order.find({ user: id }).populate('products', {});
    if (!userOrders) {
      res.json([]);
    }
    res.json(userOrders);
  } catch (error) {
    if (error.isJoi) error.status = 400;
    console.log(error);
    next(error);
  }
};
/*----------------GET ALL ORDERS-----------------*/
export const getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await Order.find().populate('products', {
      name: 1,
      images: 1,
      _id: 0,
    });

    res.json(allOrders);
  } catch (error) {
    if (error.isJoi) error.status = 400;
    console.log(error);
    next(error);
  }
};
