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
    const [studentProfile, setStudent] = useState('')

    const navigate = useNavigate();

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };


    const studentSignIn = async (userName, token) => {
        const q = query(collection(db, "newStudents"), where("userName", "==", userName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.data().imageIndex === token) {
                if (doc.data().hasAccount) {
                    const email = userName + '@readingmastery.org'
                    const password = (token * 1000).toString() + "student"
                    signInWithEmailAndPassword(auth, email, password);
                    navigate("/student-dashboard" );
                } else {
                    setStudentUser(doc.data());
                    setUser(doc.data());
                    window.localStorage.setItem("auth", "true");
                    const studentObj = JSON.stringify(doc.data())
                    window.localStorage.setItem("student", studentObj);
                    navigate('/create-student-account/' + doc.id);
                }

            } else {
                console.log("No Match")
            }
        });
    };

    const studentLogout = () => {
        setStudentUser({});
        window.localStorage.setItem("auth", "false");
        window.localStorage.setItem("student", {});
    }



    const logout = () => {
        setIsLoggedIn(false);
        return signOut(auth);
    };


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
                acceptsMarketing: enabled,
                hasStudent: false
            });
        });
    };

    const createStudentLogin = (studentInfo, settings) => {
        const email = studentInfo.userName + '@readingmastery.org';
        const password = (studentInfo.pwnumber * 1000).toString() + "student"
        return createUserWithEmailAndPassword(
            auth,
            email,
            password
        ).then((userCredential) => {
            console.log(`The User is ${studentInfo.name}`)
            setDoc(doc(db, "students", userCredential.user.uid), {
                studentId: userCredential.user.uid,
                lessonsComplete: [],
                lessonsAssigned: [],
                grades: [],
                avatar: {
                    bgColor: settings.imageColor,
                    imageIndex: settings.imageIndex
                },
                awards: {},
                recordings: {},
                color: '',
                book: '',
                email: email,
                firstName: studentInfo.name,
                lastName: '',
                parentId: studentInfo.parentID,
                oldStudentId: studentInfo._id
            });
        }).then(() => {
            const docRef = doc(db, "newStudents", studentInfo._id)
            updateDoc(docRef, {
                hasAccount: true
            });
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
            const docRef = await addDoc(collection(db, 'newStudents'), studentData);
            await updateDoc(doc(db, "newStudents", docRef.id), { _id: docRef.id })
        } catch (err) {
            console.log(err)
        }
    };

    const updateStudent = async (studentData) => {
        try {
            await updateDoc(doc(db, "newStudents", studentData._id), studentData);
            await updateDoc(doc(db, "users", user.uid), { hasStudent: true })
        } catch (err) {
            console.log(err.message);
            alert(`There was an error: ${err}`)
        }
    }

    const getStudent = (id) => {
        const q = query(collection(db, "newStudents"), where("parentID", "==", id));
        const unsuscribe = onSnapshot(q, (querySnapshot) => {
            const relatedStudents = [];
            querySnapshot.forEach((doc) => {
                relatedStudents.push(doc.data());
            });
            setStudents(relatedStudents)
            return unsuscribe()
        });
    }

    // const getStudentProfile = (studentId, callback) => {        
    //     const studentProfile = getDoc(doc(db, "users", "loggedStudents", "students", studentId));

    //     if (studentProfile.exists()) {
    //         return onSnapshot(doc(db, "users", "loggedStudents", "students", studentId), (doc) => {
    //             callback(doc.data())
    //         });
    //         } 
    //     }        
    //   };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);                     
            if (currentUser) {
                setIsLoggedIn(true);             
                onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
                    setProfile(doc.data());
                    getStudent(currentUser.uid);
                });
                onSnapshot(doc(db, "students", currentUser.uid), (doc) => {
                    setStudent(doc.data());
                })
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
        <UserContext.Provider value={{ createUser, signIn, logout, createStudent, profile, updateUser, isLoggedIn, students, updateStudent, studentSignIn, studentLogout, studentUser, createStudentLogin, studentProfile }}>
            {children}
        </UserContext.Provider>
    );
}


export const UserAuth = () => {
    return useContext(UserContext);
};
