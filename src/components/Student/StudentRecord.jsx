import React, { useState, useEffect, useRef } from 'react';

export default function StudentRecord() {
  const [stream, setStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [blob, setBlob] = useState(null);
  const [recording, setRecording] = useState(false);
  const videoRef = useRef(null);
  
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        const audioTracks = stream.getAudioTracks();
        audioTracks.forEach(track => {
          track.enabled = false;
        });
        setStream(stream);
      });
  }, []);

  useEffect(() => {
    if (stream && videoRef.current) {
        videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (stream && !recorder) {
      setRecorder(new MediaRecorder(stream, {mimeType: 'audio/webm'}));
    }
  }, [stream, recorder]);

  function startRecording() {
    if (recorder) {
      recorder.start();
      setRecording(true);
      let chunks = [];
      recorder.addEventListener("dataavailable", event => {
        chunks.push(event.data);
      });
      recorder.addEventListener("stop", () => {
        setBlob(new Blob(chunks));
      });
    }
  }

  function stopRecording() {
    if (recorder) {
      recorder.stop();
      setRecording(false);
    }
  }

  return (
    <div>
      <video style={{ width: "320px", height: "240px" }} ref={videoRef} autoPlay={true} playsInline={true} />
      <div></div>
      {recording ? (
        <button className='p-4 bg-red-400 text-white text-center' onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button className='p-4 bg-emerald-400 text-white text-center' onClick={startRecording}>Start Recording</button>
      )}
      {blob && <video src={URL.createObjectURL(blob)} controls={true} />}
    </div>
  );

  

}
