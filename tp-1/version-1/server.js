const express = require('express');
const mysql = require('mysql2');
const app = express();

// Configuración de la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'seminario_tp1'
});

// Configuración de Express - Configura el motor de plantillas EJS
app.set('view engine', 'ejs');  // Usar EJS para renderizar las vistas
app.use(express.urlencoded({ extended: true }));  // Para leer datos del formulario


/* ------------------------------- Página de Inicio ------------------------------- */

app.get('/', (req, res) => {
  res.render('index');  // Pasar los usuarios a la vista  
});

/* ------------------------------- Página de Inicio ------------------------------- */


/* ------------------------------- User ------------------------------- */

// Ruta para la gestión de usuarios (user.ejs) usando un procedimiento almacenado con queries preparadas
app.get('/user', (req, res) => {
  const query = 'CALL obtener_usuarios()';  // Llamada al procedimiento almacenado
  connection.execute(query, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      res.status(500).send('Error al obtener los usuarios.');
    } else {
      res.render('user', { users: results[0] });  // El resultado de 'CALL' es un array de arrays, por lo que se accede a los resultados con [0]
    }
  });
});


// Agregar un nuevo usuario usando un procedimiento almacenado con queries preparadas
app.post('/add/user', (req, res) => {
  const { nickname, password } = req.body;
  const query = 'CALL agregar_usuario(?, ?)';
  connection.execute(query, [nickname, password], (err, results) => {
    if (err) {
      console.error('Error al agregar usuario:', err);
      res.status(500).send('Error al agregar el usuario.');
    } else {
      res.redirect('/user');  // Redirigir a la página principal después de agregar el usuario
    }
  });
});


// Editar un usuario usando un procedimiento almacenado con queries preparadas
app.post('/edit/user', (req, res) => {
  const { oldNickname, newNickname, newPassword } = req.body;
  const query = 'CALL editar_usuario(?, ?, ?)'; // Llamada al procedimiento almacenado 'editar_usuario' con los parámetros correspondientes
  connection.execute(query, [oldNickname, newNickname, newPassword], (err, results) => {
    if (err) {
      console.error('Error al actualizar usuario:', err);
      res.status(500).send('Error al editar el usuario.');
    } else {
      res.redirect('/user');  // Redirigir a la página principal después de editar
    }
  });
});


// Borrar un usuario usando un procedimiento almacenado con queries preparadas
app.post('/delete/user', (req, res) => {
  const { nickname } = req.body;
  const query = 'CALL borrar_usuario(?)'; // Llamada al procedimiento almacenado 'borrar_usuario' con los parámetros correspondientes
  connection.execute(query, [nickname], (err, results) => {
    if (err) {
      console.error('Error al borrar usuario:', err);
      res.status(500).send('Error al borrar el usuario.');
    } else {
      res.redirect('/user');  // Redirigir a la página principal después de borrar
    }
  });
});

/* ------------------------------- User ------------------------------- */


/* ------------------------------- Group ------------------------------- */

// Ruta para la gestión de grupos usando un procedimiento almacenado con queries preparadas
app.get('/group', (req, res) => {
  const query = 'CALL obtener_grupos()';  // Llamada al procedimiento almacenado
  connection.execute(query, (err, results) => {
    if (err) {
      console.error('Error al obtener grupos:', err);
      res.status(500).send('Error al obtener los grupos.');
    } else {
      res.render('group', { groups: results[0] });  // El resultado de 'CALL' es un array de arrays, por lo que se accede a los resultados con [0]
    }
  });
});

// Agregar un nuevo grupo
app.post('/add/group', (req, res) => {
  const { name, description } = req.body;
  const query = 'CALL agregar_grupo(?, ?)';
  connection.execute(query, [name, description], (err, results) => {
      if (err) {
          console.error('Error al agregar grupo:', err);
          res.status(500).send('Error al agregar el grupo.');
      } else {
          res.redirect('/group');  // Redirigir a la página principal después de agregar el grupo
      }
  });
});
  
// Editar un grupo
app.post('/edit/group', (req, res) => {
  const { oldName, newName, newDescription } = req.body;
  const query = 'CALL editar_grupo(?, ?, ?)';
  connection.execute(query, [oldName, newName, newDescription], (err, results) => {
      if (err) {
          console.error('Error al actualizar grupo:', err);
          res.status(500).send('Error al editar el grupo.');
      } else if (results.affectedRows === 0) {
          console.log(`Grupo ${oldName} no encontrado.`);
          res.status(404).send('Grupo no encontrado.');
      } else {
          res.redirect('/group');  // Redirigir a la página principal después de editar
      }
  });
});
  
// Borrar un grupo
app.post('/delete/group', (req, res) => {
  const { name } = req.body;
  const query = 'CALL borrar_grupo(?)';
  connection.execute(query, [name], (err, results) => {
      if (err) {
          console.error('Error al borrar grupo:', err);
          res.status(500).send('Error al borrar el grupo.');
      } else if (results.affectedRows === 0) {
          console.log(`Grupo ${name} no encontrado.`);
          res.status(404).send('Grupo no encontrado.');
      } else {
          res.redirect('/group');  // Redirigir a la página principal después de borrar
      }
  });
});

/* ------------------------------- Group ------------------------------- */

/* ------------------------------- MemberUserGroup ------------------------------- */

