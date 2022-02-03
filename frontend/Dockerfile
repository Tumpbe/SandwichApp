FROM node:alpine

RUN mkdir -p /app
WORKDIR /app
#ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
RUN npm install react-scripts -g

COPY src /app/src
COPY public /app/public

CMD ["npm", "start"]
