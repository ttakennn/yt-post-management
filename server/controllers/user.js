import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { USER } from '../constant/user.js';

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
      USER.SECRET_KEY,
      {
        expiresIn: '1h',
      },
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Signup error.' });
  }
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

    res.status(200).json({ result: hasUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Signin error.' });
  }
};
