import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";

function useLessons(grade, day) {
    const [lessons, setLessons] = useState([])
    const { getLessons } = UserAuth();

  useEffect(() => {
    const unsubscribe = getLessons(grade, day, setLessons);
    return unsubscribe;
  }, [grade]);

  return lessons;  
}


export { useLessons };



