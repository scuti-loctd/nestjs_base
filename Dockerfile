FROM node:16.16.0

RUN apt-get update && apt-get install -y jq postgresql-client

# Create app directory, this is in our container/in our image
WORKDIR /nest-app

RUN npm i -g @nestjs/cli pm2
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

# Creates a "dist" folder with the production build

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
