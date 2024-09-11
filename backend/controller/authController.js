import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

// Register
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //hasedpassword
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    // console.log(newUser);
    res.status(200).json({ message: 'User created Successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create user' });
  }
};

//login

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    //check for username
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) return res.status(400).json({ message: 'User do not found' });

    // check for password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: 'Password Do not found' });

    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: age }
    );

    res
      .cookie('token', token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json({ message: 'Login successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to login' });
  }
};

//logout
export const logout = async (req, res) => {
  res.clearCookie('token').status(200).json({ message: 'Logout Successfully' });
};
