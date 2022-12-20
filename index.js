const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000
const API = process.env.DATABASE_URL || "mongodb+srv://root:root123@cluster0.hzhvoqr.mongodb.net/LaundryCart?retryWrites=true&w=majority"

mongoose.set('strictQuery', false);

const app = require('./app');


async function main() {
    await mongoose.connect(API);
    console.log('connected to database');
    app.listen(port, () => console.log(`Server is live at PORT => ${port}`));
};
main();