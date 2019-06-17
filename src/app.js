import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import api from './api';

const createApp = (repository) => {
  const app = express();
  app.disable('x-powered-by');

  app.use(cors());
  app.use(logger('dev', {
    skip: () => app.get('env') === 'test',
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // app.use(express.static(path.join(__dirname, '../public')));

  // Routes
  app.use('/api', api(repository));

  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // Error handler
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res
      .status(err.status || 500)
      .json({
        message: err.message,
      });
  });

  return app;
};

export default createApp;
