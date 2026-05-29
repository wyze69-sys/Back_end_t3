import express from 'express';

import {
    listUsers,
    showUser,
    addUser,
    editUser,
    removeUser
} from '../controllers/userController.js';

const router = express.Router();

// GET /users
router.get('/', listUsers);

// GET /users/:id
router.get('/:id', showUser);

// POST /users
router.post('/', addUser);

// PUT /users/:id
router.put('/:id', editUser);

// DELETE /users/:id
router.delete('/:id', removeUser);

export default router;