FROM node:16

COPY . /opt/app

WORKDIR /opt/app

RUN yarn

CMD yarn dev

EXPOSE 9999
