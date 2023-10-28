FROM node:18-alpine3.18

# Create app directory
WORKDIR /app

# Copy dependency list
COPY ./package.json .

RUN npm install

# Copy remaining files
COPY . .

# Set a default value for the port (can be overridden)
ENV PORT=5000

# Pass the environment variable to the app
CMD ["sh", "-c", "npm run start:prod -- --port $PORT"]
