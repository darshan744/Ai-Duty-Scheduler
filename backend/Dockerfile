#Base image (minimal smaller image)
FROM node:22-slim

# directory where all operations will be done
WORKDIR /app

# add the package json for cacheing
COPY package*.json .

RUN npm install

# Copy all the source to the dir
COPY . .

RUN npm run build

# CMD is executed when the container starts
CMD [ "npm" , "start" ]

EXPOSE 3000