let mongoose = require('mongoose');

const db = mongoose.connect(`mongodb+srv://farmsell:farmsell@cluster0.mh36s.mongodb.net/Vitolic?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Database connection successful')
    })
    .catch(err => {
        console.error('Database connection error')
    }); 
module.exports = db;

const metadata = require("node-ec2-metadata");

metadata.isEC2()
.then(function (onEC2) {
  console.log("Running on EC2? " + onEC2);
})
.fail(function(error) {
    console.log("Error: " + error);
});

