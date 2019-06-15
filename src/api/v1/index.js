import { Router } from 'express';

import campaigns from './campaigns';
import people from './people';

export default (repository) => {
  const routes = Router();

  routes.use('/campaigns', campaigns(repository));
  routes.use('/people', people(repository));

  return routes;
};
