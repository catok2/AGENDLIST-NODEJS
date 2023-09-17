const connection = require('../db');
const itemsController = {};
const fs = require('fs');

itemsController.mostraritems = (req, res) => {
  connection.db.query('SELECT * FROM items')
    .then(([rows]) => {
      // Convertir imágenes a base64
      const itemsWithImages = rows.map(item => {
        if (item.imagen) {
          const imageData = fs.readFileSync(`img/${item.imagen}`);
          const base64Image = imageData.toString('base64');
          item.imagen = base64Image;
        }
        return item;
      });

      res.status(200).json(itemsWithImages);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al obtener las tareas' });
    });
};
/*
itemsController.mostraritems = (req, res) => {
  connection.db.query('SELECT * FROM items', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener las tareas' });
    } else {
      // Convertir imágenes a base64
      const itemsWithImages = rows.map(item => {
        if (item.imagen) {
          const imageData = fs.readFileSync(`img/${item.imagen}`);
          const base64Image = imageData.toString('base64');
          item.imagen = base64Image;
        }
        return item;
      });

      res.status(200).json(itemsWithImages);
    }
  });
};*/

/*itemsController.mostraritems = (req, res) => {

  connection.query('SELECT * FROM items', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener las tareas' });
    } else {
      res.status(200).json(rows);
    }
  });
  console.log('¡Bienvenido a la página de contacto!');
};
*/
itemsController.crearTarea = (req, res) => {
  const nuevaTarea = {
    nombre: req.body.nombre,
    imagen: req.file ? req.file.filename : null, // Guarda el nombre del archivo en la base de datos
  };

  connection.db.execute('INSERT INTO items (nombre, imagen) VALUES (?, ?)',
   [nuevaTarea.nombre, nuevaTarea.imagen] )
   .then(([results]) => {
    if (results.changedRows === 0) {
      res.status(404).json({ message: 'Tarea no encontrada' });
    } else {
      res.status(200).json({ message: 'Tarea actualizada exitosamente' });
    }
  })
  .catch(error => {
    console.error('Error al actualizar la tarea:', error);
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  });
};
/*itemsController.crearTarea = (req, res) => {
  const nuevaTarea = {
    descripcion: req.body.descripcion, // Asumiendo que se envía en el cuerpo de la solicitud
    completada: req.body.completada || false // Valor predeterminado a false si no se proporciona
  };

  connection.query('INSERT INTO tareas SET ?', nuevaTarea, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al crear la tarea' });
    } else {
      res.status(201).json({ message: 'Tarea creada exitosamente', taskId: results.insertId });
    }
  });};*/

  itemsController.actualizarTarea = (req, res) => {
    const taskId = req.params.id;
    const nuevoEstado = req.body.estado;
  
    if (typeof nuevoEstado === 'undefined') {
      return res.status(400).json({ error: 'El campo estado es obligatorio' });
    }
  
    connection.db.execute(
      'UPDATE items SET estado = ? WHERE id = ?',
      [nuevoEstado, taskId]
    )
    .then(([results]) => {
      if (results.changedRows === 0) {
        res.status(404).json({ message: 'Tarea no encontrada' });
      } else {
        res.status(200).json({ message: 'Tarea actualizada exitosamente' });
      }
    })
    .catch(error => {
      console.error('Error al actualizar la tarea:', error);
      res.status(500).json({ error: 'Error al actualizar la tarea' });
    });
  };
  
/*itemsController.actualizarTarea = (req, res) => {
  const taskId = req.params.id; // Se asume que el ID se proporciona como parámetro en la URL
  const nuevaDescripcion = req.body.estado; // Asumiendo que se envía en el cuerpo de la solicitud

  connection.db.query(
    'UPDATE items SET estado = ? WHERE id = ?',
    [nuevaDescripcion, taskId],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error al actualizar la tarea' });
      } else if (results.changedRows === 0) {
        res.status(404).json({ message: 'Tarea no encontrada' });
      } else {
        res.status(200).json({ message: 'Tarea actualizada exitosamente' });
      }
    }
  );

  //res.status(200).json({ message: 'Ruta de actualización en prueba' });

};*/

itemsController.eliminarTarea = (req, res) => {
  const ItemId = req.params.id; // Se asume que el ID se proporciona como parámetro en la URL

  connection.query('DELETE FROM tareas WHERE id = ?', ItemId, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al eliminar la tarea' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Tarea no encontrada' });
    } else {
      res.status(200).json({ message: 'Tarea eliminada exitosamente' });
    }
  });
};


module.exports = itemsController;