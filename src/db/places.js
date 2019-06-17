import { ObjectID as ObjectId } from 'mongodb';

const campaignIdQuery = campaignId => (
  campaignId ? ({
    campaignId: {
      $eq: campaignId,
    },
  }) : {}
);

const placesQueryFromFilter = filter => ({
  ...campaignIdQuery(filter.campaignId),
});

const readPlaces = db => filter => db.collection('places')
  .find(placesQueryFromFilter(filter))
  .sort({ name: 1 })
  .toArray();

const readPlace = db => id => db.collection('places')
  .findOne({ _id: new ObjectId(id) });

const createPlace = db => place => db.collection('places')
  .insertOne(place)
  .then(result => result.ops[0]);

const updatePlace = db => (id, fields) => db.collection('places')
  .findOneAndUpdate({
    _id: new ObjectId(id),
  }, {
    $set: fields,
  }, {
    returnOriginal: false,
  })
  .then(result => result.value);

export default db => ({
  readPlaces: readPlaces(db),
  readPlace: readPlace(db),
  createPlace: createPlace(db),
  updatePlace: updatePlace(db),
});
