import Sequelize, { Model } from 'sequelize';

export class User extends Model {
  static init(sequelize) {
    super.init(
      {

        name: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        password_hash: { type: Sequelize.STRING },

      },
      {
        sequelize,
        tableName: 'users'

      }
    );
  }
}

