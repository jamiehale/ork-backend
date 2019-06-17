import * as R from 'ramda';
import { rename } from './util';

const thingFields = ['id', 'name', 'description', 'campaignId'];

export const thingModel = R.pick(thingFields);

export const thingFromDocument = R.compose(
  thingModel,
  R.evolve({
    id: id => id.toString(),
  }),
  rename('_id', 'id'),
);

export const thingsFromDocuments = R.map(thingFromDocument);
