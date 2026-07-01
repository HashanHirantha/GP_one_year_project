# Use the official Puppeteer Node.js image which includes Chrome and all necessary dependencies pre-installed
FROM ghcr.io/puppeteer/puppeteer:21.5.0

# Set environment variables for Puppeteer
# This skips downloading another Chromium binary since it is already included in the image
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome

# Set the working directory inside the container
WORKDIR /app

# Copy dependency definition files
COPY package*.json ./

# Install dependencies (using npm ci for clean, deterministic builds)
RUN npm ci

# Copy the rest of the application files
COPY . .

# Expose the API server port
EXPOSE 3001

# Command to run the application
CMD ["node", "server.js"]
