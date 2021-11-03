import express from 'express';
import wordRouter from './routes/WordRoutes.js';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 5007;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', wordRouter);

app.listen(PORT, () => {
    console.log(`Started WORD api service on port: ${PORT}`);
});