import { Router } from 'express';

import campaigns from './campaigns';
import people from './people';
import places from './places';

export default (repository) => {
  const routes = Router();

  routes.use('/campaigns', campaigns(repository));
  routes.use('/people', people(repository));
  routes.use('/places', places(repository));

  return routes;
};
