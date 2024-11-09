import { Request, Response, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.body;

    // Check if username is provided
    if (!username) {
      res.status(400).json({ message: 'Username is required' });
      return;
    }

    // Find or create the user
    let user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { username },
      });
    }

    // Respond with the user data
    res.json({
      userId: user.id,
      username: user.username,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    // Close the Prisma client connection
    await prisma.$disconnect();
  }
};
