-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-11-2022 a las 18:08:32
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `donaciones`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anonimas`
--

CREATE TABLE `anonimas` (
  `id` int(6) NOT NULL,
  `fecha` varchar(100) NOT NULL,
  `importe` decimal(10,2) NOT NULL,
  `causa` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `anonimas`
--

INSERT INTO `anonimas` (`id`, `fecha`, `importe`, `causa`) VALUES
(30, '2022-10-26T20:09:17.764Z', '200.00', 'Niños Africa'),
(31, '2022-10-26T20:11:48.692Z', '100.00', 'Residentes Ucrania'),
(42, '2022-11-24T21:48:29.882Z', '100.00', 'familias ucranianas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `causas`
--

CREATE TABLE `causas` (
  `id` int(6) NOT NULL,
  `denominacion` varchar(100) NOT NULL,
  `pais` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `causas`
--

INSERT INTO `causas` (`id`, `denominacion`, `pais`) VALUES
(1, 'familias ucranianas', 'Ucrania'),
(2, 'niños en situacion de calle', 'Argentina'),
(6, 'fundacion cancer', 'Argentina'),
(8, 'inundaciones norte del pais', 'argentina'),
(16, 'fundacion salud', 'Argentina');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `organizaciones`
--

CREATE TABLE `organizaciones` (
  `id` int(4) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `foto` varchar(100) NOT NULL,
  `estado` varchar(16) NOT NULL DEFAULT 'no habilitado',
  `role` varchar(5) NOT NULL DEFAULT 'org'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `organizaciones`
--

INSERT INTO `organizaciones` (`id`, `nombre`, `mail`, `password`, `foto`, `estado`, `role`) VALUES
(19, 'ORG 1', 'org1@org1.com', '0', '1668623858061-avatar.png', 'habilitado', 'org');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orgstock`
--

