FROM docker.io/library/node:lts-alpine
WORKDIR /app

# Install application dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci

# Build application
COPY . .
RUN npm run build

# Cleanup all except build directory
RUN ls -A | grep -xv "dist" | xargs rm -r

# Serve application
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npx", "serve", "-s", "dist"]

# Define healthcheck
HEALTHCHECK --interval=5s --timeout=1s --retries=10 \
    CMD wget --no-verbose --tries=1 --spider localhost:3000
