import * as R from 'ramda';
import { rename } from './util';

const elementFields = ['id', 'name', 'description', 'campaignId'];

export const elementModel = R.pick(elementFields);

export const elementFromDocument = R.compose(
  elementModel,
  R.evolve({
    id: id => id.toString(),
  }),
  rename('_id', 'id'),
);

export const elementsFromDocuments = R.map(elementFromDocument);
