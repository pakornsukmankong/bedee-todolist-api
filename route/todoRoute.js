const express = require('express')
const todoController = require('../controllers/todoController')
const router = express.Router()

router.get('/', todoController.getAllTodo)
router.post('/', todoController.createTodo)

router.get('/:id', todoController.getTodoById)
router.patch('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteTodo)

module.exports = router
