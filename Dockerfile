# -----------------------------------------
# Dockerfile for building and running the Next.js app
# -----------------------------------------

# Stage 1: install dependencies and build the application
FROM node:18-alpine AS builder
ARG APP_VERSION=latest
ENV APP_VERSION=$APP_VERSION
WORKDIR /app

# Install production and development dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the Next.js application
RUN npm run build

# Label the build with the version
LABEL org.opencontainers.image.version=$APP_VERSION

# Stage 2: prepare the production image
FROM node:18-alpine AS runner
ARG APP_VERSION
ENV APP_VERSION=$APP_VERSION
LABEL org.opencontainers.image.version=$APP_VERSION
WORKDIR /app

# Only install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy build output and necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next-intl.config.cjs ./next-intl.config.cjs
COPY --from=builder /app/locales ./locales

# Expose the default Next.js port
EXPOSE 3000

# Start the Next.js production server
CMD ["npm", "start"]
