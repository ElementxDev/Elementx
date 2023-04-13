import { Categories } from '../models';
export const getCategories = (req, res) => {
  Categories.find()
    .then((categories) => res.json(categories))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

export const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const categoryFound = await Categories.findOne({ name: name });

    if (categoryFound) throw createError.Conflict('Category Already exists');

    const newCategory = new Categories(req.body);

    await newCategory.save();

    res.json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
