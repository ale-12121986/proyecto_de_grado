FROM node:20.15.0
WORKDIR /src/frontend/proyecto


COPY package*.json ./

RUN npm install -g @ionic/cli @angular-devkit/build-angular && \
    npm install && \
    npm install chart.js@2.9.4 --save && \
    # npm install mqtt@3.0.0 && \
    npm install angular-csv-ext@1.0.0 && \
    # npm install xlsx --save   && \
    npm install papaparse && \
    npm install @types/papaparse --save-dev && \
    npm cache clean --force

EXPOSE 8100

CMD ["npm", "start"]