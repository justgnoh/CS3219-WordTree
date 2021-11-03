import express from 'express';
import authRouter from './routes/auth.js';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', authRouter);

app.listen(PORT, () => {
    console.log(`Started api service on port: ${PORT}`);
});