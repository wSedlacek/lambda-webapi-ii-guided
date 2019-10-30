import knex from 'knex';
import { HubDTO } from '../models';

import { development } from './knexConfig';
const db = knex<HubDTO>(development);

interface Query {
  page?: number;
  limit?: number;
  sortBy?: 'id';
  sortDir?: 'asc';
}

export const find = (query: Query) => {
  const { page = 1, limit = 2, sortBy = 'id', sortDir = 'asc' } = query;
  const offset = limit * (page - 1);

  let rows = db('hubs')
    .orderBy(sortBy, sortDir)
    .limit(limit)
    .offset(offset);

  return rows;
};

export const findById = (id: number | string) =>
  db('hubs')
    .where({ id })
    .first();

export const add = async (hub: HubDTO) => {
  const [id] = await db('hubs').insert<number[]>(hub);
  return findById(id);
};

export const remove = async (id: number | string) =>
  await db('hubs')
    .where({ id })
    .del();

export const update = async (id: number | string, changes: HubDTO) => {
  const updated = await db('hubs')
    .where({ id })
    .update(changes, '*');
  return updated ? findById(id) : updated;
};
