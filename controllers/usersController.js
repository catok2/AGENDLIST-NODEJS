const connection = require('../db');
const usersController = {};

usersController.mostrarusers = (req, res) => {

  res.send('¡Bienvenido a la página de contacto!');
};

usersController.crearTarea = (req, res) => {
  // Lógica para crear una tarea y realizar la consulta INSERT
};


usersController.actualizarTarea = (req, res) => {
  // Lógica para actualizar una tarea y realizar la consulta UPDATE
};

usersController.eliminarTarea = (req, res) => {
  // Lógica para eliminar una tarea y realizar la consulta DELETE
};


module.exports = usersController;