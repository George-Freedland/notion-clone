import { Request, Response, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPages: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;

    // Check if username is provided
    if (!userId) {
      res.status(400).json({ message: 'userId is required' });
      return;
    }

    // Find or create the user
    // Find the user and include their pages
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          pages: {
            select: {
              id: true,
              title: true,
            },
          },
        },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Respond with the user's pages
    res.json({
        userId: user.id,
        username: user.username,
        pages: user.pages.map(page => ({
          pageId: page.id,
          pageTitle: page.title,
        })),
      });
  } catch (error) {
    console.error('Getting pages error:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    // Close the Prisma client connection
    await prisma.$disconnect();
  }
};
