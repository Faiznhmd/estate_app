import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  //hashedPAssword
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  console.log(newUser);
};

export const login = async (req, res) => {
  res.send('login');
};
export const logout = async (req, res) => {
  res.send('logout');
};
