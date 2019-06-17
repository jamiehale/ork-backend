import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { placesFromDocuments, placeFromDocument } from '../../models/places';

const getPlaces = repository => (req, res) => {
  const { campaignId } = req.query;
  repository.readPlaces({ campaignId })
    .then(placesFromDocuments)
    .then((places) => {
      res.json(places);
    });
};

const validatePlaceId = (id) => {
  if (!ObjectId.isValid(id)) {
    const error = new Error('Invalid place ID');
    error.status = 400;
    throw error;
  }
};

const getPlace = repository => (req, res) => {
  const { id: placeId } = req.params;
  validatePlaceId(placeId);
  repository.readPlace(placeId)
    .then(placeFromDocument)
    .then((place) => {
      res.json(place);
    });
};

const postPlace = repository => (req, res) => {
  const { place } = req.body;
  repository.createPlace(place)
    .then(placeFromDocument)
    .then((newPlace) => {
      res.json(newPlace);
    });
};

export default (repository) => {
  const routes = Router();

  routes.get('/', getPlaces(repository));
  routes.get('/:id', getPlace(repository));
  routes.post('/', postPlace(repository));

  return routes;
};
