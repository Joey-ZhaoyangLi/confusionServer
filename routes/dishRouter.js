const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/:dishId')
  .all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
  })
  .get((req, res, next) => {
    res.end(`Will send details of dish: ${req.params.dishId} to you! ` )
  })
  .post((req, res, next) => {
    res.end(`POST operation not supported on /dishes/${req.path}`)
  })
  .put((req, res, next) => {
    res.end(`Updating the dish ${req.params.dishId} \n will update the dish: ${req.body.name} with details: ${req.body.description}`)
  })
  .delete((req, res, next) => {
    res.end(`Deteting dish ${req.params.dishId}`)
  })

dishRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res, next) => {
    res.end('Will send all the dishes to you!');
  })
  .post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
  })
  .delete((req, res, next) => {
    res.end('Deleting all dishes');
  });

module.exports = dishRouter;