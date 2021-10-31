import express from 'express';
import userRouter from './routes/UserRouter.js';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 5010;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user/', userRouter);

app.listen(PORT, () => {
    console.log(`Started user api service on port: ${PORT}`);
});