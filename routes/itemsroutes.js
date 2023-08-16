const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController')

// Ruta para crear una nueva tarea
router.post('/items', itemsController.crearTarea);


// Ruta para obtener todas las tareas
router.get('/items', itemsController.obtenerTodasLasTareas);

// Ruta para actualizar una tarea
router.patch('/items/:id', itemsController.actualizarTarea);

// Ruta para eliminar una tarea
router.delete('/items/:id', itemsController.eliminarTarea);

module.exports = router;