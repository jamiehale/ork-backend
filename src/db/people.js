import { ObjectID as ObjectId } from 'mongodb';

const campaignIdQuery = campaignId => (
  campaignId ? ({
    campaignId: {
      $eq: campaignId,
    },
  }) : {}
);

const peopleQueryFromFilter = filter => ({
  ...campaignIdQuery(filter.campaignId),
});

const readPeople = db => filter => db.collection('people')
  .find(peopleQueryFromFilter(filter))
  .sort({ name: 1 })
  .toArray();

const readPerson = db => id => db.collection('people')
  .findOne({ _id: new ObjectId(id) });

const createPerson = db => person => db.collection('people')
  .insertOne(person)
  .then(result => result.ops[0]);

const updatePerson = db => (id, fields) => db.collection('people')
  .findOneAndUpdate({
    _id: new ObjectId(id),
  }, {
    $set: fields,
  }, {
    returnOriginal: false,
  })
  .then(result => result.value);

export default db => ({
  readPeople: readPeople(db),
  readPerson: readPerson(db),
  createPerson: createPerson(db),
  updatePerson: updatePerson(db),
});
