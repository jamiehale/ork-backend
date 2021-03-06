import { Router } from 'express';

import campaigns from './campaigns';
import people from './people';
import places from './places';
import things from './things';
import elements from './elements';

export default (repository) => {
  const routes = Router();

  routes.use('/campaigns', campaigns(repository));
  routes.use('/people', people(repository));
  routes.use('/places', places(repository));
  routes.use('/things', things(repository));
  routes.use('/elements', elements(repository));

  return routes;
};
