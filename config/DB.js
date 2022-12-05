
const mongoose = require('mongoose');
const ConnectToDb = () => {
   return mongoose.connect('mongodb+srv://MohammedReda:01212745939@cluster0.x5d0h00.mongodb.net/?retryWrites=true&w=majority',{
      dbName: "Questionnaire"
   })
      // mongodb+srv://MohammedReda:01212745939@cluster0.x5d0h00.mongodb.net/?retryWrites=true&w=majority
      .then(() => {
         console.log("Connected To DB");
      })
      .catch((err) => {
         console.log(err);
      })
}

module.exports = { ConnectToDb }