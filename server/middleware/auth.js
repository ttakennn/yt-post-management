import jwt from 'jsonwebtoken';

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
      : jwt.verify(token, process.env.ACCESS_TOKEN);

    if (hasGoogleId) {
      req.userId = decodeData.sub;
    } else {
      req.userId = decodeData.id;
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default auth;
