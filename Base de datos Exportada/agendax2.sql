-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-07-2017 a las 07:35:32
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agendax2`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADDContact` (`us_idUsuario` INT, `us_nombre` VARCHAR(25), `us_apellido` VARCHAR(25), `us_urlIMG` VARCHAR(200), `us_telefono` VARCHAR(12), `us_correo` VARCHAR(25), `us_idCategoria` INT)  BEGIN
	DECLARE idCON INT;
	
	INSERT INTO contacto(nombre,apellido,telefono,correo,idCategoria, urlIMG) 
	VALUES(us_nombre,us_apellido,us_telefono,us_correo,us_idCategoria, us_urlIMG);
	
	SET idCON = (SELECT idContacto FROM contacto WHERE nombre=us_nombre && apellido=us_apellido && telefono=us_telefono && correo=us_correo && idCategoria=us_idCategoria LIMIT 1);
	
	INSERT INTO detalleusuario(idUsuario, idContacto)
	VALUES(us_idUsuario, idCON);

	SELECT * FROM contacto WHERE nombre=us_nombre && apellido=us_apellido && telefono=us_telefono && correo=us_correo && idCategoria=us_idCategoria LIMIT 1;
		
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `REMOVEContact` (`us_idContacto` INT, `us_idUsuario` INT)  BEGIN
	DELETE FROM detalleusuario WHERE idContacto = us_idContacto && idUsuario = us_idUsuario;
	DELETE FROM contacto WHERE idContacto = us_idContacto;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `nombre`, `idUsuario`) VALUES
(1, 'Familia ', 1),
(2, 'Amigos ', 1),
(4, 'TrabajoO', 1),
(5, 'xd', 3),
(6, 'amigos', 3),
(7, 'programadores', 2),
(8, 'Moteros', 4),
(9, 'Rockeros', 4);

--
-- Disparadores `categoria`
--
DELIMITER $$
CREATE TRIGGER `tr_agregarCategoria` BEFORE INSERT ON `categoria` FOR EACH ROW BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se agrego la categoria ', NEW.nombre), NEW.idUsuario);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_editarCategoria` BEFORE UPDATE ON `categoria` FOR EACH ROW BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se edito la categoria ', NEW.nombre), NEW.idUsuario);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_eliminarCategoria` BEFORE DELETE ON `categoria` FOR EACH ROW BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se elimino la categoria ', OLD.nombre), OLD.idUsuario);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `idCita` int(11) NOT NULL,
  `lugar` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `idContacto` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Disparadores `cita`
--
DELIMITER $$
CREATE TRIGGER `tr_agregarCita` BEFORE INSERT ON `cita` FOR EACH ROW BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se agrego la cita ', NEW.descripcion), NEW.idUsuario);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_editarrCita` BEFORE UPDATE ON `cita` FOR EACH ROW BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se edito la cita ', NEW.descripcion), NEW.idUsuario);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_eliminarrCita` BEFORE DELETE ON `cita` FOR EACH ROW BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se elimino la cita ', OLD.descripcion), OLD.idUsuario);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `idContacto` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `telefono` varchar(11) NOT NULL,
  `correo` varchar(25) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `urlIMG` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`idContacto`, `nombre`, `apellido`, `telefono`, `correo`, `idCategoria`, `urlIMG`) VALUES
(1, 'Elizabeth', 'Rosario', '39452342', 'rosario@gmail.com', 2, ''),
(2, 'Otto', 'Chamo', '9345234', 'ottoChamo@gmailc.om', 2, ''),
(3, 'Monica', 'Rosales Sasbin', '123425342', 'mexocoyr@gmail.com', 2, ''),
(4, 'Nakito', 'Arias', '23934234', 'nakitower', 1, ''),
(6, 'Ana', 'Cruz', '544321466', 'anaxdxd', 2, ''),
(7, 'Alejandro', 'Flores', '23423434', 'AlejandroDjego', 2, ''),
(9, 'Alejandro', 'Flores', '56164420', 'mexocoyr@gmail.com', 2, ''),
(10, 'Diego', 'No se que poner', '23429234', 'otrocorreo', 1, ''),
(12, 'Pablo', 'Ramirez', '2034092349', 'nosequeonda', 2, ''),
(13, 'Nanesq', 'oiwero', '2342', 'eioerp', 2, ''),
(15, 'Mi', 'amor Eli uwu', '924292', 'nose uwu', 1, ''),
(17, 'Corina', 'Odalis', '9876546', 'adfs@ioer.com', 2, ''),
(18, 'mama', 'sanchez', '2334567', 'mama@mai.com', 1, ''),
(19, 'sam', 'jacobo', '21333', 'sam@mail.com', 6, '');

