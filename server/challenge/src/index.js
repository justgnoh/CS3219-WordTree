import express from 'express';
import * as routers from './routes/challenge.js';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/challenge/', routers.router);
app.use('/', routers.router2);

app.listen(PORT, () => {
    console.log(`Started challenge api service on port: ${PORT}`);
});