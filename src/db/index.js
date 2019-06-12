import { MongoClient } from 'mongodb';
import campaigns from './campaigns';

const repository = db => ({
  ...campaigns(db),
});

export default (url, databaseName) => MongoClient.connect(url, { useNewUrlParser: true })
  .then(client => repository(client.db(databaseName)));
