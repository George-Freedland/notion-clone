import cors from 'cors';
import authRouter from './routes/auth';
import { ApiError } from './types';
import express, { Request, Response, NextFunction, Application } from 'express';

const app: Application = express();  // Typed as express.Application

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/auth', authRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handling middleware
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
});

export default app;
