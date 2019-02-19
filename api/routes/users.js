'use strict'
const UsersController = require(__basedir+'/api/controllers/UsersController');
const express = require('express');
const router = express.Router();

// Routes to get all users
router.get('/', UsersController.find);

// Routes to create a user
router.post('/', UsersController.create);

// Routes to update a user
router.get('/:uuid', UsersController.findById);

// Routes to update a user
router.patch('/', UsersController.edit);

// Routes to update a user
router.put('/', UsersController.edit);

// Routes to delete a user
router.delete('/:uuid', UsersController.delete);

module.exports = router;