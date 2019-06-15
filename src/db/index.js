import { MongoClient } from 'mongodb';
import campaigns from './campaigns';
import people from './people';

const repository = db => ({
  ...campaigns(db),
  ...people(db),
});

export default (url, databaseName) => MongoClient.connect(url, { useNewUrlParser: true })
  .then(client => repository(client.db(databaseName)));
