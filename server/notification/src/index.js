import express from 'express';
import notificationRouter from './routes/NotificationRouter.js';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from "socket.io";

const PORT = process.env.PORT || 5016;
const SOCKET_PORT = 5017;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/notification/', notificationRouter);

app.listen(PORT, () => {
    console.log(`Started notification api service on port: ${PORT}`);
});

const socketToUid = new Map();
const uidToSocket = new Map();

const httpServer = createServer();
const defaultIo = new Server(httpServer, {
    transports: ["websocket"]
//    upgrade: false
});
httpServer.listen(SOCKET_PORT);
const io = defaultIo.of("/connect");

io.on("connection", (socket) => {
    console.log("Socket: initialise (" + socket.id + ")");
    socket.on("connect_to_server", (firebaseUid) => {
        console.log("Socket: connected (" + socket.id + ", " + firebaseUid + ")");
        socketToUid.set(socket.id, firebaseUid);

        if (uidToSocket.has(firebaseUid)) {
            const socketSet = uidToSocket.get(firebaseUid);
            if (socketSet) {
                socketSet.add(socket.id);
                uidToSocket.set(firebaseUid, socketSet);
            } else {
                const socketSet = new Set();
                socketSet.add(socket.id);
                uidToSocket.set(firebaseUid, socketSet);
            }
        } else {
            const socketSet = new Set();
            socketSet.add(socket.id);
            uidToSocket.set(firebaseUid, socketSet);
        }
    });

    socket.on("disconnect", () => {
        console.log("Socket: disconnected (" + socket.id + ")");
        const firebaseUid = socketToUid.get(socket.id);
        socketToUid.delete(socket.id);
        if (firebaseUid) {
            const socketSet = uidToSocket.get(firebaseUid);
            if (socketSet) {
                socketSet.delete(socket.id);
                if (socketSet.size == 0) {
                    uidToSocket.delete(firebaseUid);
                }
            } else {
                uidToSocket.delete(firebaseUid);
            }
        }
    });
});

app.set('io', io);
app.set('socketToUid', socketToUid);
app.set('uidToSocket', uidToSocket);
