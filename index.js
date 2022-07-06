require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser');
const router = require('./router/index')
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({}))
app.use('/api', router)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    } catch (e) {
        console.log(e.message)
    }
}
start()