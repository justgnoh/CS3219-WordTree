import { io } from "socket.io-client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.js";
import React, { useState, useEffect } from "react";

// initialise connection to server through socket
const socket = io("http://localhost:80/connect", {
    transports: ["websocket"]
});

// receive new notifications from socket connected with server
socket.on("new_notification", (newNotification) => {
    console.log("Socket: new notification: ", newNotification);
    //notificationList.push(newNotification);
});

function SocketPage() {
    const [user] = useAuthState(auth);
    const [notificationList] = useState([]);

    // retrieve notifications from backend and store into notificationList
    // to be done

    // once retrieved user details from firebase, update server client's firebase uid through socket
    useEffect(() => {
        if (user) {
            console.log(user);
            socket.emit("connect_to_server", user.uid);
        }
    }, [user]);

    // update frontend using useEffect whenever notificationList changes
    useEffect(() => {
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
