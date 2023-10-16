FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

ENV MONGODB_USERNAME=root
ENV MONGODB_PASSWORD=secret

CMD ["npm", "start"]

# FROM node

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD [ "npm", "start" ]