--
-- Disparadores `contacto`
--
DELIMITER $$
CREATE TRIGGER `tr_editarContacto` BEFORE UPDATE ON `contacto` FOR EACH ROW BEGIN 
	 DECLARE _idUsuario INT;
	 SET _idUsuario = (SELECT idUsuario FROM detalleusuario WHERE idContacto = NEW.idContacto LIMIT 1);
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se edito el contacto ', NEW.nombre), _idUsuario);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalleusuario`
--

CREATE TABLE `detalleusuario` (
  `idDetalleUsuario` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idContacto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `detalleusuario`
--

INSERT INTO `detalleusuario` (`idDetalleUsuario`, `idUsuario`, `idContacto`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 6),
(6, 1, 7),
(7, 1, 9),
(8, 1, 10),
(10, 1, 12),
(11, 1, 13),
(13, 1, 15),
(14, 1, 17),
(15, 1, 18),
(16, 3, 19);

--
-- Disparadores `detalleusuario`
--
DELIMITER $$
CREATE TRIGGER `tr_agregarContacto` BEFORE INSERT ON `detalleusuario` FOR EACH ROW BEGIN 
	DECLARE _nombreUser VARCHAR(40);
    SET _nombreUser = (SELECT nombre FROM contacto WHERE idContacto = NEW.idContacto LIMIT 1);
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se agreago el contacto ', _nombreUser), NEW.idUsuario);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_eliminarContacto` BEFORE DELETE ON `detalleusuario` FOR EACH ROW BEGIN 
	DECLARE _nombreUser VARCHAR(40);
    SET _nombreUser = (SELECT nombre FROM contacto WHERE idContacto = OLD.idContacto LIMIT 1);
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se elimino el contacto ', _nombreUser), OLD.idUsuario);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historialagenda`
--

CREATE TABLE `historialagenda` (
  `idHistorial` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `descripcion` text,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `historialagenda`
--

INSERT INTO `historialagenda` (`idHistorial`, `fecha`, `descripcion`, `idUsuario`) VALUES
(9, '2017-07-20 01:07:40', 'Se edito el usuario pablo', 1),
(10, '2017-07-20 19:22:45', 'Se edito el usuario pablo', 1),
(11, '2017-07-20 19:45:17', 'Se edito el usuario fernando', 2),
(12, '2017-07-20 19:46:01', 'Se edito el usuario fernando', 2),
(13, '2017-07-20 19:50:53', 'Se agreago el contacto mama', 1),
(20, '2017-07-20 19:52:28', 'Se agrego la categoria Trabajo', 1),
(22, '2017-07-20 19:53:23', 'Se edito la categoria TrabajoO', 1),
(31, '2017-07-20 20:12:49', 'Se edito el usuario kevin', 3),
(32, '2017-07-20 20:13:40', 'Se edito el usuario kevin', 3),
(33, '2017-07-20 20:14:35', 'Se edito el usuario david', 4),
(34, '2017-07-20 20:16:04', 'Se edito el usuario Dev', 5),
(35, '2017-07-20 21:06:28', 'Se agrego la categoria xd', 3),
(36, '2017-07-20 21:06:42', 'Se agrego la categoria amigos', 3),
(37, '2017-07-20 21:07:37', 'Se agreago el contacto sam', 3),
(41, '2017-07-20 21:13:16', 'Se edito la categoria Familia ', 1),
(42, '2017-07-20 21:13:33', 'Se edito la categoria Amigos ', 1),
(43, '2017-07-20 21:17:27', 'Se agrego la categoria programadores', 2),
(44, '2017-07-20 21:21:02', 'Se edito el usuario david', 4),
(45, '2017-07-20 21:23:01', 'Se agrego la categoria Moteros', 4),
(46, '2017-07-20 21:23:15', 'Se agrego la categoria Rockeros', 4),
(47, '2017-07-20 21:32:41', 'Se agrego la tarea Agenda IN6AM', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prioridad`
--

CREATE TABLE `prioridad` (
  `idPrioridad` int(11) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `prioridad`
--

INSERT INTO `prioridad` (`idPrioridad`, `nombre`) VALUES
(1, 'Alta'),
(2, 'Media'),
(3, 'Baja');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `idTarea` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` text NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `idPrioridad` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tarea`
--

INSERT INTO `tarea` (`idTarea`, `nombre`, `descripcion`, `idCategoria`, `idPrioridad`, `idUsuario`, `fecha`) VALUES
(1, 'TArea de prueba', '234234234234234', 2, 1, 1, '2017-07-18 00:00:00'),
(2, 'Agenda IN6AM', 'es una agende de  con cuentas', 9, 1, 4, '2017-07-04 00:00:00');

--
-- Disparadores `tarea`
--
DELIMITER $$
CREATE TRIGGER `tr_agregarTarea` BEFORE INSERT ON `tarea` FOR EACH ROW BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se agrego la tarea ', NEW.nombre), NEW.idUsuario);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_editarTarea` BEFORE UPDATE ON `tarea` FOR EACH ROW BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se edito la tarea ', NEW.nombre), NEW.idUsuario);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_eliminarTarea` BEFORE DELETE ON `tarea` FOR EACH ROW BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se elimino la tarea ', OLD.nombre), OLD.idUsuario);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nick` varchar(30) DEFAULT NULL,
  `contrasena` varchar(30) DEFAULT NULL,
  `filePath` varchar(150) NOT NULL DEFAULT 'https://image.flaticon.com/icons/svg/201/201818.svg'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nick`, `contrasena`, `filePath`) VALUES
