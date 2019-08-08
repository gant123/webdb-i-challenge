const express = require('express');

const router = express.Router();

const db = require('../dbConfig');

router.get('/', async (req, res) => {
  try {
    //const posts = await db('posts');
    const accounts = await db.select('*').from('accounts');
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ message: 'error getting accounts', error: err });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [accounts] = await db
      .select('*')
      .from('accounts')
      .where({ id });
    if (accounts) {
      res.status(200).json(accounts);
    } else {
      res
        .status(404)
        .json({ message: `sorry could not find your post Id-${id}` });
    }
  } catch (err) {
    res.status(500).json({ message: 'Cannot get your post', error: err });
  }
});

router.post('/', async (req, res) => {
  const accountData = req.body;

  try {
    const account = await db('posts').insert(accountData);
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ message: 'could not add your post', error: err });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const account = await db('accounts')
      .where('id', '=', id)
      .update(changes);
    if (account) {
      res.status(200).json({ updated: account });
    } else {
      res.status(404).json({ message: `could not dind post #${id}` });
    }
  } catch (err) {
    res.status(500).json({ message: '', error: err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const del = await db('accounts')
      .where({ id })
      .del();
    if (del) {
      res.status(200).json({ message: 'Has been deleted' });
    } else {
      res.status(404).json({ message: 'could not find bro' });
    }
  } catch (err) {
    res.status(500).json({ message: 'you did someting bad lol', error: err });
  }
});

module.exports = router;
