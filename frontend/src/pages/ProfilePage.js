import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";

import { auth, db, logout } from "../firebase";

import Navbar from "../components/Navigation";

function ProfilePage() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const history = useHistory();

    // const fetchUserName = async () => {
    //     try {
    //         // const query = await db.collection("users").where("uid", "==", user?.uid).get();
            
    //         const data = await query.docs[0].data();
    //         console.log(data);
    //         setName(data.name);
    //     } catch (err) {
    //         console.error(err);
    //         alert("An error occured while fetching user data");
    //     }
    // }

    useEffect(()=> {
        if(!user) {
            history.replace("/");
        }
        // fetchUserName();
    } ,[user]);

    return (
        <div>
            <div>
                Logged in as 
                <div>{name}</div>
                <div>{user?.email}</div>
            </div>
             <button className="dashboard__btn" onClick={logout}>
                Logout
            </button>
        </div>
    )
}

export default ProfilePage;