const mongoose = require("mongoose");

async function connectTestDB() {
  const uri = process.env.MONGO_URI_TEST;

  if (!uri) {
    throw new Error("MONGO_URI_TEST is missing. Add it to backend/.env.test");
  }

  if (!uri.includes("test")) {
    throw new Error("Refusing to run tests on a non-test database");
  }

  await mongoose.connect(uri);
}

async function clearTestDB() {
  const collections = mongoose.connection.collections;

  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }
}

async function closeTestDB() {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
}

module.exports = {
  connectTestDB,
  clearTestDB,
  closeTestDB,
};