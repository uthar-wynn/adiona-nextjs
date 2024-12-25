# Stage 1: Build the application
FROM node:22-alpine AS builder

WORKDIR /app

RUN apk add --no-cache openssl

# Install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Stage 2: Run the application
FROM node:22-alpine AS runner

WORKDIR /app

# Install necessary dependencies
RUN apk add --no-cache libc6-compat openssl

# Copy built files and node_modules from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public

# Set environment variables
ENV NODE_ENV production
ENV PRISMA_CLI_QUERY_ENGINE_LIBRARY openssl-1.1.x

# Expose the port the app runs on
EXPOSE 3000

# Run the entrypoint script
ENTRYPOINT ["npm", "start"]