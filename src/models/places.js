import * as R from 'ramda';
import { rename } from './util';

const placeFields = ['id', 'name', 'description', 'campaignId'];

export const placeModel = R.pick(placeFields);

export const placeFromDocument = R.compose(
  placeModel,
  R.evolve({
    id: id => id.toString(),
  }),
  rename('_id', 'id'),
);

export const placesFromDocuments = R.map(placeFromDocument);
