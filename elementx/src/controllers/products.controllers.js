import Products from '../models/Products';
import Categories from '../models/Categories';
import { uploadImage } from '../helpers/cloudinary.js';
import { createProductSchema } from '../libs/schema.validator';
import createError from 'http-errors';
/*----------------GETTING ALL PRODUCTS-----------------*/

export const getProducts = async (req, res, next) => {
  try {
    const products = await Products.find().populate('category', {
      name: 1,
      _id: 0,
    });
    res.json(products);
  } catch (error) {
    if (error.isJoi) error.status = 400;
    next(error);
  }
};

/*----------------GETTING PRODUCT-----------------*/

export const getProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const productFound = await Products.findById(id).populate('category', {
      name: 1,
      _id: 0,
    });
    if (!productFound) throw createError.NotFound('Product don´t exist');
    res.json(productFound);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/*----------------CREATE PRODUCT-----------------*/

export const createProducts = async (req, res, next) => {
  try {
    let imageURL = '';
    const { name, category, price, rating, description, stock, brand } =
      req.body;

    const productFound = await Products.findOne({ name: name });

    if (productFound) throw createError.Conflict('Product Already exists');

    if (req.files && req.files.image) {
      const img = await uploadImage(req.files.image.tempFilePath);
      imageURL = img.secure_url;
      console.log(imageURL);
    }

    const foundCategory = await Categories.findById(category);
    const newProduct = new Products({
      name,
      category,
      price,
      rating,
      description,
      stock,
      brand,
      images: {
        url: imageURL,
      },
    });
    newProduct.image = imageURL;
    newProduct.category = foundCategory._id;

    await newProduct.save();

    foundCategory.products = foundCategory.products.concat(newProduct._id);
    foundCategory.save();

    res.json(newProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/*----------------UPDATE PRODUCT-----------------*/

export const updateProducts = async (req, res, next) => {
  console.log(req.body);
  console.log(req.params);
  const { id } = req.params;
  try {
    const updateProduct = await Products.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

/*----------------DELETE PRODUCT-----------------*/

export const deleteProducts = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Products.findByIdAndDelete(id);

    if (deletedProduct) return res.sendStatus(204);

    return res.sendStatus(404);
  } catch (error) {
    next(error);
    console.log(error);
  }
};
