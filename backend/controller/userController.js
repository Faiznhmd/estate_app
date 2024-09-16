import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get users' });
  }
};
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findMany({
      where: { id },
    });
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get users' });
  }
};
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;
  if (id !== tokenUserId) {
    return res.status(403).json({ message: 'Not Authorized' });
  }

  let updatdPassword = null;
  try {
    if (password) {
      updatdPassword = await bcrypt.hash(password, 10);
    }
    const updateUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatdPassword && { password: updatdPassword }),
        ...(avatar && { avatar }),
      },
    });
    res.status(200).json(updateUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get users' });
  }
};

//deleteUser

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  if (id !== tokenUserId) {
    return res.status(403).json({ message: 'Not Authorized' });
  }
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: 'User deleted ' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get users' });
  }
};