// Ruta para la gestión de las relaciones (memberusergroup.ejs)
app.get('/memberusergroup', (req, res) => {
  const query = 'CALL obtener_memberusergroup()';
  connection.execute(query, (err, results) => {
    if (err) {
      console.error('Error al obtener las relaciones:', err);
      res.status(500).send('Error al obtener las relaciones.');
    } else {
      res.render('memberusergroup', { memberusergroups: results[0] }); // Pasa la variable 'memberusergroups' a la vista
    }
  });
});

// Agregar un nuevo Miembro
app.post('/add/memberusergroup', (req, res) => {
  const { user_id, group_id } = req.body;
  const query = 'CALL agregar_memberusergroup(?, ?)';
  connection.execute(query, [user_id, group_id], (err, results) => {
      if (err) {
      console.error('Error al agregar la relación:', err);
      res.status(500).send('Error al agregar la relación.');
      } else {
      res.redirect('/memberusergroup'); // Redirigir a la página principal después de agregar el grupo
      }
  });
});

// Editar la asociación entre un usuario y un grupo
app.post('/edit/memberusergroup', (req, res) => {
  const { oldUserId, oldGroupId, newUserId, newGroupId } = req.body;

  // Validar los parámetros
  if (!oldUserId || !oldGroupId || !newUserId || !newGroupId) {
    return res.status(400).send('Faltan parámetros necesarios.');
  }

  // Llamar al procedimiento almacenado
  const query = 'CALL editar_memberusergroup(?, ?, ?, ?)';
  connection.execute(query, [oldUserId, oldGroupId, newUserId, newGroupId], (err, results) => {
    if (err) {
      console.error('Error al actualizar la asociación de usuario y grupo:', err.message);
      return res.status(500).send('Error al editar la asociación.');
    }

    // Verificar si la actualización afectó filas
    if (results.affectedRows === 0) {
      console.log(`La asociación entre el usuario ${oldUserId} y el grupo ${oldGroupId} no fue encontrada.`);
      return res.status(404).send('Asociación no encontrada.');
    }

    res.redirect('/memberusergroup');
  });
});

// Eliminar un usuario de un grupo
app.post('/delete/memberusergroup', (req, res) => {
  const { user_id } = req.body;

  // Validar el parámetro
  if (!user_id) {
    return res.status(400).send('Faltan parámetros necesarios.');
  }

  // Llamada al procedimiento almacenado
  const query = 'CALL borrar_memberusergroup(?)';
  connection.execute(query, [user_id], (err) => {
    if (err) {
      console.error('Error al eliminar la asociación:', err.message);
      return res.status(500).send('Error al eliminar la asociación de usuario y grupo.');
    }

    res.redirect('/memberusergroup');
  });
});

/* ------------------------------- MemberUserGroup ------------------------------- */

/* ------------------------------- GroupAction ------------------------------- */


// Ruta para la gestión de las aciones (groupaction.ejs)
app.get('/groupaction', (req, res) => {
  const query = 'CALL obtener_groupaction()';
  connection.execute(query, (err, results) => {
    if (err) {
      console.error('Error al obtener las relaciones:', err);
      return res.status(500).send('Error al obtener las relaciones.');
    }
    res.render('groupaction', { groupactions: results[0] }); // results[0] contiene las filas
  });
});


// Agregar una nueva Acción
app.post('/add/groupaction', (req, res) => {
  const { action, memberUserGroup_id } = req.body;
  const query = 'CALL agregar_groupaction(?, ?)';
  connection.execute(query, [action, memberUserGroup_id], (err) => {
    if (err) {
      console.error('Error al agregar la relación:', err.message);
      return res.status(500).send('Error al agregar la relación.');
    }
    res.redirect('/groupaction');
  });
});


// Editar la Acción y Miembro entre un usuario y un grupo
app.post('/edit/groupaction', (req, res) => {
  const { oldAction, oldIdMember, newAction, newIdMember } = req.body;

  // Asegurar de que los parámetros son válidos
  if (!oldAction || !oldIdMember || !newAction || !newIdMember) {
      return res.status(400).send('Faltan parámetros necesarios.');
  }

  // Consultar para actualizar la asociación de usuario y grupo ---------------------------------------------------------------------------------------
  const query = 'CALL editar_groupaction(?, ?, ?, ?)';

  // Ejecutar la consulta con los parámetros
  connection.execute(query, [oldAction, oldIdMember, newAction, newIdMember], (err, results) => {
    if (err) {
      console.error('Error al actualizar la acción solicitada:', err.message);
      return res.status(500).send('Error al editar la asociación.');
    }

    if (results.affectedRows === 0) {
      console.log(`La asociación entre la acción ${oldAction} y el id ${oldIdMember} no fue encontrada.`);
      return res.status(404).send('Asociación no encontrada.');
    }

    res.redirect('/groupaction');
  });
});


// Eliminar un usuario de un grupo
app.post('/delete/groupaction', (req, res) => {
  const { action } = req.body;

  if (!action) {
    return res.status(400).send('Faltan parámetros necesarios.');
  }

  const query = 'CALL borrar_groupaction(?)';
  connection.execute(query, [action], (err) => {
    if (err) {
      console.error('Error al eliminar la asociación:', err.message);
      return res.status(500).send('Error al eliminar la asociación de usuario y grupo.');
    }

    res.redirect('/groupaction');
  });
});

/* ------------------------------- GroupAction ------------------------------- */


// Iniciar el servidor
app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});
