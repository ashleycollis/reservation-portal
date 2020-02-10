'use strict';
module.exports = (sequelize, DataTypes) => {
  const SequelizeReservation = sequelize.define(
    'Reservation',
    {
      name: DataTypes.STRING,
      slot: DataTypes.DATE,
    },
    {}
  );

  class Reservation extends SequelizeReservation {
    static async all() {
      return await this.findAll();
    }
    static async findById(id) {
      return await this.findAll({
        where: { id: id },
      });
    }
    static async countSlots(slot) {
      return await this.findAll({
        where: { slot: slot },
      });
    }
  }

  return Reservation;
};
