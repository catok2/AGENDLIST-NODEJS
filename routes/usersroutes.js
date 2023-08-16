const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

// Ruta para crear una nueva tarea
router.post('/user', usersController.crearTarea);

// Ruta para obtener todas las tareas
router.get('/user', usersController.obtenerTodasLasTareas);

// Ruta para actualizar una tarea
router.patch('/user/:id', usersController.actualizarTarea);

// Ruta para eliminar una tarea
router.delete('/user/:id', usersController.eliminarTarea);

module.exports = router;