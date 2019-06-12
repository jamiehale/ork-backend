import { ObjectID as ObjectId } from 'mongodb';
import * as R from 'ramda';

const uncurriedRename = (from, to, { [from]: fromValue, ...rest }) => ({
  [to]: fromValue,
  ...rest,
});

export const rename = R.curry(uncurriedRename);

export const removeIdUnderscore = rename('_id', 'id');
export const addIdUnderscore = rename('id', '_id');

export const mapIdToObjectId = ({ _id, ...rest }) => ({ _id: new ObjectId(_id), ...rest });

export const dump = (o) => {
  console.log(JSON.stringify(o)); // eslint-disable-line no-console
  return o;
};
