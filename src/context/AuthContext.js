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

const UserContext = createContext();

export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({})
    const [students, setStudents] = useState([])
    const [studentUser, setStudentUser] = useState({})

    const navigate = useNavigate();

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };


    const studentSignIn = async (userName, token) => {
        const q = query(collection(db, "students"), where("userName", "==", userName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.data().imageIndex === token) {
                setStudentUser(doc.data());
                window.localStorage.setItem("auth", "true");
                const studentObj = JSON.stringify(doc.data())
                window.localStorage.setItem("student", studentObj);
                navigate('/studentDashboard/' + doc.id);
            } else {
                console.log("No Match")
            }
        });
    };

    const studentLogout = () => {
        setStudentUser({});
        window.localStorage.setItem("auth", "false");
        window.localStorage.setItem("student", {});
        console.log(window.localStorage.getItem("auth"));
        navigate('/')
    }



    const logout = () => {
        setIsLoggedIn(false);
        return signOut(auth);
    };

    // const setStudent = async (studentData) => {
    //     try {
    //         await updateDoc(doc(db, "users", studentData._id), { hasStudent: studentData.hasStudent });
    //         await updateDoc(collection(db, "students"), where("parentID", "===", studentData._id), studentData);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const createUser = (email, password, firstName, lastName, enabled) => {
        return createUserWithEmailAndPassword(
            auth,
            email,
            password,
        ).then((userCredential) => {
            setDoc(doc(db, "users", userCredential.user.uid), {
                email: email,
                _id: userCredential.user.uid,
                firstName: firstName,
                lastName: lastName,
                acceptsMarketing: enabled
            });
        });
    };

    const createStudentLogin = (studentInfo) => {
        auth().createUser({
            uid: studentInfo.id,
            password: studentInfo.imageIndex,
            displayName: studentInfo.userName
        })

    }



    const updateUser = async ({ userData }) => {
        try {
            await updateDoc(doc(db, "users", user.uid), userData);
        } catch (err) {
            console.log(err.message);
            alert(`There was an error: ${err}`)
        }
    }
    const createStudent = async (studentData) => {
        try {
            const docRef = await addDoc(collection(db, 'students'), studentData);
            await updateDoc(doc(db, "students", docRef.id), { _id: docRef.id })
        } catch (err) {
            console.log(err)
        }
    };

    const updateStudent = async (studentData) => {
        try {
            await updateDoc(doc(db, "students", studentData._id), studentData);
            await updateDoc(doc(db, "users", user.uid), { hasStudent: true })
        } catch (err) {
            console.log(err.message);
            alert(`There was an error: ${err}`)
        }
    }

    const getStudent = (id) => {
        const q = query(collection(db, "students"), where("parentID", "==", id));
        const unsuscribe = onSnapshot(q, (querySnapshot) => {
            const relatedStudents = [];
            querySnapshot.forEach((doc) => {
                relatedStudents.push(doc.data());
            });
            setStudents(relatedStudents)
            return unsuscribe()
        });
    }




    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                setIsLoggedIn(true);
                onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
                    setProfile(doc.data());
                    getStudent(currentUser.uid);
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
        <UserContext.Provider value={{ createUser, signIn, logout, createStudent, profile, updateUser, isLoggedIn, students, updateStudent, studentSignIn, studentLogout }}>
            {children}
        </UserContext.Provider>
    );
}


export const UserAuth = () => {
    return useContext(UserContext);
};
