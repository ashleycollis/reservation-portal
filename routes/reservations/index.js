const express = require('express');
const router = express.Router();
const { Reservation } = require('../../models');

router.get('/', async (req, res) => {
  res.json(await Reservation.all());
});

router.get('/:slot', async (req, res) => {
  let slot = req.params.slot;

  res.json(await Reservation.countAvailableTables(slot));
});

router.post('/', async (req, res, next) => {
  try {
    let slot = req.body.slot;
    let reservationCount = await Reservation.countAvailableTables(slot);
    if (reservationCount < 10) {
      let reservation = await Reservation.create(req.body);
      res.status(201).json(reservation);
    } else {
      res.status(406).send('No more reservations available at this slot.');
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    let chosenReservation = req.params.id;
    await Reservation.destroy({
      where: {
        id: chosenReservation,
      },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
