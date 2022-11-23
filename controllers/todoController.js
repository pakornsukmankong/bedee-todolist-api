const { writeTodo, readTodo } = require('../utils/file')
const { v4: uuidv4 } = require('uuid')
const AppError = require('../utils/appError')

exports.getAllTodo = async (req, res, next) => {
  try {
    const todos = await readTodo()
    res.status(200).json({ total: todos.length, todos: todos })
  } catch (err) {
    next(err)
  }
}

exports.createTodo = async (req, res, next) => {
  try {
    let dateObj = new Date()
    let month = dateObj.getMonth() + 1
    let day = dateObj.getDate()
    let year = dateObj.getFullYear()
    let newDate = year + '/' + month + '/' + day

    const { title, status = false, createdAt = newDate } = req.body
    if (!title || !title.trim()) {
      throw AppError('title is require', 400)
    }
    if (typeof status !== 'boolean') {
      throw AppError('status should be boolean', 400)
    }
    const newTodos = await readTodo()
    const createdTodo = { title, status, id: uuidv4(), createdAt }
    newTodos.unshift(createdTodo)
    await writeTodo(newTodos)
    res.status(201).json({ todo: createdTodo })
  } catch (err) {
    next(err)
  }
}

exports.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params
    const oldTodos = await readTodo()
    const todo = oldTodos.find((item) => item.id === id) ?? null
    res.status(200).json({ todo })
  } catch (err) {
    next(err)
  }
}

exports.updateTodo = async (req, res, next) => {
  try {
    const { title, status } = req.body
    if (!title || !title.trim()) {
      throw AppError('title is require', 400)
    }
    if (typeof status !== 'boolean') {
      throw AppError('status should be boolean', 400)
    }
    const { id } = req.params
    const oldTodos = await readTodo()
    const updatedTodo = { title, status, id }
    const newTodos = oldTodos.map((item) =>
      item.id === id ? updatedTodo : item
    )
    await writeTodo(newTodos)
    res.status(200).json({ todo: updatedTodo })
  } catch (err) {
    next(err)
  }
}

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params
    const oldTodos = await readTodo()
    const newTodos = oldTodos.filter((item) => item.id !== id)
    await writeTodo(newTodos)
    res.status(200).json({ message: 'delete success' })
  } catch (err) {
    next(err)
  }
}