(1, 'pablo', '1234', 'http://localhost:3000/images/20160213_141421.jpg'),
(2, 'fernando', 'wicho', 'http://localhost:3000/images/wicho.jpg'),
(3, 'kevin', 'absd', 'http://localhost:3000/images/kevin.jpg'),
(4, 'david', 'galindo', 'http://localhost:3000/images/apticok.jpg'),
(5, 'Dev', 'dev', 'http://localhost:3000/images/shed-light-luca-debonaire-club-mix_large.jpg');

--
-- Disparadores `usuario`
--
DELIMITER $$
CREATE TRIGGER `tr_agregarUsuario` AFTER INSERT ON `usuario` FOR EACH ROW BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se registro el usuario ', NEW.nick), NEW.idUsuario);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_editarUsuario` BEFORE UPDATE ON `usuario` FOR EACH ROW BEGIN 
    INSERT INTO `historialagenda`(fecha, descripcion, idUsuario)
    VALUES (NOW(), CONCAT('Se edito el usuario ', NEW.nick), NEW.idUsuario);
END
$$
DELIMITER ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`idCita`),
  ADD KEY `idContacto` (`idContacto`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`idContacto`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `detalleusuario`
--
ALTER TABLE `detalleusuario`
  ADD PRIMARY KEY (`idDetalleUsuario`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idContacto` (`idContacto`);

--
-- Indices de la tabla `historialagenda`
--
ALTER TABLE `historialagenda`
  ADD PRIMARY KEY (`idHistorial`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `prioridad`
--
ALTER TABLE `prioridad`
  ADD PRIMARY KEY (`idPrioridad`);

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`idTarea`),
  ADD KEY `idCategoria` (`idCategoria`),
  ADD KEY `idPrioridad` (`idPrioridad`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `idCita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `idContacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT de la tabla `detalleusuario`
--
ALTER TABLE `detalleusuario`
  MODIFY `idDetalleUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT de la tabla `historialagenda`
--
ALTER TABLE `historialagenda`
  MODIFY `idHistorial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT de la tabla `prioridad`
--
ALTER TABLE `prioridad`
  MODIFY `idPrioridad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
  MODIFY `idTarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD CONSTRAINT `categoria_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `cita_ibfk_1` FOREIGN KEY (`idContacto`) REFERENCES `contacto` (`idContacto`),
  ADD CONSTRAINT `cita_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD CONSTRAINT `contacto_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`);

--
-- Filtros para la tabla `detalleusuario`
--
ALTER TABLE `detalleusuario`
  ADD CONSTRAINT `detalleusuario_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  ADD CONSTRAINT `detalleusuario_ibfk_2` FOREIGN KEY (`idContacto`) REFERENCES `contacto` (`idContacto`);

--
-- Filtros para la tabla `historialagenda`
--
ALTER TABLE `historialagenda`
  ADD CONSTRAINT `historialagenda_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `tarea_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`),
  ADD CONSTRAINT `tarea_ibfk_2` FOREIGN KEY (`idPrioridad`) REFERENCES `prioridad` (`idPrioridad`),
  ADD CONSTRAINT `tarea_ibfk_3` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
