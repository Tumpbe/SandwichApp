'use strict';

const db = require('../database/Order');
const { addTask } = require('../rabbit-utils/sendTask');


/**
 * Add an order for an sandwich
 *
 * order Order place an order for a sandwich
 * returns Order
 **/
exports.addOrder = (body) => new Promise((resolve, reject) => {
  db.addOrder(body.sandwichId)
    .then((rows) => {
      const order = rows[0];
      resolve(order);
      addTask('rabbitmq', 'orderQueue', JSON.stringify(order), (err) => {
        db.setOrderStatus(order.id, err ? 'error' : 'inQueue');
      });
    })
    .catch(reject);
});


/**
 * Find an order by its ID
 * IDs must be positive integers
 *
 * orderId Long ID of the order that needs to be fetched
 * returns Order
 **/
exports.getOrderById = (orderId) => new Promise((resolve, reject) => {
  db.getOrderById(orderId)
    .then((rows) => {
      resolve(rows.length > 0 ? rows[0] : null);
    })
    .catch(reject);
});


/**
 * Get a list of all orders. Empty array if no orders are found.
 *
 * returns ArrayOfOrders
 **/
exports.getOrders = () => new Promise((resolve, reject) => {
  db.getOrders()
    .then(resolve)
    .catch(reject);
});

