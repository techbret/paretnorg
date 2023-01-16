import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";

function useStudents(studentId) {
    const [profile, setProfile] = useState({})
    const { getStudentProfile } = UserAuth();

  useEffect(() => {
    const unsubscribe = getStudentProfile(studentId, setProfile);
    return unsubscribe;
  }, [studentId]);

  

  return profile;  
}


export { useStudents };
