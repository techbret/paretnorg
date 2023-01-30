import { createContext, useContext, useEffect, useState } from "react";
import { db, auth, storage } from "../config/firebase";
import { setDoc, doc, getDoc, updateDoc, arrayUnion, onSnapshot, query, collection, where, increment, addDoc, orderBy, getDocs, limit } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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
    const [studentProfile, setStudent] = useState('');
    const [currentLesson, setCurrentLesson] = useState({});
    const [currentVideo, setCurrentVideo] = useState('')

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
                    navigate("/student-dashboard");
                } else {
                    setStudentUser(doc.data());
                    setUser(doc.data());
                    console.log(doc.data())
                    window.localStorage.setItem("auth", "true");
                    const studentObj = JSON.stringify(doc.data())
                    window.localStorage.setItem("student", studentObj);
                    navigate('/create-student-account/' + doc.data()._id);
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
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(
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
                resolve();
            }).catch(error => reject(error));
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
            const getStudentGradeLevel = async () => {
                let lesPlan = []
                const lessonQuery = query(collection(db, "lessons", studentInfo.gradeLevel, "day1"), limit(3));
                const querySnapshot = await getDocs(lessonQuery);
                querySnapshot.forEach((doc) => {
                    lesPlan.push(doc.ref);
                })
                console.log(lesPlan)
                setDoc(doc(db, "students", userCredential.user.uid), {
                    studentId: userCredential.user.uid,
                    lessonsComplete: {},
                    lessonScores: { score1: 1, score2: 0, score3: 0, score4: 0 },
                    lessonsAssigned: lesPlan,
                    currentLesson: 0,
                    grades: [],
                    avatar: {
                        bgColor: settings.imageColor,
                        imageIndex: settings.imageIndex
                    },
                    awards: {
                        hasAwards: false,
                        books: [],
                        booksToEarn: [0, 1, 2, 3, 4, 5, 6, 7]
                    },
                    recordings: {},
                    color: '',
                    email: email,
                    firstName: studentInfo.name,
                    lastName: '',
                    parentId: studentInfo.parentID,
                    oldStudentId: studentInfo._id
                });
            }
            getStudentGradeLevel();

        }).then(() => {
            const docRef = doc(db, "newStudents", studentInfo._id)
            updateDoc(docRef, {
                hasAccount: true
            });
        })

    }

    const getLessons = (grade, day, callback) => {
        const q = query(
          collection(db, "lessons", grade, day)
        );
        return onSnapshot(q, (querySnapshot) => {
          const lessons = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          callback(lessons);
        });
      };

    const uploadVideos = (vids) => {
        console.log('uploading')
        const day = "3";
        let count = 0
        for (const file of vids) {
            if (file == null) return;
            if (count < 32) {
                const videoRef = ref(
                    storage,
                    `/kindergarten/day${day}/` + file.name.slice(0, -13)
                );
                // uploadBytes(videoRef, file);
                console.log(`setting doc: ${file}`)
                setDoc(doc(db, "lessons", "k", `day${day}`, count.toString()), {
                    lessonVideo: `/kindergarten/day${day}/` + file.name.slice(0, -13),
                    title: file.name.slice(0, -13).replace(/[^a-zA-Z0-9 ]/gi, ' ').slice(8),
                    gradeLevel: "kindergarten",
                    quiz: [],
                    lyrics: "",
                    workSheetLink: "",
                    imageRef: "",
                    lessonNumber: count
                })
                count++
            } else if (count > 31 && count < 60) {
                const videoRef = ref(
                    storage,
                    `/firstGrade/day${day}/` + file.name.slice(0, -13)
                );
                // uploadBytes(videoRef, file);
                console.log(`setting doc: ${file} and ${count.toString()}`)
                setDoc(doc(db, "lessons", "1", `day${day}`, count.toString()), {
                    lessonVideo: `/firstGrade/day${day}/` + file.name.slice(0, -13),
                    title: file.name.slice(0, -13).replace(/[^a-zA-Z0-9 ]/gi, ' ').slice(8),
                    gradeLevel: "kindergarten",
                    quiz: [],
                    lyrics: "",
                    workSheetLink: "",
                    imageRef: "",
                    lessonNumber: count
                })
                count++

            } else if (count > 59 && count < 86) {
                const videoRef = ref(
                    storage,
                    `/secondGrade/day${day}/` + file.name.slice(0, -13)
                );
                // uploadBytes(videoRef, file);
                console.log(`setting doc: ${file}`)
                setDoc(doc(db, "lessons", "2", `day${day}`, count.toString()), {
                    lessonVideo: `/secondGrade/day${day}/` + file.name.slice(0, -13),
                    title: file.name.slice(0, -13).replace(/[^a-zA-Z0-9 ]/gi, ' ').slice(8),
                    gradeLevel: "kindergarten",
                    quiz: [],
                    lyrics: "",
                    workSheetLink: "",
                    imageRef: "",
                    lessonNumber: count
                })
                count++

            } else if (count > 85 && count < 111) {
                const videoRef = ref(
                    storage,
                    `/thirdGrade/day${day}/` + file.name.slice(0, -13)
                );
                // uploadBytes(videoRef, file);
                console.log(`setting doc: ${file}`)
                setDoc(doc(db, "lessons", "3", `day${day}`, count.toString()), {
                    lessonVideo: `/thirdGrade/day${day}/` + file.name.slice(0, -13),
                    title: file.name.slice(0, -13).replace(/[^a-zA-Z0-9 ]/gi, ' ').slice(8),
                    gradeLevel: "kindergarten",
                    quiz: [],
                    lyrics: "",
                    workSheetLink: "",
                    imageRef: "",
                    lessonNumber: count
                })
                count++

            } else if (count > 110 && count < 135) {
                const videoRef = ref(
                    storage,
                    `/fourthGrade/day${day}/` + file.name.slice(0, -13)
                );
                // uploadBytes(videoRef, file);
                console.log(`setting doc: ${file}`)
                setDoc(doc(db, "lessons", "4", `day${day}`, count.toString()), {
                    lessonVideo: `/fourthGrade/day${day}/` + file.name.slice(0, -13),
                    title: file.name.slice(0, -13).replace(/[^a-zA-Z0-9 ]/gi, ' ').slice(9),
                    gradeLevel: "kindergarten",
                    quiz: [],
                    lyrics: "",
                    workSheetLink: "",
                    imageRef: "",
                    lessonNumber: count
                })
                count++

            } else {
                const videoRef = ref(
                    storage,
                    `/fifthGrade/day${day}/` + file.name.slice(0, -13)
                );
                // uploadBytes(videoRef, file);
                console.log(`setting doc: ${file}`)
                setDoc(doc(db, "lessons", "5", `day${day}`, count.toString()), {
                    lessonVideo: `/fifthGrade/day${day}/` + file.name.slice(0, -13),
                    title: file.name.slice(0, -13).replace(/[^a-zA-Z0-9 ]/gi, ' ').slice(9),
                    gradeLevel: "kindergarten",
                    quiz: [],
                    lyrics: "",
                    workSheetLink: "",
                    imageRef: "",
                    lessonNumber: count
                })
                count++

            }

        }


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

    const startLesson = async (lesson) => {
        const lessonReady = await getDoc(doc(db, lesson));
        if (lessonReady.exists()) {
            console.log("Document data:", lessonReady.data());
            setCurrentLesson(lessonReady.data());
            const videoUrl = await getDownloadURL(ref(storage, lessonReady.data().lessonVideo))
            setCurrentVideo(videoUrl)
            navigate('student-lesson/' + lesson);
        } else {
            console.log("No such document")
        }
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
        <UserContext.Provider value={{ createUser, signIn, logout, createStudent, profile, updateUser, isLoggedIn, students, updateStudent, studentSignIn, studentLogout, studentUser, createStudentLogin, studentProfile, uploadVideos, startLesson, currentLesson, currentVideo, getLessons }}>
            {children}
        </UserContext.Provider>
    );
}


export const UserAuth = () => {
    return useContext(UserContext);
};
