#!/usr/bin/env node

'use strict';

const amqp = require('amqplib');

module.exports.getTask = (rabbitHost, queueName, callback) => {

  amqp.connect('amqp://' + rabbitHost)
    .then((conn) => {
      process.once('SIGINT', () => conn.close());
      return conn.createChannel()
        .then((ch) => {

          const handleMsg = (msg) => {
            var payload = msg.content.toString();
            console.log(" [x] Received '%s'", payload);
            setTimeout(() => {
              console.log(new Date(), " [x] Done");
              ch.ack(msg);
              callback(payload);
            }, 10000);
          }

          return ch.assertQueue(queueName, { durable: true })
            .then(() => ch.prefetch(1))
            .then(() => {
              ch.consume(queueName, handleMsg, { noAck: false });
              console.log(new Date(), " [*] Waiting for messages. To exit press CTRL+C");
            });
        });
    }).catch(console.warn);
}
