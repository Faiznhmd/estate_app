import jwt from 'jsonwebtoken';

export const shouldBeLogin = async (req, res) => {
  console.log(req.userId);
  res.status(200).json({ message: 'You are authenticated' });
};

//admin
export const shouldBeAdmin = async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'Not Authorized' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return res.status(403).json({ message: ' Token is not verified' });

    if (!payload.isAdmin) {
      return res.status(403).json({ message: 'Not Authorized' });
    }
  });
  res.status(200).json({ message: 'You are authenticated' });
};
