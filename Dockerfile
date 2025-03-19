# Use Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm install

# Copy application files
COPY . .

# If using TypeScript, build the app
RUN npm run build

# Clean up unnecessary dependencies after the build (optional)
RUN npm prune --production

# Expose the application port
EXPOSE 9000

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/index.js"]
