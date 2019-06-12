import { Router } from 'express';
import v1 from './v1';

export default (repository) => {
  const routes = Router();

  routes.use('/v1', v1(repository));

  return routes;
};
