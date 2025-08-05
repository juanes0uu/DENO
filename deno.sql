-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS adso_1;
USE adso_1;
drop database adso_1;
-- Tabla: programa
CREATE TABLE programa (
    idprograma INT PRIMARY KEY,
    nombre_programa VARCHAR(45)
);

-- Tabla: ficha
CREATE TABLE ficha (
    idficha INT PRIMARY KEY,
    codigo VARCHAR(15),
    fecha_inicio_lectiva DATE,
    fecha_fin_lectiva DATE,
    fecha_fin_practica DATE,
    programa_idprograma INT,
    FOREIGN KEY (programa_idprograma) REFERENCES programa(idprograma)
);

-- Tabla: aprendiz
CREATE TABLE aprendiz (
    idaprendiz INT PRIMARY KEY,
    nombre VARCHAR(45),
    apellido VARCHAR(45),
    email VARCHAR(80),
    telefono VARCHAR(15)
);

-- Tabla: instructor
CREATE TABLE instructor (
    idinstructor INT PRIMARY KEY,
    nombre VARCHAR(45),
    apellido VARCHAR(45),
    email VARCHAR(80),
    telefono VARCHAR(15)
);

-- Tabla: profesion
CREATE TABLE profesion (
    idprofesion INT PRIMARY KEY,
    nombre_profesion VARCHAR(45)
);

-- Tabla intermedia: ficha_has_aprendiz
CREATE TABLE ficha_has_aprendiz (
    ficha_idficha INT,
    aprendiz_idaprendiz INT,
    instructor_idinstructor INT,
    PRIMARY KEY (ficha_idficha, aprendiz_idaprendiz, instructor_idinstructor),
    FOREIGN KEY (ficha_idficha) REFERENCES ficha(idficha),
    FOREIGN KEY (aprendiz_idaprendiz) REFERENCES aprendiz(idaprendiz),
    FOREIGN KEY (instructor_idinstructor) REFERENCES instructor(idinstructor)
);

-- Tabla intermedia: instructor_has_profesion
CREATE TABLE instructor_has_profesion (
    instructor_idinstructor INT,
    profesion_idprofesion INT,
    PRIMARY KEY (instructor_idinstructor, profesion_idprofesion),
    FOREIGN KEY (instructor_idinstructor) REFERENCES instructor(idinstructor),
    FOREIGN KEY (profesion_idprofesion) REFERENCES profesion(idprofesion)
);
