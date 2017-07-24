-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-07-2017 a las 01:09:12
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `practica`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_deleteCita` (IN `_id` INT)  BEGIN
	DELETE Cita FROM Cita WHERE idCita = _id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_deleteContacto` (IN `_id` INT)  BEGIN
	DELETE Contacto FROM Contacto WHERE idContacto = _id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_deletePerfil` (IN `_id` INT)  BEGIN
	DELETE Perfil FROM Perfil WHERE idPefil = _id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_deleteTarea` (IN `_id` INT)  BEGIN
	DELETE Tarea FROM Tarea WHERE idTarea = _id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_deleteUsuario` (IN `_id` INT)  BEGIN
	DELETE Usuario FROM Usuario WHERE idUsuario = _id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insertarCita` (IN `_descripcion` VARCHAR(100), IN `_lugar` VARCHAR(100), IN `_fecha` DATETIME, IN `_id` INT)  BEGIN
	INSERT INTO Cita(idContacto, descripcion, lugar, fecha) 
    VALUES(_id, _descripcion, _lugar, _fecha);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insertarContacto` (IN `_nombre` VARCHAR(50), IN `_apellido` VARCHAR(50), IN `_telefono` VARCHAR(50), IN `_correo` VARCHAR(20), IN `_id` INT)  BEGIN
	INSERT INTO Contacto(idPerfil, nombre, apellido, correo, telefono) 
    VALUES(_id, _nombre, _apellido, _correo, _telefono);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insertarPerfil` (IN `_nombre` VARCHAR(50), IN `_apellido` VARCHAR(50), IN `_correo` VARCHAR(50), IN `_id` INT)  BEGIN
	INSERT INTO Perfil(idUsuario, nombre, apellido, correo) 
    VALUES(_id, _nombre, _apellido, _correo);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insertarTarea` (IN `_titulo` VARCHAR(50), IN `_descripcion` VARCHAR(50), IN `_fin` DATETIME, IN `_estado` VARCHAR(30), IN `_id` INT)  BEGIN
	INSERT INTO Tarea(idPerfil, titulo, descripcion, fin, estado) 
    VALUES(_id, _titulo, _descripcion, _fin, _estado);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insertarUsuario` (IN `_nick` VARCHAR(50), IN `_password` VARCHAR(50), IN `_nombre` VARCHAR(50), IN `_apellido` VARCHAR(50), IN `_correo` VARCHAR(50))  BEGIN
	INSERT INTO Usuario(nick, password) VALUES(_nick, _password);
    CALL sp_insertarPerfil(_nombre, _apellido, _correo, LAST_INSERT_ID());
	CALL sp_login(_nick, _password);
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_login` (IN `_nick` VARCHAR(50), IN `_password` VARCHAR(50))  BEGIN
	select Usuario.nick, Usuario.idUsuario, perfil.idPerfil,
    perfil.nombre, perfil.apellido, perfil.correo
	from Usuario
	inner join perfil on usuario.idUsuario = perfil.idUsuario
    WHERE Usuario.nick = _nick AND Usuario.password = _password;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtenerCita` (IN `_id` INT)  BEGIN
	SELECT cita.idCita, contacto.idContacto, 
    contacto.nombre, contacto.apellido, contacto.correo, contacto.telefono,
    cita.descripcion, cita.lugar, cita.fecha
    from cita
    inner join contacto on cita.idContacto = contacto.idContacto
    where contacto.idPerfil = _id
    order by cita.idCita desc;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_updateCita` (IN `_descripcion` VARCHAR(100), IN `_lugar` VARCHAR(100), IN `_fecha` DATETIME, IN `_id` INT)  BEGIN
	UPDATE Cita SET descripcion = _descripcion, lugar = _lugar, fecha = _fecha
    WHERE idcita = _id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_updateContacto` (IN `_nombre` VARCHAR(50), IN `_apellido` VARCHAR(50), IN `_telefono` VARCHAR(50), IN `_correo` VARCHAR(20), IN `_id` INT)  BEGIN
	UPDATE Contacto SET nombre = _nombre, apellido = _apellido, correo = _correo,
    telefono = _telefono WHERE idContacto = _id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_updatePerfil` (IN `_nombre` VARCHAR(50), IN `_apellido` VARCHAR(50), IN `_correo` VARCHAR(50), IN `_id` INT)  BEGIN
	UPDATE Perfil SET nombre = _nombre, apellido = _apellido, correo = _correo WHERE idPerfil = _id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_updateTarea` (IN `_titulo` VARCHAR(50), IN `_descripcion` VARCHAR(50), IN `_fin` DATETIME, IN `_estado` VARCHAR(30), IN `_id` INT)  BEGIN
	UPDATE Tarea SET titulo = _titulo, descripcion = _descripcion,
    fin = _fin, estado = _estado where idTarea = _id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_updateUsuario` (IN `_nick` VARCHAR(50), IN `_password` VARCHAR(50), IN `_id` INT)  BEGIN
	UPDATE Usuario SET nick = _nick, password = _password WHERE idUsuario = _id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `idCita` int(11) NOT NULL,
  `idContacto` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `lugar` varchar(100) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cita`
