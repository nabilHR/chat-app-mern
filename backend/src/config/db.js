const mongoose = require('mongoose');

const connectDB =  () => {
    try {
        const conn = mongoose.connect(process.env.DB_URI);
    }
    catch (error) {
        console.log(error);
        process.exit();
    }
};

module.exports = connectDB;