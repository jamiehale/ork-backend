import { ObjectID as ObjectId } from 'mongodb';

const campaignIdQuery = campaignId => (
  campaignId ? ({
    campaignId: {
      $eq: campaignId,
    },
  }) : {}
);

const elementsQueryFromFilter = filter => ({
  ...campaignIdQuery(filter.campaignId),
});

const readElements = db => filter => db.collection('elements')
  .find(elementsQueryFromFilter(filter))
  .sort({ name: 1 })
  .toArray();

const readElement = db => id => db.collection('elements')
  .findOne({ _id: new ObjectId(id) });

const createElement = db => element => db.collection('elements')
  .insertOne(element)
  .then(result => result.ops[0]);

const updateElement = db => (id, fields) => db.collection('elements')
  .findOneAndUpdate({
    _id: new ObjectId(id),
  }, {
    $set: fields,
  }, {
    returnOriginal: false,
  })
  .then(result => result.value);

export default db => ({
  readElements: readElements(db),
  readElement: readElement(db),
  createElement: createElement(db),
  updateElement: updateElement(db),
});
