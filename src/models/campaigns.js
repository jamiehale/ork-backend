import * as R from 'ramda';
import { rename } from './util';

const campaignFields = ['id', 'name', 'description'];

export const campaignModel = R.pick(campaignFields);

export const campaignFromDocument = R.compose(
  campaignModel,
  R.evolve({
    id: id => id.toString(),
  }),
  rename('_id', 'id'),
);

export const campaignsFromDocuments = R.map(campaignFromDocument);
