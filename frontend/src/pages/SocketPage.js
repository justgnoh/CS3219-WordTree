import { io } from "socket.io-client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.js";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function SocketPage() {
    // initialise connection to server through socket
    const socket = io("http://localhost:5017/", {
        transports: ["websocket", "polling"]
    });

    const [user] = useAuthState(auth);
    const [notificationList] = useState([]);

    // retrieve notifications from backend and store into notificationList
    // to be done

    // once retrieved user details from firebase, update server client's firebase uid through socket
    useEffect(() => {
        if (user) {
            console.log("Socket: connected to server");
            socket.emit("connect_to_server", user.uid);
        }
    }, [user]);

    // receive new notifications from socket connected with server
    socket.on("new_notification", (newNotification) => {
        console.log("Socket: new notification", newNotification);
        notificationList.push(newNotification);
    });

    // update frontend using useEffect whenever notificationList changes
    useEffect(() => {
        console.log("tested, working");
        // to be done
    }, [notificationList]);

    return (
        <div className="container">
            <div className="row">
            </div>
        </div>
    );
}

export default SocketPage;
