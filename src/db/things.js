import { ObjectID as ObjectId } from 'mongodb';

const campaignIdQuery = campaignId => (
  campaignId ? ({
    campaignId: {
      $eq: campaignId,
    },
  }) : {}
);

const thingsQueryFromFilter = filter => ({
  ...campaignIdQuery(filter.campaignId),
});

const readThings = db => filter => db.collection('things')
  .find(thingsQueryFromFilter(filter))
  .sort({ name: 1 })
  .toArray();

const readThing = db => id => db.collection('things')
  .findOne({ _id: new ObjectId(id) });

const createThing = db => thing => db.collection('things')
  .insertOne(thing)
  .then(result => result.ops[0]);

const updateThing = db => (id, fields) => db.collection('things')
  .findOneAndUpdate({
    _id: new ObjectId(id),
  }, {
    $set: fields,
  }, {
    returnOriginal: false,
  })
  .then(result => result.value);

export default db => ({
  readThings: readThings(db),
  readThing: readThing(db),
  createThing: createThing(db),
  updateThing: updateThing(db),
});
