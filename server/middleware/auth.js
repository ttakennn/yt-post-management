import jwt from 'jsonwebtoken';
import { USER } from '../constant/user.js';

const auth = async (req, res, next) => {
  try {
    const authorization = req?.headers?.authorization;

    if (!authorization) {
      return res.status(500).json({ message: 'Unauthorization' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = jwt.decode(token);

    const hasGoogleId = decodeToken?.sub || '';
    const decodeData = hasGoogleId
      ? jwt.decode(token)
      : jwt.verify(token, USER.SECRET_KEY);

    if (hasGoogleId) {
      req.userId = decodeData.sub;
    } else {
      req.userId = decodeData.id;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
