# This is where you define the image for
# the server B which processes the orders.

# You should then use Noje 10 image from Docker Hub as the basis,
# and then follow the instructions linked to in assignment document.
# You should be able to produce a working installation by just
# following the instructions.

# First line is provided for your convenience.
# This line fetches the Node Docker image from Docker Hub
# which has been tagged "10"
FROM node:latest

WORKDIR /app
RUN npm install nodemon -g

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install

COPY rabbit-utils /app/rabbit-utils
COPY index.js /app/index.js
COPY utils /app/utils
RUN chmod +x /app/utils/wait-for-it.sh
CMD ["npm", "start"]