import Categories from '../models/Categories';

export const createCategories = async () => {
  try {
    const count = await Categories.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Categories({ name: 'general' }).save(),
      new Categories({ name: 'computación' }).save(),
      new Categories({ name: 'audio y vídeo' }).save(),
      new Categories({ name: 'Impresoras y Tintas' }).save(),
      new Categories({ name: 'Perisféricos' }).save(),
      new Categories({ name: 'Componetes de Computadoras' }).save(),
      new Categories({ name: 'Programas de Computadoras' }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.log(error);
  }
};
