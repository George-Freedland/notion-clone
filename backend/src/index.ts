import app from './app';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';


const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

async function startServer() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Successfully connected to database');

    // Middleware

    app.use(cors());  // This works fine with express.json() and cors()
    app.use(express.json());  // This correctly uses express.json() middleware

    // Start the server
    app.listen(port, () => {
      console.log(`🚀 Server running on port: ${port}`);
    });

    // Handle graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('SIGTERM signal received: closing HTTP server');
      await prisma.$disconnect();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Error starting server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer();
