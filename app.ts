"use strict";
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
// import cors from 'cors'

const router = express.Router();
const app = express();

// app.use(cors("*"));

app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
});

app.use(logger('dev'));
app.use(cookieParser());

const indexRouter = router.get('/', function(req, res, next) {
    console.log(req);
    console.log("ramin");
});

app.use('/', indexRouter);

const PORT = 3300;
app.listen(PORT, () => {
    console.log(`[server]: Server is running at https://localhost:${PORT}`);
});