import express from 'express';
import essaysRouter from './routes/EssayRoutes.js';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', essaysRouter);

app.listen(PORT, () => {
    console.log(`Started ESSAY api service on port: ${PORT}`);
});