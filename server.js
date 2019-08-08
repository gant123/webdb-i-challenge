const express = require('express');

const db = require('./data/dbConfig.js');
const accountsRouter = require('./data/accounts/accounts-router');

const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRouter);

// server.get('/', async (req, res) => {
//   try {
//     const accounts = await db
//       .select('*')
//       .from('accounts')
//       .toSQL()
//       .toNative();
//     //const accounts = await db('');
//     // const [accounts] = await db.select('*').from('accounts');
//     res.status(200).json(accounts);
//   } catch (err) {
//     res.status(500).json({ message: 'error getting posts', error: err });
//   }
// });

module.exports = server;
