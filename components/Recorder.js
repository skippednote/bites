import React, { useState } from "react";

export const Recorder = ({ setAudio }) => {
  const [recording, setRecording] = useState("stopped");
  const [recorder, setRecorder] = useState(null);
  const chunks = [];

  const record = async () => {
    setRecording("recording");
    setAudio({});
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    const mr = new MediaRecorder(stream);

    mr.addEventListener("dataavailable", (e) => {
      chunks.push(e.data);
    });

    mr.addEventListener("stop", () => {
      const audioBlob = new Blob(chunks);
      const audioURL = URL.createObjectURL(audioBlob);
      const fr = new FileReader();
      fr.readAsDataURL(audioBlob);
      fr.addEventListener("loadend", () => {
        setAudio({ url: audioURL, data: fr.result });
      });
    });
    mr.start();
    setRecorder({ mr, stream });
  };

  const resume = () => {
    setRecording("recording");
    recorder.mr.resume();
  };

  const pause = () => {
    setRecording("paused");
    recorder.mr.pause();
  };

  const stop = () => {
    setRecording("stopped");
    recorder.mr.stop();
    recorder.stream.getTracks().forEach((t) => t.stop());
  };

  return recording === "stopped" ? (
    <button onClick={record}>Record</button>
  ) : (
    <>
      {recording === "paused" ? (
        <button onClick={resume}>Resume</button>
      ) : (
        <button onClick={pause}>Pause</button>
      )}
      <button onClick={stop}>Stop</button>
    </>
  );
};
