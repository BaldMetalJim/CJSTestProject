var express = require('express');
var router = express.Router();

// Material data model
let MaterialModel = require('../models/material_model');

// Retrieve a list of all materials
router.get('/', function(req, res, next) {
  MaterialModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Retrieve a material by id
router.get('/:id', function(req, res, next) {
  MaterialModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Add a material
router.post('/', (req, res, next) => {
  MaterialModel.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
  })
})

// Update a material
router.put('/:id', (req, res, next) => {
  MaterialModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})

// Delete a material
router.delete('/:id', (req, res, next) => {
  MaterialModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})


module.exports = router;
