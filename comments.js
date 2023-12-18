// Create web server application with express
// Create a comments router to handle all comments related routes
// Create a new comment
// Get all comments for a post
// Delete a comment
// Update a comment
// Get all comments for a user
// Get all comments for a post and a user

const express = require('express');
const router = express.Router();
const { Comment } = require('../models');

// Create a comment
router.post('/', async (req, res) => {
    const { body, user_id, post_id } = req.body;
    try {
        const comment = await Comment.create({ body, user_id, post_id });
        res.status(200).json(comment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get all comments for a post
router.get('/post/:post_id', async (req, res) => {
    try {
        const comments = await Comment.findAll({ where: { post_id: req.params.post_id } });
        res.status(200).json(comments);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.destroy({ where: { id: req.params.id } });
        res.status(200).json(comment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a comment
router.put('/:id', async (req, res) => {
    const { body } = req.body;
    try {
        const comment = await Comment.update({ body }, { where: { id: req.params.id } });
        res.status(200).json(comment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get all comments for a user
router.get('/user/:user_id', async (req, res) => {
    try {
        const comments = await Comment.findAll({ where: { user_id: req.params.user_id } });
        res.status(200).json(comments);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get all comments for a post and a user
router.get('/post/:post_id/user/:user_id', async (req, res) => {
    try {
        const comments = await Comment.findAll({ where: {
