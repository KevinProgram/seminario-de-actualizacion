const express = require('express');
const router = express.Router(); // Método que devuelve un objeto de JavaScript al cual se le pueden ingresar rutas y reutilizarlas.

const contactController = require('../controllers/contactController'); // Definir "contactController"

router.get('/', contactController.list); // Usar el método "list" de "contactController"
router.post('/add', contactController.save);
router.get('/delete/:id', contactController.delete);

router.get('/update/:id', contactController.edit);
router.post('/update/:id', contactController.update);

module.exports = router;