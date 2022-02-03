const { query } = require('./core');

module.exports.addOrder = (sandwichId) => query(`
  INSERT INTO "order"(status, sandwichId)
  VALUES('received', $1)
  RETURNING *
  `,
  [sandwichId],
);

module.exports.setOrderStatus = (id, status) => query(`
  UPDATE "order"
  SET status = $1
  WHERE id = $2
  RETURNING *
  `,  
  [status, id],
);

module.exports.getOrderById = (id) => query(`
  SELECT *
  FROM "order"
  WHERE id = $1
  `,
  [id],
);

module.exports.getOrders = () => query(`
  SELECT *
  FROM "order"
  `,
);
