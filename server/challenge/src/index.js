import express from 'express';
import challengeRouter from './routes/challenge.js';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/challenge/', challengeRouter);

app.listen(PORT, () => {
    console.log(`Started challenge api service on port: ${PORT}`);
});