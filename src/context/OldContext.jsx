const uploadVideos = (vids) => {
    console.log("uploading");
    const day = "3";
    let count = 0;
    for (const file of vids) {
      if (file == null) return;
      if (count < 32) {
        const videoRef = ref(
          storage,
          `/kindergarten/day${day}/` + file.name.slice(0, -13)
        );
        // uploadBytes(videoRef, file);
        console.log(`setting doc: ${file}`);
        setDoc(doc(db, "lessons", "k", `day${day}`, count.toString()), {
          lessonVideo: `/kindergarten/day${day}/` + file.name.slice(0, -13),
          title: file.name
            .slice(0, -13)
            .replace(/[^a-zA-Z0-9 ]/gi, " ")
            .slice(8),
          gradeLevel: "kindergarten",
          quiz: [],
          lyrics: "",
          workSheetLink: "",
          imageRef: "",
          lessonNumber: count,
        });
        count++;
      } else if (count > 31 && count < 60) {
        const videoRef = ref(
          storage,
          `/firstGrade/day${day}/` + file.name.slice(0, -13)
        );
        // uploadBytes(videoRef, file);
        console.log(`setting doc: ${file} and ${count.toString()}`);
        setDoc(doc(db, "lessons", "1", `day${day}`, count.toString()), {
          lessonVideo: `/firstGrade/day${day}/` + file.name.slice(0, -13),
          title: file.name
            .slice(0, -13)
            .replace(/[^a-zA-Z0-9 ]/gi, " ")
            .slice(8),
          gradeLevel: "kindergarten",
          quiz: [],
          lyrics: "",
          workSheetLink: "",
          imageRef: "",
          lessonNumber: count,
        });
        count++;
      } else if (count > 59 && count < 86) {
        const videoRef = ref(
          storage,
          `/secondGrade/day${day}/` + file.name.slice(0, -13)
        );
        // uploadBytes(videoRef, file);
        console.log(`setting doc: ${file}`);
        setDoc(doc(db, "lessons", "2", `day${day}`, count.toString()), {
          lessonVideo: `/secondGrade/day${day}/` + file.name.slice(0, -13),
          title: file.name
            .slice(0, -13)
            .replace(/[^a-zA-Z0-9 ]/gi, " ")
            .slice(8),
          gradeLevel: "kindergarten",
          quiz: [],
          lyrics: "",
          workSheetLink: "",
          imageRef: "",
          lessonNumber: count,
        });
        count++;
      } else if (count > 85 && count < 111) {
        const videoRef = ref(
          storage,
          `/thirdGrade/day${day}/` + file.name.slice(0, -13)
        );
        // uploadBytes(videoRef, file);
        console.log(`setting doc: ${file}`);
        setDoc(doc(db, "lessons", "3", `day${day}`, count.toString()), {
          lessonVideo: `/thirdGrade/day${day}/` + file.name.slice(0, -13),
          title: file.name
            .slice(0, -13)
            .replace(/[^a-zA-Z0-9 ]/gi, " ")
            .slice(8),
          gradeLevel: "kindergarten",
          quiz: [],
          lyrics: "",
          workSheetLink: "",
          imageRef: "",
          lessonNumber: count,
        });
        count++;
      } else if (count > 110 && count < 135) {
        const videoRef = ref(
          storage,
          `/fourthGrade/day${day}/` + file.name.slice(0, -13)
        );
        // uploadBytes(videoRef, file);
        console.log(`setting doc: ${file}`);
        setDoc(doc(db, "lessons", "4", `day${day}`, count.toString()), {
          lessonVideo: `/fourthGrade/day${day}/` + file.name.slice(0, -13),
          title: file.name
            .slice(0, -13)
            .replace(/[^a-zA-Z0-9 ]/gi, " ")
            .slice(9),
          gradeLevel: "kindergarten",
          quiz: [],
          lyrics: "",
          workSheetLink: "",
          imageRef: "",
          lessonNumber: count,
        });
        count++;
      } else {
        const videoRef = ref(
          storage,
          `/fifthGrade/day${day}/` + file.name.slice(0, -13)
        );
        // uploadBytes(videoRef, file);
        console.log(`setting doc: ${file}`);
        setDoc(doc(db, "lessons", "5", `day${day}`, count.toString()), {
          lessonVideo: `/fifthGrade/day${day}/` + file.name.slice(0, -13),
          title: file.name
            .slice(0, -13)
            .replace(/[^a-zA-Z0-9 ]/gi, " ")
            .slice(9),
          gradeLevel: "kindergarten",
          quiz: [],
          lyrics: "",
          workSheetLink: "",
          imageRef: "",
          lessonNumber: count,
        });
        count++;
      }
    }
  };