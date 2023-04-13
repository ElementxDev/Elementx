import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized' });
    console.log(error);
  }
};

export const verifyAdmin = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (
        req.user.id === req.params.id ||
        req.user.isAdmin ||
        req.user.isRoot
      ) {
        next();
      } else {
        next(createError(403, 'You are not authorized'));
      }
    });
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

export const verifyRoot = (req, res, next) => {
  if (!token) return res.status(403).send({ message: 'Token is not valid!' });
  try {
    verifyToken(req, res, () => {
      if (req.user.isRoot || req.user.isAdmin) {
        next();
      } else {
        next(createError(403, 'You are not authorized'));
      }
    });
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
