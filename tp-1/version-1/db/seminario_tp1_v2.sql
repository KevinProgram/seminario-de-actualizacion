-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-12-2024 a las 20:19:01
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `seminario_tp1`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `agregar_groupaction` (IN `p_action` VARCHAR(255), IN `p_memberUserGroup_id` INT)   BEGIN
    INSERT INTO groupaction (action, memberUserGroup_id) 
    VALUES (p_action, p_memberUserGroup_id);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `agregar_grupo` (IN `nombre` VARCHAR(255), IN `descripcion` TEXT)   BEGIN
    INSERT INTO `group` (name, description) VALUES (nombre, descripcion);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `agregar_memberusergroup` (IN `p_user_id` INT, IN `p_group_id` INT)   BEGIN
    INSERT INTO memberusergroup (user_id, group_id)
    VALUES (p_user_id, p_group_id);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `agregar_usuario` (IN `nickname` VARCHAR(255), IN `password` VARCHAR(255))   BEGIN
    INSERT INTO user (name, password) 
    VALUES (nickname, password);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `borrar_groupaction` (IN `p_action` VARCHAR(255))   BEGIN
    DELETE FROM groupaction WHERE action = p_action;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `borrar_grupo` (IN `nombre` VARCHAR(255))   BEGIN
    DELETE FROM `group` WHERE name = nombre;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `borrar_memberusergroup` (IN `p_user_id` INT)   BEGIN
    DELETE FROM memberusergroup WHERE user_id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `borrar_usuario` (IN `nickname` VARCHAR(255))   BEGIN
    DELETE FROM user 
    WHERE name = nickname;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editar_groupaction` (IN `p_old_action` VARCHAR(255), IN `p_old_memberUserGroup_id` INT, IN `p_new_action` VARCHAR(255), IN `p_new_memberUserGroup_id` INT)   BEGIN
    UPDATE groupaction 
    SET action = p_new_action, memberUserGroup_id = p_new_memberUserGroup_id
    WHERE action = p_old_action AND memberUserGroup_id = p_old_memberUserGroup_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editar_grupo` (IN `oldNombre` VARCHAR(255), IN `newNombre` VARCHAR(255), IN `newDescripcion` TEXT)   BEGIN
    UPDATE `group`
    SET name = newNombre, description = newDescripcion
    WHERE name = oldNombre;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editar_memberusergroup` (IN `p_old_user_id` INT, IN `p_old_group_id` INT, IN `p_new_user_id` INT, IN `p_new_group_id` INT)   BEGIN
    UPDATE memberusergroup 
    SET user_id = p_new_user_id, group_id = p_new_group_id
    WHERE user_id = p_old_user_id AND group_id = p_old_group_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editar_usuario` (IN `oldNickname` VARCHAR(255), IN `newNickname` VARCHAR(255), IN `newPassword` VARCHAR(255))   BEGIN
    UPDATE user 
    SET name = newNickname, password = newPassword 
    WHERE name = oldNickname;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_groupaction` ()   BEGIN
    SELECT * FROM groupaction;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_grupos` ()   BEGIN
    SELECT * FROM `group`;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_memberusergroup` ()   BEGIN
    SELECT * FROM memberusergroup;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_usuarios` ()   BEGIN
    SELECT * FROM user;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_usuarios_filtrados` (IN `filtro` VARCHAR(255))   BEGIN
    SELECT * FROM user WHERE nombre LIKE CONCAT('%', filtro, '%');
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `group`
--

CREATE TABLE `group` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `group`
--

INSERT INTO `group` (`id`, `name`, `description`) VALUES
(1, 'Astronautas', 'Pisar la Luna'),
(2, 'Guerreros', 'Luchar para defender a los suyos'),
(3, 'Carnicero', 'Cortar y vender carne'),
(5, 'Cliente', 'Se dedica a comprar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `groupaction`
--

CREATE TABLE `groupaction` (
  `id` int(11) NOT NULL,
  `action` varchar(255) NOT NULL,
  `memberUserGroup_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `groupaction`
--

INSERT INTO `groupaction` (`id`, `action`, `memberUserGroup_id`) VALUES
(2, 'Comprar', 4),
(3, 'Viajar al espacio', 1),
(6, 'Vencer enemigos', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `memberusergroup`
--

CREATE TABLE `memberusergroup` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `memberusergroup`
--

INSERT INTO `memberusergroup` (`id`, `user_id`, `group_id`) VALUES
(1, 1, 1),
(3, 2, 2),
(4, 6, 2),
(8, 9, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `name`, `password`) VALUES
(1, 'Paco7', '1234'),
(2, 'RodoMaster', '12345'),
(3, 'Kami_74', '1234'),
(5, 'Clara234', '1234'),
(6, 'DragonArthur', '01234'),
(9, 'Pepe14', '12345');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `groupaction`
--
ALTER TABLE `groupaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `memberUserGroup_id` (`memberUserGroup_id`);

--
-- Indices de la tabla `memberusergroup`
--
ALTER TABLE `memberusergroup`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `group`
--
ALTER TABLE `group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `groupaction`
--
ALTER TABLE `groupaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `memberusergroup`
--
ALTER TABLE `memberusergroup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `groupaction`
--
ALTER TABLE `groupaction`
  ADD CONSTRAINT `groupaction_ibfk_1` FOREIGN KEY (`memberUserGroup_id`) REFERENCES `memberusergroup` (`id`);

--
-- Filtros para la tabla `memberusergroup`
--
ALTER TABLE `memberusergroup`
  ADD CONSTRAINT `memberusergroup_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `memberusergroup_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
