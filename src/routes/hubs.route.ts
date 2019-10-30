import express from 'express';
const hubsRouter = express.Router();

import { find, findById, add, remove, update } from '../data/hubs';
import { findHubMessages, addMessage } from '../data/messages';

hubsRouter.get('/', async (req, res) => {
  try {
    const hubs = await find(req.query);
    res.status(200).json(hubs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hubs',
    });
  }
});

hubsRouter.get('/:id', async (req, res) => {
  try {
    const hub = await findById(req.params.id);
    if (hub) res.status(200).json(hub);
    else res.status(404).json({ message: 'Hub not found' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hub',
    });
  }
});

hubsRouter.post('/', async (req, res) => {
  try {
    const hub = await add(req.body);
    res.status(201).json(hub);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error adding the hub',
    });
  }
});

hubsRouter.delete('/:id', async (req, res) => {
  try {
    const count = await remove(req.params.id);
    if (count > 0) res.status(200).json({ message: 'The hub has been nuked' });
    else res.status(404).json({ message: 'The hub could not be found' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error removing the hub',
    });
  }
});

hubsRouter.put('/:id', async (req, res) => {
  try {
    const changes = req.body;
    const hub = await update(req.params.id, changes);
    if (hub) res.status(200).json(hub);
    else res.status(404).json({ message: 'The hub could not be found' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error updating the hub',
    });
  }
});

hubsRouter.get('/:hub_id/messages', async (req, res) => {
  try {
    const messages = await findHubMessages(req.params.hub_id);
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the messages',
    });
  }
});

hubsRouter.post('/:hub_id/messages', async (req, res) => {
  try {
    const { hub_id } = req.params;
    const message = await addMessage({ ...req.body, hub_id });
    res.status(201).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the messages',
    });
  }
});

export { hubsRouter };
