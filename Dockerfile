# ========== Base image ==========
FROM node:22-slim AS base

WORKDIR /app

# Algemene deps nodig voor Node/Prisma
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*


# ========== Stage 1: Dependencies (dev + prod, voor build) ==========
FROM base AS deps

COPY package*.json ./
RUN npm ci


# ========== Stage 2: Builder (Next.js standalone + Prisma) ==========
FROM base AS builder

WORKDIR /app

# Build-time env (Clerk)
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

ENV NODE_ENV=production

# Alle deps (incl. dev) voor de build
COPY --from=deps /app/node_modules ./node_modules

# App code
COPY . .

# Prisma client genereren (voor de build)
RUN npx prisma generate

# Next.js build -> gebruikt output: "standalone"
RUN npm run build


# ========== Stage 3: Runner (standalone) ==========
FROM node:22-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Public assets
COPY --from=builder /app/public ./public

# Standalone bundle + minimale node_modules
COPY --from=builder /app/.next/standalone ./

# Statische assets
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# Next.js standalone entrypoint
CMD ["node", "server.js"]
