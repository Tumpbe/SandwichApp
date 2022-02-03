const { query } = require('./core');

module.exports.getSandwiches = () => query(`
  SELECT *
  FROM sandwich
  `,
);

module.exports.getSandwichById = (id) => query(`
  SELECT *
  FROM sandwich
  WHERE id = $1
  `,
  [id],
);

module.exports.addSandwich = (name, breadType) => query(`
  INSERT INTO sandwich(name, bread)
  VALUES($1, $2)
  RETURNING *
  `,
  [name, breadType],
);

module.exports.deleteSandwich = (id) => query(`
  DELETE FROM sandwich
  WHERE id = $1
  RETURNING *
  `,  
  [id],
);

module.exports.updateSandwich = (id, name, bread) => query(`
  UPDATE sandwich
  SET name = $1, bread = $2
  WHERE id = $3
  RETURNING *
  `,
  [name, bread, id],
);
