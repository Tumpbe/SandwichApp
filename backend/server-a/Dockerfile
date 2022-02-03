# This is where you define the image for
# the server A, which implements the Swagger API.

# Start by copying the server stub to this directory.

# You should then use Noje 10 image from Docker Hub as the basis,
# and then follow the instructions linked to in assignment document.
# You should be able to produce a working installation by just
# following the instructions.

# First line is provided for your convenience.
# This line fetches the Node Docker image with tag "10"
# from Docker Hub.
FROM node:10

RUN mkdir -p /app

COPY package.json /app/package.json

WORKDIR /app
RUN npm install

COPY rabbit-utils /app/rabbit-utils
COPY utils /app/utils
COPY index.js /app/index.js
COPY api /app/api
COPY controllers /app/controllers
COPY service /app/service
COPY database /app/database
RUN chmod +x /app/utils/wait-for-it.sh

RUN npm install nodemon -g
CMD ["npm", "start"]
