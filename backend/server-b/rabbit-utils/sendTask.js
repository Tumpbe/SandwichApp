#!/usr/bin/env node

'use strict';

var amqp = require('amqplib');

module.exports.addTask = (rabbitHost, queueName, payload, callback) => {
  amqp.connect('amqp://' + rabbitHost)
    .then((c) => c.createConfirmChannel())
    .then((ch) => ch.sendToQueue(queueName, new Buffer.from(payload), {}, callback));
}
