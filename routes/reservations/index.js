const express = require('express');
const router = express.Router();
const { Reservation } = require('../../models');

router.get('/', async (req, res) => {
  console.log('Hi!');
  res.json(await Reservation.all());
});

router.get('/:slot', async (req, res) => {
  let slot = req.params.slot;

  res.json(await Reservation.countSlots(slot));
});

router.post('/', async (req, res, next) => {
  try {
    let slot = req.body.slot;
    let reservationCount = await Reservation.countSlots(slot);
    if (reservationCount < 10) {
      let reservation = await Reservation.create(req.body);
      res.status(201).json(reservation.dataValue);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    let chosenReservation = req.params.id;
    console.log(chosenReservation);
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
