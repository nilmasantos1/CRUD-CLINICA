const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Paciente = sequelize.define('pacientes', {
  cpf: {
    type: DataTypes.STRING(11),
    primaryKey: true,
    allowNull: false,
    validate: {
      is: /^[0-9]{11}$/ // Validação simples para CPF com 11 dígitos numéricos
    },
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  diaMarcado: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  horaMarcada: {
    type: DataTypes.TIME,
    allowNull: false,
  },
}, {
  tableName: 'pacientes',
  timestamps: false,
});

module.exports = Paciente;
