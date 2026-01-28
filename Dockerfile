FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install ALL dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build for Node.js server (not Vercel)
ENV NITRO_PRESET=node-server
RUN pnpm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=8080
ENV NODE_ENV=production

COPY --from=builder /app/.output /app/.output

EXPOSE 8080

CMD ["node", ".output/server/index.mjs"]