import express from 'express';
import communityRouter from './routes/CommunityRouter.js';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 5015;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/community/', communityRouter);

app.listen(PORT, () => {
    console.log(`Started community api service on port: ${PORT}`);
});