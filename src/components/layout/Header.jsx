// src\components\layout\Header.jsx

// Header component: displays username and logout button

import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firebase.js";
import "../../styles/Header.css";

export default function Header() {
  const { user, logout } = useAuth();
  const [username, setUsername] = useState("");

  // Fetch username from Firestore when user changes
  useEffect(() => {
    const fetchUserName = async () => {
      if (!user) return setUsername("");
      const userDoc = doc(db, "users", user.uid);
      const snapshot = await getDoc(userDoc);
      if (snapshot.exists()) setUsername(snapshot.data().name);
    };
    fetchUserName();
  }, [user]);

  return (
    <header>
      {username && <h2>{username}</h2>}
      {user && <button onClick={logout}>Logout</button>}
    </header>
  );
}
