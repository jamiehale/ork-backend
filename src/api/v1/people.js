import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { peopleFromDocuments, personFromDocument } from '../../models/people';

const getPeople = repository => (req, res) => {
  const { campaignId } = req.query;
  repository.readPeople({ campaignId })
    .then(peopleFromDocuments)
    .then((people) => {
      res.json(people);
    });
};

const validatePersonId = (id) => {
  if (!ObjectId.isValid(id)) {
    const error = new Error('Invalid person ID');
    error.status = 400;
    throw error;
  }
};

const getPerson = repository => (req, res) => {
  const { id: personId } = req.params;
  validatePersonId(personId);
  repository.readPerson(personId)
    .then(personFromDocument)
    .then((person) => {
      res.json(person);
    });
};

const postPerson = repository => (req, res) => {
  const { person } = req.body;
  repository.createPerson(person)
    .then(personFromDocument)
    .then((newPerson) => {
      res.json(newPerson);
    });
};

export default (repository) => {
  const routes = Router();

  routes.get('/', getPeople(repository));
  routes.get('/:id', getPerson(repository));
  routes.post('/', postPerson(repository));

  return routes;
};
