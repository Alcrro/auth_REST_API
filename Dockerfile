FROM node:22-alpine 

WORKDIR /authapi 

COPY package.json .

RUN npm install 
EXPOSE 6000

COPY . /authapi


CMD npm start