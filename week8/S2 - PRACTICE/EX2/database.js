import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './attendance.sqlite',
  logging: false
});

export default sequelize;
