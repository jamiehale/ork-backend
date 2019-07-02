import * as R from 'ramda';
import { rename } from './util';

const personFields = ['id', 'name', 'type', 'description', 'campaignId'];

export const personModel = R.pick(personFields);

export const personFromDocument = R.compose(
  personModel,
  R.evolve({
    id: id => id.toString(),
  }),
  rename('_id', 'id'),
);

export const peopleFromDocuments = R.map(personFromDocument);
