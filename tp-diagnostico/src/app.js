const express = require ('express');
const path = require ('path'); // Se encarga de unir directorios.
const morgan = require ('morgan');
const mysql = require ('mysql');
const myConnection = require ('express-myconnection');

const app = express();

// Importing routes
const contactRoutes = require('./routes/contact');

// Setings
app.set ('port', process.env.PORT || 3000); // Revisa si hay algún puerto en el Sistema Operativo, sino utiliza el puerto 3000.
app.set ('view engine', 'ejs'); // "view engine" = Motor de plantilla que será "ejs". Se coloca en strings porque node ya sabe donde está, pero como instalamos el módulo de ejs antes, podemos usar ésta configuración.
app.set ('views', path.join(__dirname, 'views')); // Módulo path, une los siguientes directorios.

// Middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'crudnodejsmysql'
    }, 'single'));
app.use(express.urlencoded({extended: false})); // Middleware de express que cuando se reciba un dato, se reciva a través de una propiedad del objeto request llamada "body".


// Routes
app.use('/', contactRoutes);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get ('PORT'), () => {
    console.log('Server on port 3000');
});