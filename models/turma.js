const { DataTypes } = require('sequelize');
const db = require('../config/db');

const model = db.define('Turma', {
  // Model attributes are defined here
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  curso_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  professor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  dia_semana: {
    type: DataTypes.TINYINT,
    allowNull: false,
    min: 1, // Domingo
    max: 7  // Sábado
  },
  horario_ini: {
    type: DataTypes.TIME,
    allowNull: false
  },
  horario_fim: {
    type: DataTypes.TIME,
    allowNull: false
  },
  data_ini: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  data_fim: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }

}, {
    tableName: 'turmas'
});

// Chaves Estrangeiras
model.associate = models => {

  model.belongsTo(models.Curso, {
    foreignKey: 'curso_id',
    targetKey: 'id'
  })
  
  model.belongsTo(models.Professor, {
    foreignKey: 'professor_id',
    targetKey: 'id'
  })

}

// Cria a tabela no banco de dados, caso ainda não exista
model.sync()

module.exports = model