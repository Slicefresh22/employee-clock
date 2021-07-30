const jwt = require("jsonwebtoken");
const { AppService } = require("./AppService");
const SECRET_KEY = process.env.SECRET_KEY || "blackmamba24";

const AuthService = (() => {
  const login = async (username, password) => {
    return new Promise((resolve, reject) => {
      let user;
      try {
        AppService.findOne(username).then((result) => {
          user = result;
          if (user && user.password === password) {
            const { password, ...payload } = user._doc;
            // signing the jwt with payload
            jwt.sign(
              payload,
              SECRET_KEY,
              { expiresIn: "180s" },
              (err, token) => {
                if (err) reject(err);
                resolve(token);
              }
            );
          } else {
            resolve(null); // not found
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  };

  // the logout user method
  const logout = () => {};

  // verify jwt token method
  const verifyJWT = async (token) => {
    return new Promise((resolve, reject) => {
      try {
        const decoded = jwt.verify(token, SECRET_KEY);
        resolve(decoded);
      } catch (err) {
        reject(err);
      }
    });
  };

  // return all the methods
  return {
    login,
    logout,
    verifyJWT,
  };
})();

module.exports = {
  AuthService: AuthService,
};
