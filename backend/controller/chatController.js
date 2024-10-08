import prisma from '../lib/prisma.js';

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;
  // console.log(tokenUserId, 'tokenid');
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    for (const chat of chats) {
      // console.log(chat);
      const recieverId = chat.userIDs.find((id) => id !== tokenUserId);
      // console.log(recieverId, 'iddsss');
      const reciever = await prisma.user.findUnique({
        where: {
          id: recieverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.reciever = reciever;
    }
    res.status(200).json({ message: 'Success', data: chats });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to get Chat' });
  }
};

export const getSingleChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Cannot get a chat' });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, req.body.receiverId],
      },
    });
    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to add chat' });
  }
};
export const readChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to read the message' });
  }
};
