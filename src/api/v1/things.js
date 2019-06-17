import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { thingsFromDocuments, thingFromDocument } from '../../models/things';

const getThings = repository => (req, res) => {
  const { campaignId } = req.query;
  repository.readThings({ campaignId })
    .then(thingsFromDocuments)
    .then((things) => {
      res.json(things);
    });
};

const validateThingId = (id) => {
  if (!ObjectId.isValid(id)) {
    const error = new Error('Invalid thing ID');
    error.status = 400;
    throw error;
  }
};

const getThing = repository => (req, res) => {
  const { id: thingId } = req.params;
  validateThingId(thingId);
  repository.readThing(thingId)
    .then(thingFromDocument)
    .then((thing) => {
      res.json(thing);
    });
};

const postThing = repository => (req, res) => {
  const { thing } = req.body;
  repository.createThing(thing)
    .then(thingFromDocument)
    .then((newThing) => {
      res.json(newThing);
    });
};

export default (repository) => {
  const routes = Router();

  routes.get('/', getThings(repository));
  routes.get('/:id', getThing(repository));
  routes.post('/', postThing(repository));

  return routes;
};
