import express from 'express';
import notificationRouter from './routes/NotificationRouter.js';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 5016;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/notification/', notificationRouter);

app.listen(PORT, () => {
    console.log(`Started notification api service on port: ${PORT}`);
});