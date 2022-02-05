const express = require('express');
const Campground = require('../models/campground');
const auth = require('../middleware/auth');
const router = new express.Router();

//Create a Campground
router.post('/campgrounds', auth, async (req, res) => {
  const campground = new Campground({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await campground.save();
    res.status(201).send(campground);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Get all the campgrounds from db
router.get('/campgrounds', (req, res) => {
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      res.status(500).send();
    } else {
      res.status(201).send(campgrounds);
    }
  });
});

// Get a campground by id
router.get('/campgrounds/:id', (req, res) => {
  const _id = req.params.id;

  Campground.findById(_id)
    .then(camground => {
      if (!camground) {
        return res.status(404).send();
      }

      res.send(camground);
    })
    .catch(e => {
      res.status(500).send();
    });
});

// Update a campground by id
router.patch('/campgrounds/:id/', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'price', 'image', 'description'];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const camground = await Campground.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!camground) {
      return res.status(404).send();
    }

    updates.forEach(update => (camground[update] = req.body[update]));
    await camground.save();

    res.send(camground);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete a campground by id
router.delete('/campgrounds/:id', auth, async (req, res) => {
  try {
    const camground = await Campground.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!camground) {
      res.status(404).send();
    }

    res.send(camground);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
