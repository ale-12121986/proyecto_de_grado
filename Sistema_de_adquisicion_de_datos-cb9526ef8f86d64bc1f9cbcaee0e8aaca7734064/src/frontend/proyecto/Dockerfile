FROM node:18

WORKDIR /src/frontend/proyecto

COPY package*.json ./

RUN npm install -g @ionic/cli @angular-devkit/build-angular && npm install && npm install chart.js@2.9.4 --save

EXPOSE 8100

CMD ["npm", "start"]