import knex from 'knex';
import { HubDTO, MessageDTO } from '../models';

import { development } from './knexConfig';
const db = knex<MessageDTO>(development);

export const findHubMessages = async (hubId: number | string) => {
  return await db('messages as m')
    .join<HubDTO>('hubs as h', 'm.hub_id', 'h.id')
    .select<MessageDTO[]>('m.id', 'm.text', 'm.sender', 'h.id as hubId', 'h.name as hub')
    .where({ hub_id: hubId });
};

export const findMessageById = async (id: number | string) => {
  return await db('messages')
    .where({ id })
    .first();
};

export const addMessage = async (message: MessageDTO) => {
  const [id] = await db('messages').insert(message);
  return findMessageById(id);
};
