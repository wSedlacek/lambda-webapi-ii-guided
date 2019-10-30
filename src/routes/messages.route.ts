import express from 'express';

import { findMessageById } from '../data/messages';

const messagesRouter = express.Router();

messagesRouter.get('/:id', async (req, res) => {
  try {
    const messages = await findMessageById(req.params.id);
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the messages',
    });
  }
});

export { messagesRouter };
