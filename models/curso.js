'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Turma, {
        foreignKey: 'curso_id',
        sourceKey: 'id',
        as: 'turmas'
      }) 
    }
  }
  Curso.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    sigla: {
      type: DataTypes.CHAR(5),
      unique: true
    },
    descricao: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    duracao_meses: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 6
    },
    carga_horaria: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 80
    },
    valor_total: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Curso',
    tableName: 'cursos'
  });

  return Curso;
};