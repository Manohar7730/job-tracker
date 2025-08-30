import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firebase";
import "../../styles/Header.css";

export default function Header() {
  const { user, logout } = useAuth();
  const [name, setName] = useState("");

  // Fetch user name from Firestore
  useEffect(() => {
    const fetchName = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setName(docSnap.data().name);
        }
      }
    };
    fetchName();
  }, [user]);

  return (
    <header>
      {<h2>{name}</h2>}
      {user && <button onClick={logout}>Logout</button>}
    </header>
  );
}
