import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { USER } from '../constant/user.js';
import { COOKIE } from '../config/cookie.js';

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const hasUser = await User.findOne({ email });

    if (hasUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password dont match.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: '3s',
      },
    );

    res = await setRefreshTokenToUser(res, result, jwt);

    res.status(200).json({
      result: {
        _id: result._id,
        name: result.name,
        email: result.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Signup error.' });
  }
};

const setRefreshTokenToUser = async (res, user, jwt) => {
  const refreshToken = jwt.sign(
    { email: user.email, id: user._id },
    process.env.REFRESH_TOKEN,
    { expiresIn: '3s' },
  );

  user.refreshToken = refreshToken;

  await User.findByIdAndUpdate(user._id, user);

  res.cookie('jwt', refreshToken, COOKIE);
  return res;
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hasUser = await User.findOne({ email });
    if (!hasUser) {
      return req.status(404).json({ message: 'User doesnt exist.' });
    }

    const isPassCorrect = await bcrypt.compare(password, hasUser.password);

    if (!isPassCorrect) {
      return req.status(404).json({ message: 'Password incorrectly.' });
    }

    const token = jwt.sign(
      { email: hasUser.email, id: hasUser._id },
      USER.SECRET_KEY,
      { expiresIn: '1h' },
    );

    res = await setRefreshTokenToUser(res, hasUser, jwt);

    res.status(200).json({
      result: {
        _id: hasUser._id,
        name: hasUser.name,
        email: hasUser.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Signin error.' });
  }
};

export const refreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const refreshToken = cookies.jwt;

  const user = await User.findOne({ refreshToken });

  if (!user) return res.status(403).json({ message: 'Forbidden' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err || user.email !== decoded.email) {
      return res.status(403).json({ message: 'Refresh token error: ', err });
    }

    const accessToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: '3s',
      },
    );

    res.json({ accessToken });
  });
};

export const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }

  const refreshToken = cookies.jwt;
  const user = await User.findOne({ refreshToken });

  if (!user) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    return res.sendStatus(204);
  }

  await User.findByIdAndUpdate(
    { _id: user._id },
    {
      refreshToken: '',
    },
  );

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
  return res.sendStatus(204);
};
