import axios from "axios";
import AppService from "./AppService";

const URL = "http://localhost:3000";

const AuthService = AuthService || (() => {
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
      return new Promise((resolve) => {
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
          resolve(false);
        }
      });
    };

    var isAuthenticated = ()=> {
      verifyJWT(AppService.readLocalStorage('token')).then(res => {
        console.log(res);
      })
    }

    var getCurrentUser = ()=> {
      return new Promise((resolve, reject) => {
        verifyJWT(AppService.readLocalStorage('token'))
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        })
      })

    }

    // return methods
    return {
      Login: login,
      Logout: logout,
      VerifyJWT: verifyJWT,
      isAuthenticated,
      getCurrentUser
    };
  })();

export default AuthService;
