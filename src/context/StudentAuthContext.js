import { createContext, useContext, useEffect, useState } from "react";
import { db, auth, storage } from "../config/firebase";
import { setDoc, doc, getDoc, updateDoc, arrayUnion, onSnapshot, query, collection, where, increment, addDoc, orderBy, getDocs } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithCustomToken,
} from "firebase/auth";

const StudentContext = createContext();

export default function StudentAuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({})

    const navigate = useNavigate();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);                     
            if (currentUser) {
                setIsLoggedIn(true);             
                onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
                    setProfile(doc.data());
                });
                console.log('It ran again');
            } else {
                setIsLoggedIn(false);
            };
        });
        return () => {
            unsubscribe();
        };
    }, []);



    return (
        <StudentContext.Provider value={{ profile, isLoggedIn }}>
            {children}
        </StudentContext.Provider>
    );




}

export const StudentAuth = () => {
    return useContext(StudentContext);
};
