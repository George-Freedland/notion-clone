# Development stage
FROM node:18-alpine AS development
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

# Install all dependencies (including devDependencies)
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Start the application in development mode
CMD ["npm", "run", "dev"]

# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci
RUN npx prisma generate

# Copy source code
COPY src ./src

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm ci --only=production
RUN npm install @prisma/client

# Copy built assets from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/app.js"]
