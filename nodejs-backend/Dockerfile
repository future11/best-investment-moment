FROM node:16

LABEL version="1.0"
LABEL description="This is the docker image for 'Best Investment Moment for Gold Price' Nodejs backend."
LABEL maintainer = ["benjamin.lee00715@gmail.com"]

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]