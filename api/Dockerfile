# Use an official Node.js runtime as a parent image
FROM node:20-bullseye-slim

# Set the working directory
WORKDIR /app

# Install system dependencies (openssl is needed for Prisma)
# Add ffmpeg for Azure Speech transcription
RUN apt-get update -y && apt-get install -y openssl ffmpeg && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Run migrations then start the application
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
