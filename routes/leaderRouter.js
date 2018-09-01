const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/:leaderId')
  .all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
  })
  .get((req, res, next) => {
    res.end(`Will send details of leader: ${req.params.leaderId} to you! `)
  })
  .post((req, res, next) => {
    res.end(`POST operation not supported on /leaders/${req.path}`)
  })
  .put((req, res, next) => {
    res.end(`Updating the leader ${req.params.leaderId} \n will update the leader: ${req.body.name} with details: ${req.body.description}`)
  })
  .delete((req, res, next) => {
    res.end(`Deteting leader ${req.params.leaderId}`)
  })

leaderRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res, next) => {
    res.end('Will send all the leaders to you!');
  })
  .post((req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
  })
  .delete((req, res, next) => {
    res.end('Deleting all leaders');
  });

module.exports = leaderRouter;