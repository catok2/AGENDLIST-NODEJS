
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const port = 3000; 
const itemsController = require('./controllers/itemsController');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'img'); // Carpeta de destino
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname); // Nombre de archivo
    }
  });;

const upload = multer({ storage: storage }); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.post('/items', upload.single('imagen'), itemsController.crearTarea);
app.patch('/items/:id', itemsController.actualizarTarea);
app.get('/items', itemsController.mostraritems);


app.listen(port, () => {

    console.log(`Servidor escuchando en http://localhost:${port}`);

});




 


