
const AppService = AppService || (()=> {
    var writeToLocalStorage = (item, content) => {
        // set the token in local storage
        localStorage.setItem(item, content);
    }

    var deleteFromLocalStorage = (item) => {
        // delete token from local storage
        localStorage.removeItem(item);
    }

    var readFromLocalStorage = (item) => {
        // get token from local storage
        return localStorage.getItem(item);
    }

    return {
      writeLocalStorage: writeToLocalStorage,
      deleteLocalStorage: deleteFromLocalStorage,
      readLocalStorage: readFromLocalStorage,
    };
})();

export default AppService;