CREATE TABLE `orgstock` (
  `id` int(4) NOT NULL,
  `id_organizacion` int(4) NOT NULL,
  `articulo` varchar(60) NOT NULL,
  `cantidad` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orgstock`
--

INSERT INTO `orgstock` (`id`, `id_organizacion`, `articulo`, `cantidad`) VALUES
(29, 19, 'zapatillas talle 41 x par', 12),
(30, 19, 'remeras lisas x unidad', 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orgstock_causas`
--

CREATE TABLE `orgstock_causas` (
  `id` int(5) NOT NULL,
  `id_orgstock` int(5) NOT NULL,
  `id_causas` int(5) NOT NULL,
  `cantidad` int(3) NOT NULL,
  `fecha` varchar(12) NOT NULL,
  `aprobado` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orgstock_causas`
--

INSERT INTO `orgstock_causas` (`id`, `id_orgstock`, `id_causas`, `cantidad`, `fecha`, `aprobado`) VALUES
(28, 29, 1, 2, '2022-11-29T1', 2),
(29, 29, 2, 2, '2022-11-29T1', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taller`
--

CREATE TABLE `taller` (
  `id` int(6) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `taller`
--

INSERT INTO `taller` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Taller Artesano', 'En el ámbito de las artes y artesanía, es necesario conocer los diferentes campos de la elaboración de obras de forja artesanal, dentro del área profesional de artesanía tradicional. Así, con el presente curso se pretende aportar los conocimientos necesarios para la organización de la actividad profesional de un taller artesanal.\n- Determinar el proyecto de un taller artesano teniendo en cuenta su plan de viabilidad en el mercado.\n- Configurar el espacio del taller artesano, herramientas, maquinaria y puestos de trabajo, teniendo en cuenta las normativas que regulan la actividad laboral y la seguridad e higiene en el trabajo.\n- Definir y elaborar un plan de obligaciones tributarias y de solicitud de subvenciones teniendo en cuenta la normativa laboral y fiscal vigente en el lugar de establecimiento del taller artesano.\n- Definir un presupuesto de una pieza o serie a realizar para decidir la viabilidad económica teniendo en cuenta todos los costes de producción.\n- Determinar aprovisionamientos de suministros para abastecer una producción prevista teniendo en cuenta necesidades y existencias.\n- Definir un plan de venta de los productos artesanos teniendo en cuenta los canales de distribución y comercialización.\n- Analizar las medidas de prevención y de seguridad respecto a las actuaciones de la manipulación de las instalaciones y equipos, contenidas en los planes de seguridad de las empresas del sector.'),
(2, 'forja', 'El objetivo de la técnica de forja es dar forma y dotar a los materiales de unas determinadas propiedades y aleaciones. En forja, las deformaciones pueden producirse a través de presión, mediante prensas, o bien por impacto, a través de martillos pilones. La forja realizada mediante presión se efectúa de forma continua, mientras que la forja realizada por impacto es ejecutada de manera intermitente.\n\nExisten diferentes tipos de forja, tales como la forja libre, la forja con estampa, el recalado y el forjado isotérmico. El arte de la forja es aplicado a muy diversos campos, pudiendo realizar trabajos de forja sobre bielas, cigüeñales, barandillas, ejes, remaches, rejas, cabezas de tornillos y pernos, entre otras aplicaciones. A través de una serie de fórmulas, es como una forja puede ser realizada, por lo que los CURSOS DE FORJA habilitan para conocer el modo de realización de esta técnica, así como las fórmulas necesarias, para poder desarrollarla en el ámbito profesional.\n\nUna vez aprendidos los conocimientos que proporciona la formación especializada en forja, es posible trabajar con los efectos que produce, tanto en caliente como en el forjado isotérmico, además de aprender a realizar la forja artesanal y conocer de primera mano los materiales a los que se aplica la forja, como son el aluminio, el cobre, el titanio, y el zinc, por citar los materiales puros, además de las aleaciones como el acero, aluminio, cobre, magnesio y bronce. Este aprendizaje puede estudiarse en modalidad online para posteriormente aplicarlo a la práctica, con las consecuentes ventajas que supone disponer de los conocimientos necesarios en forja para la inserción laboral en este tipo de industria, así como para realizar trabajos propios y, en su caso, poder comercializarlos. '),
(3, 'Fotografía', 'El presente Curso de Iniciación a la Fotografía Digital le proporcionará los conocimientos básicos para poder empezar en el mundo de la fotografía de una manera sencilla y concienciando todos los aspectos necesarios.\r\nEl presente Curso de Iniciación a la Fotografía Digital está dirigido a todos aquellos profesionales del sector que deseen ampliar sus conocimientos, o para todos aquellos iniciados que quieran dar sus primeros pasos en el mundo de la fotografía digital.\r\n');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(3) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `role` varchar(10) NOT NULL,
  `password` varchar(10) NOT NULL DEFAULT 'password',
  `created_at` varchar(30) NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'no habilitado',
  `taller` varchar(30) NOT NULL,
  `mail` varchar(60) NOT NULL,
  `ter` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `role`, `password`, `created_at`, `estado`, `taller`, `mail`, `ter`) VALUES
(63, 'admin', 'admin', 'admin', 'nerd', '2022-09-28T04:30:45.577Z', 'admin', '', 'admin@admin.com', 0),
(156, 'miguel', 'miguel', '', '000000', '2022-11-29T16:25:18.366Z', 'no habilitado', 'Taller Artesano', 'mail1@mail1.com', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `anonimas`
--
ALTER TABLE `anonimas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `causas`
--
ALTER TABLE `causas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `organizaciones`
--
ALTER TABLE `organizaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `orgstock`
--
ALTER TABLE `orgstock`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_organizacion` (`id_organizacion`);

--
-- Indices de la tabla `orgstock_causas`
--
ALTER TABLE `orgstock_causas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_causas` (`id_causas`),
  ADD KEY `orgstock_causas_ibfk_1` (`id_orgstock`);

--
-- Indices de la tabla `taller`
--
ALTER TABLE `taller`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `anonimas`
--
ALTER TABLE `anonimas`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `causas`
--
ALTER TABLE `causas`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `organizaciones`
--
ALTER TABLE `organizaciones`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `orgstock`
--
ALTER TABLE `orgstock`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `orgstock_causas`
--
ALTER TABLE `orgstock_causas`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `taller`
--
ALTER TABLE `taller`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orgstock`
--
ALTER TABLE `orgstock`
  ADD CONSTRAINT `orgstock_ibfk_1` FOREIGN KEY (`id_organizacion`) REFERENCES `organizaciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `orgstock_causas`
--
ALTER TABLE `orgstock_causas`
  ADD CONSTRAINT `orgstock_causas_ibfk_1` FOREIGN KEY (`id_orgstock`) REFERENCES `orgstock` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orgstock_causas_ibfk_2` FOREIGN KEY (`id_causas`) REFERENCES `causas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
