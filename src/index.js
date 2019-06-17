import { config } from 'dotenv';
import createApp from './app';
import connectRepository from './db';

/* eslint-disable no-console */

config();

const {
  PORT,
  MONGO_URL,
  MONGO_DB,
} = process.env;

console.log(`PORT = ${PORT}`);
console.log(`MONGO_URL = ${MONGO_URL}`);
console.log(`MONGO_DB = ${MONGO_DB}`);

const run = () => {
  connectRepository(MONGO_URL, MONGO_DB)
    .then((repository) => {
      createApp(repository)
        .listen(PORT, () => console.log(`Listening on port ${PORT}`));
    })
    .catch((error) => {
      console.log(error);
      process.exit(-1);
    });
};

run();
