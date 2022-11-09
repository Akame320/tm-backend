require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index')

const PORT = process.env.PORT || 9090;
const DB_URL = process.env.DB__URL;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

const start = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log("hello World!")
        })
    }catch (e) {
        console.error(e)
    }
}

start();