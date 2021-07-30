const mongoose = require("mongoose");
const MONGO_URL =
  "mongodb+srv://nemese:sBpt2vGExCfj89h@cluster0.2fmkl.mongodb.net/Olorun?retryWrites=true&w=majority";

const connect = (url = MONGO_URL) => {
  try{
    return new Promise((resolve, reject) => {
      const conn = mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true });
      resolve(conn);
    })
  }
  catch(err){
    console.log(err); 
  }
};

module.exports.connect = connect;
