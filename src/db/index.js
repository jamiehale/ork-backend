import { MongoClient } from 'mongodb';
import campaigns from './campaigns';
import people from './people';
import places from './places';
import things from './things';
import elements from './elements';

const repository = db => ({
  ...campaigns(db),
  ...people(db),
  ...places(db),
  ...things(db),
  ...elements(db),
});

export default (url, databaseName) => MongoClient.connect(url, { useNewUrlParser: true })
  .then(client => repository(client.db(databaseName)));
