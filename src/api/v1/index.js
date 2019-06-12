import { Router } from 'express';

import campaigns from './campaigns';

export default (repository) => {
  const routes = Router();

  routes.use('/campaigns', campaigns(repository));

  return routes;
};
