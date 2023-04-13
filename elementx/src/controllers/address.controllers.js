import { Address, User } from '../models';
export const addDirection = async (req, res, next) => {
  console.log(req.body);
  const zone = {
    zone_1: 'Ciudad de Panamá y Colón',
    zone_2: '  Azuero y Provincias Centrales',
    zone_3: ' Chiriquí y Bocas del Toro',
  };
  try {
    const { province, phoneNumber, branch, note } = req.body;
    const user = await User.findById(req.userId);
    const address = new Address({
      userId: user._id,
      province: zone[province],
      branch,
      phoneNumber,
      note,
    });
    const savedAddress = await address.save();
    user.addresses = user.addresses.concat(savedAddress._id);
    await user.save();
    res.json(savedAddress).status(201);
  } catch (error) {
    console.log(error);
    if (error.isJoi) error.status = 400;
    next(error);
  }
};
