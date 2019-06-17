import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { elementsFromDocuments, elementFromDocument } from '../../models/elements';

const getElements = repository => (req, res) => {
  const { campaignId } = req.query;
  repository.readElements({ campaignId })
    .then(elementsFromDocuments)
    .then((elements) => {
      res.json(elements);
    });
};

const validateElementId = (id) => {
  if (!ObjectId.isValid(id)) {
    const error = new Error('Invalid element ID');
    error.status = 400;
    throw error;
  }
};

const getElement = repository => (req, res) => {
  const { id: elementId } = req.params;
  validateElementId(elementId);
  repository.readElement(elementId)
    .then(elementFromDocument)
    .then((element) => {
      res.json(element);
    });
};

const postElement = repository => (req, res) => {
  const { element } = req.body;
  repository.createElement(element)
    .then(elementFromDocument)
    .then((newElement) => {
      res.json(newElement);
    });
};

export default (repository) => {
  const routes = Router();

  routes.get('/', getElements(repository));
  routes.get('/:id', getElement(repository));
  routes.post('/', postElement(repository));

  return routes;
};
