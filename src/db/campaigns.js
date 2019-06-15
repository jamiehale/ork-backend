import { ObjectID as ObjectId } from 'mongodb';

const readCampaigns = db => () => db.collection('campaigns')
  .find()
  .sort({ name: 1 })
  .toArray();

const readCampaign = db => id => db.collection('campaigns')
  .findOne({ _id: new ObjectId(id) });

const createCampaign = db => campaign => db.collection('campaigns')
  .insertOne(campaign)
  .then(result => result.ops[0]);

const updateCampaign = db => (id, fields) => db.collection('campaigns')
  .findOneAndUpdate({
    _id: new ObjectId(id),
  }, {
    $set: fields,
  }, {
    returnOriginal: false,
  })
  .then(result => result.value);

export default db => ({
  readCampaigns: readCampaigns(db),
  readCampaign: readCampaign(db),
  createCampaign: createCampaign(db),
  updateCampaign: updateCampaign(db),
});
