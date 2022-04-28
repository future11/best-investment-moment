FROM node:16 AS angular-frontend-build
WORKDIR /usr/src/app
COPY my-app/ ./my-app/
RUN cd my-app && npm install && npm run build

FROM node:16 AS nodejs-backend-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/my-app/dist ./my-app/dist
COPY package*.json ./
RUN npm install
COPY server.js .

EXPOSE 3080

CMD ["node", "server.js"]