--

INSERT INTO `cita` (`idCita`, `idContacto`, `descripcion`, `lugar`, `fecha`) VALUES
(1, 13, 'casual', 'zona 4', '2017-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `idContacto` int(11) NOT NULL,
  `idPerfil` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `telefono` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`idContacto`, `idPerfil`, `nombre`, `apellido`, `correo`, `telefono`) VALUES
(12, 5, 'pablo', 'jacobo', 'pab@mail.com', '233445435'),
(13, 5, 'jagap', 'garcia', 'jaj@mail.com', '343565');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `idPerfil` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `correo` varchar(45) NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`idPerfil`, `nombre`, `apellido`, `correo`, `idUsuario`) VALUES
(4, 'admin', 'admin', 'admin', 4),
(5, 'pablo', 'jacobo', 'pab@mail,com', 5),
(6, 'pablo', 'jacobo', 'pab@mail,com', 6),
(7, 'sam', 'jacobo', 'sam@mail.com', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `idTarea` int(11) NOT NULL,
  `idPerfil` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `inicio` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fin` datetime NOT NULL,
  `estado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tarea`
--

INSERT INTO `tarea` (`idTarea`, `idPerfil`, `titulo`, `descripcion`, `inicio`, `fin`, `estado`) VALUES
(4, 5, 'agenda', 'taller', '2017-07-24 16:38:06', '2017-01-01 00:00:00', 'Terminada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nick` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nick`, `password`) VALUES
(2, 'fernanchelo', 'admin'),
(4, 'admin', 'admin'),
(5, 'pablo', '1234'),
(6, 'pablo', '1234'),
(7, 'sam', '12345');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`idCita`),
  ADD KEY `idContacto` (`idContacto`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`idContacto`),
  ADD KEY `idPerfil` (`idPerfil`);

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`idPerfil`),
  ADD KEY `idUsuario_idx` (`idUsuario`);

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`idTarea`),
  ADD KEY `idPerfil` (`idPerfil`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `idCita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `idContacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de la tabla `perfil`
--
ALTER TABLE `perfil`
  MODIFY `idPerfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
  MODIFY `idTarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `cita_ibfk_1` FOREIGN KEY (`idContacto`) REFERENCES `contacto` (`idContacto`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD CONSTRAINT `idPerfil` FOREIGN KEY (`idPerfil`) REFERENCES `perfil` (`idPerfil`) ON DELETE CASCADE;

--
-- Filtros para la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD CONSTRAINT `idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `tarea_ibfk_1` FOREIGN KEY (`idPerfil`) REFERENCES `perfil` (`idPerfil`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
