import express from 'express';

import { hubsRouter } from './routes/hubs.route';
import { messagesRouter } from './routes/messages.route';

const server = express();

server.use(express.json());
server.use('/api/hubs', hubsRouter);
server.use('/api/messages', messagesRouter);

server.get('/', (_, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
