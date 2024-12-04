-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS seminario_tp1;

-- Usar la base de datos existente
USE seminario_tp1;

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Crear la tabla de grupos
CREATE TABLE IF NOT EXISTS `group` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Crear la tabla de miembros de grupo
CREATE TABLE IF NOT EXISTS memberusergroup (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    group_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (group_id) REFERENCES `group`(id)
);

-- Crear la tabla de acciones de grupo
CREATE TABLE IF NOT EXISTS groupaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(255) NOT NULL,
    memberUserGroup_id INT,
    FOREIGN KEY (memberUserGroup_id) REFERENCES memberusergroup(id)
);


-------------------------- Procedimientos Almacenados - Usuarios --------------------------


-- Crear el Procedimiento almacenado obtener_usuarios
DELIMITER $$

CREATE PROCEDURE obtener_usuarios()
BEGIN
    SELECT * FROM user;
END $$

DELIMITER ;

-- Crear el Procedimiento almacenado agregar_usuario
DELIMITER //

CREATE PROCEDURE agregar_usuario(IN nickname VARCHAR(255), IN password VARCHAR(255))
BEGIN
    INSERT INTO user (name, password) 
    VALUES (nickname, password);
END //

DELIMITER ;

-- Crear el Procedimiento almacenado editar_usuario
DELIMITER //

CREATE PROCEDURE editar_usuario(IN oldNickname VARCHAR(255), IN newNickname VARCHAR(255), IN newPassword VARCHAR(255))
BEGIN
    UPDATE user 
    SET name = newNickname, password = newPassword 
    WHERE name = oldNickname;
END //

DELIMITER ;

-- Crear el Procedimiento almacenado borrar_usuario
DELIMITER //

CREATE PROCEDURE borrar_usuario(IN nickname VARCHAR(255))
BEGIN
    DELETE FROM user 
    WHERE name = nickname;
END //

DELIMITER ;


-------------------------- Procedimientos Almacenados - Grupos --------------------------


-- Crear el Procedimiento almacenado obtener_grupos
DELIMITER $$

CREATE PROCEDURE obtener_grupos()
BEGIN
    SELECT * FROM `group`;
END $$

DELIMITER ;

-- Crear el Procedimiento almacenado agregar_grupo
DELIMITER $$

CREATE PROCEDURE agregar_grupo(IN nombre VARCHAR(255), IN descripcion TEXT)
BEGIN
    INSERT INTO `group` (name, description) VALUES (nombre, descripcion);
END $$

DELIMITER ;

-- Crear el Procedimiento almacenado editar_grupo
DELIMITER $$

CREATE PROCEDURE editar_grupo(IN oldNombre VARCHAR(255), IN newNombre VARCHAR(255), IN newDescripcion TEXT)
BEGIN
    UPDATE `group`
    SET name = newNombre, description = newDescripcion
    WHERE name = oldNombre;
END $$

DELIMITER ;

-- Crear el Procedimiento almacenado borrar_grupo
DELIMITER $$

CREATE PROCEDURE borrar_grupo(IN nombre VARCHAR(255))
BEGIN
    DELETE FROM `group` WHERE name = nombre;
END $$

DELIMITER ;


-------------------------- Procedimientos Almacenados - Miembros (memberusergroup) --------------------------


-- Crear el Procedimiento almacenado para obtener las relaciones (obtener_memberusergroup)
DELIMITER $$
CREATE PROCEDURE obtener_memberusergroup()
BEGIN
    SELECT * FROM memberusergroup;
END$$
DELIMITER ;

-- Crear el Procedimiento almacenado para agregar un nuevo miembro (agregar_memberusergroup)
DELIMITER $$
CREATE PROCEDURE agregar_memberusergroup(IN p_user_id INT, IN p_group_id INT)
BEGIN
    INSERT INTO memberusergroup (user_id, group_id)
    VALUES (p_user_id, p_group_id);
END$$
DELIMITER ;

-- Crear el Procedimiento almacenado para editar una asociación entre un usuario y un grupo
DELIMITER $$
CREATE PROCEDURE editar_memberusergroup(
    IN p_old_user_id INT, 
    IN p_old_group_id INT, 
    IN p_new_user_id INT, 
    IN p_new_group_id INT
)
BEGIN
    UPDATE memberusergroup 
    SET user_id = p_new_user_id, group_id = p_new_group_id
    WHERE user_id = p_old_user_id AND group_id = p_old_group_id;
END$$
DELIMITER ;

-- Crear el Procedimiento almacenado para borrar un usuario de un grupo
DELIMITER $$
CREATE PROCEDURE borrar_memberusergroup(IN p_user_id INT)
BEGIN
    DELETE FROM memberusergroup WHERE user_id = p_user_id;
END$$
DELIMITER ;


-------------------------- Procedimientos Almacenados - Acciones de grupo --------------------------

-- Crear el Procedimiento almacenado para obtener las acciones de grupo (obtener_groupaction)
DELIMITER $$
CREATE PROCEDURE obtener_groupaction()
BEGIN
    SELECT * FROM groupaction;
END$$
DELIMITER ;

-- Crear el Procedimiento almacenado para agregar una acción a un grupo
DELIMITER $$
CREATE PROCEDURE agregar_groupaction(
    IN p_action VARCHAR(255), 
    IN p_memberUserGroup_id INT
)
BEGIN
    INSERT INTO groupaction (action, memberUserGroup_id) 
    VALUES (p_action, p_memberUserGroup_id);
END$$
DELIMITER ;

-- Crear el Procedimiento almacenado para editar una acción a un grupo
DELIMITER $$
CREATE PROCEDURE editar_groupaction(
    IN p_old_action VARCHAR(255), 
    IN p_old_memberUserGroup_id INT,
    IN p_new_action VARCHAR(255), 
    IN p_new_memberUserGroup_id INT
)
BEGIN
    UPDATE groupaction 
    SET action = p_new_action, memberUserGroup_id = p_new_memberUserGroup_id
    WHERE action = p_old_action AND memberUserGroup_id = p_old_memberUserGroup_id;
END$$
DELIMITER ;

-- Crear el Procedimiento almacenado para borrar una acción de un grupo
DELIMITER $$
CREATE PROCEDURE borrar_groupaction(
    IN p_action VARCHAR(255)
)
BEGIN
    DELETE FROM groupaction WHERE action = p_action;
END$$
DELIMITER ;
