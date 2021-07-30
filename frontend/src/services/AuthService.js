import axios from "axios";
import AppService from "./AppService";

const URL = "http://localhost:3000";

const AuthService =
  AuthService ||
  (() => {
    var isAuthenticated = false;

    // login user method
    var login = async (username, password) => {
      return new Promise((resolve, reject) => {
        const data = { username: username, password: password };
        axios
          .post(`${URL}/login`, data)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    };

    var logout = () => {
      // remove token from local storage
      AppService.deleteLocalStorage("token");
    };

    var verifyJWT = (token) => {
      return new Promise((resolve, reject) => {
        if (token) {
          axios
            .post(
              `${URL}/verify`,
              {},
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              resolve(res);
            });
        } else {
          reject("Not logged in");
        }
      });
    };

    var setAuthenticated = (status) => {
      isAuthenticated = status;
    };

    var getAuthenticated = () => {
      return isAuthenticated;
    };

    // return methods
    return {
      Login: login,
      Logout: logout,
      VerifyJWT: verifyJWT,
      setAuthenticated,
      getAuthenticated,
    };
  })();

export default AuthService;
