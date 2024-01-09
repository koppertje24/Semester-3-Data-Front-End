# Step 1: Pull the base image
FROM node:14

# Step 2: Copy package.json and package-lock.json
COPY package*.json ./

# Step 3: Install dependencies
RUN npm install

# Step 4: Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Step 5: Expose the port and start the app
EXPOSE 5000
CMD ["npm", "start"]
