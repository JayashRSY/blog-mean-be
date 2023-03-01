const mongoose = require('mongoose')

mongoose.set("strictQuery", false); // store other values not specified in schema to db
mongoose.connect(process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => {
        console.log('Connected to Database');
    })
    .catch((err) => {
        console.log('Connection failed');
    })

module.exports = mongoose
