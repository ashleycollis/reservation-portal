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
    static async countAvailableTables(slot) {
      let timeslot = new Date(slot);
      let priorTimeslot = new Date(slot);
      priorTimeslot.setMinutes(priorTimeslot.getMinutes() - 30);
      return (
        await this.findAll({
          where: { slot: [priorTimeslot, timeslot] },
        })
      ).length;
    }
  }

  return Reservation;
};
