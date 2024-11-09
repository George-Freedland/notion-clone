# Development stage
FROM node:18-alpine AS development
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy source code
COPY . .

# Start the application in development mode
EXPOSE 5173
CMD ["npm", "run", "dev"]

# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY index.html ./
COPY vite.config.ts ./
COPY src ./src
COPY public ./public

# Install dependencies and build
RUN npm ci
RUN npm run build

# Production stage
FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:5173/ || exit 1

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
