'use strict';

const getTask = require('./rabbit-utils/receiveTask.js').getTask;
const addTask = require('./rabbit-utils/sendTask').addTask;

const timeToCook = (sandwichId) => (1000 + sandwichId * 200);

getTask('rabbitmq', 'orderQueue', (payload) => {
  const order = JSON.parse(payload);
  setTimeout(
    () => addTask('rabbitmq', 'sandwichQueue', order.id.toString()),
    timeToCook(order.sandwichid),
  );
});
