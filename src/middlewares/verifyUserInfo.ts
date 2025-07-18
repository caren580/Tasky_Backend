import { Request, Response, NextFunction } from 'express';

export function verifyUserInfo(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, username, emailAddress, password } = req.body;

  if (!firstName) return res.status(400).json({ message: 'First name is required' });
  if (!lastName) return res.status(400).json({ message: 'Last name is required' });
  if (!username) return res.status(400).json({ message: 'Username is required' });
  if (!emailAddress) return res.status(400).json({ message: 'Email is required' });
  if (!password) return res.status(400).json({ message: 'Password is required' });

  next();
}