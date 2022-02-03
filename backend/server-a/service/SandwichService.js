'use strict';

const db = require('../database/Sandwich');


/**
 * Add a new sandwich to the store. Needs an API key.
 *
 * body Sandwich Sandwich object that needs to be added to the store
 * no response value expected for this operation
 **/
exports.addSandwich = (body) => new Promise((resolve, reject) => {
  db.addSandwich(body.name, body.breadType)
    .then((rows) => {
      resolve(rows[0]);
    })
    .catch(reject);
});


/**
 * Deletes a sandwich
 *
 * sandwichId Long Sandwich id to delete
 * api_key String  (optional)
 * no response value expected for this operation
 **/
exports.deleteSandwich = (sandwichId, api_key) => new Promise((resolve, reject) => {
  if (api_key !== process.env.CLIENT_API_KEY) {
    reject('Invalid API key');
  }
  else {
    db.deleteSandwich(sandwichId)
      .then((rows) => {
        resolve(rows.length > 0 ? rows[0] : null);
      })
      .catch(reject);
  }
});


/**
 * Find sandwich by ID
 * Returns a single sandwich
 *
 * sandwichId Long ID of sandwich to return
 * returns Sandwich
 **/
exports.getSandwichById = (sandwichId) => new Promise((resolve, reject) => {
  db.getSandwichById(sandwichId)
    .then((rows) => {
      resolve(rows.length > 0 ? rows[0] : null);
    })
    .catch(reject);
});


/**
 * Get a list of all sandwiches. Empty array if no sandwiches are found.
 *
 * returns ArrayOfSandwiches
 **/
exports.getSandwiches = () => new Promise((resolve, reject) => {
  db.getSandwiches()
    .then(resolve)
    .catch(reject);
});


/**
 * Updates a sandwich in the store with JSON in body
 *
 * sandwichId Long ID of sandwich to return
 * body Sandwich Sandwich object that needs to be added to the store
 * no response value expected for this operation
 **/
exports.updateSandwich = (sandwichId, body) => new Promise((resolve, reject) => {
  db.updateSandwich(sandwichId, body.name, body.breadType)
    .then((rows) => {
      resolve(rows.length > 0 ? rows[0] : null);
    })
    .catch(reject);
});

