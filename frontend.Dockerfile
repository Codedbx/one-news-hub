# Use official Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install git (sometimes needed for npm dependencies)
RUN apk add --no-cache git

# Copy package.json and package-lock.json
COPY ./news-frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy entire frontend project
COPY ./news-frontend ./

# Expose port for Vite dev server
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
