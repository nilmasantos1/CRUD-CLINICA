CREATE DATABASE IF NOT EXISTS clinica;
USE clinica;

CREATE TABLE IF NOT EXISTS paciente (
  cpf CHAR(11) PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  idade INT(3) NOT NULL,
  dia_marcado DATE NOT NULL,
  hora_marcada TIME NOT NULL
);
