FROM node:16

LABEL version="1.0"
LABEL description="This is the docker image for 'Best Investment Moment for Gold Price' Reactjs frontend."
LABEL maintainer = ["benjamin.lee00715@gmail.com"]

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

EXPOSE 4000

CMD ["npm", "start"]