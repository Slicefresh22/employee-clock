const mongo = require("../dbConnection");
const { userModel } = require("../Schema");

// creating app service using IIF
// using the singleton revealing pattern
const appService = (() => {
  let db;
  try {
    mongo.connect().then((res) => {
      db = res;
    });
  } catch (err) {
    console.log(err);
  }

  const findOne = async (username) => {
    return new Promise((resolve, reject) => {
      const params = { username: username };
      userModel.findOne(params, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  };

  const createUser = async (user) => {
    return new Promise((resolve, reject) => {
      userModel.insertMany(user, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  };

  return {
    findOne: findOne,
    createUser: createUser,
  };
})();

module.exports = {
  AppService: appService,
};
