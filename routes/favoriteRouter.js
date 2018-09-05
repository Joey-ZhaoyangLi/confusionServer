const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');

const Favorites = require('../models/favorites');
const cors = require('./cors');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
      .populate('user')
      .populate('dishes')
      .then(favorite => {
        console.log(favorite)
        if (favorite != null) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(favorite.dishes);
        }
        else {
          err = new Error('Favorite not found');
          err.status = 404;
          return next(err);
        }
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
      .then(favorite => {
        if (favorite) {
          favorite.dishes.addToSet(req.body)
          favorite.save()
            .then((dish) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(favorite);
            }, (err) => next(err));
        }
        else {
          var newFavorite = {}
          newFavorite.user = req.user._id
          newFavorite.dishes = req.body
          Favorites.create(newFavorite)
            .then((favorite) => {
              console.log('Favorite Created ', favorite);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(favorite);
            }, (err) => next(err))
            .catch((err) => next(err));
        }
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.remove({ user: req.user._id })
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
  })

favoriteRouter.route('/:dishId')
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then(favorite => {
        if (favorite) {
          favorite.dishes.addToSet(req.params.dishId)
          favorite.save()
            .then((dish) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(favorite);
            }, (err) => next(err));
        }
        else {
          var newFavorite
          newFavorite.user = req.user._id
          newFavorite.dishes = [req.params.dishId]
          Favorites.create(newFavorite)
            .then((favorite) => {
              console.log('Favorite Created ', favorite);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(favorite);
            }, (err) => next(err))
            .catch((err) => next(err));
        }
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then(favorite => {
        if (favorite) {
          favorite.dishes = favorite.dishes.filter(dish => dish != req.params.dishId)
          favorite.save()
            .then((dish) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(favorite);
            }, (err) => next(err));
        }
        else {
          err = new Error('Favorite not found');
          err.status = 404;
          return next(err);
        }
      }, (err) => next(err))
      .catch((err) => next(err))
  })

module.exports = favoriteRouter