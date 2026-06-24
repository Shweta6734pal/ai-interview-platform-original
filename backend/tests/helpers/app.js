
const express = require("express");

function createTestApp(routes) {
  const app = express();

  app.use(express.json());

  routes.forEach(({ path, router }) => {
    app.use(path, router);
  });

  return app;
}

module.exports = createTestApp;