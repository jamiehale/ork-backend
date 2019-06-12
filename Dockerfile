FROM node:10
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json yarn.lock /usr/src/app/
RUN yarn
COPY . /usr/src/app
EXPOSE 8080
CMD ["yarn", "start"]
