import React, { useState } from "react";
import { Audio } from "./Upload";

export type SetAudio = React.Dispatch<React.SetStateAction<Audio>>;

export const Recorder = ({ setAudio }: { setAudio: SetAudio }) => {
  const [recording, setRecording] = useState("stopped");
  const [recorder, setRecorder] = useState<{
    mr: MediaRecorder;
    stream: MediaStream;
  }>();
  const chunks: Blob[] = [];

  const record = async () => {
    setRecording("recording");
    setAudio(undefined);
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
    recorder && recorder.mr && recorder.mr.resume();
  };

  const pause = () => {
    setRecording("paused");
    recorder && recorder.mr && recorder.mr.pause();
  };

  const stop = () => {
    setRecording("stopped");
    if (recorder) {
      recorder.mr && recorder.mr.stop();
      recorder.stream && recorder.stream.getTracks().forEach((t) => t.stop());
    }
  };

  return (
    <div className="recorder">
      {recording === "stopped" ? (
        <button className="btn" onClick={record}>
          🎙️ Record
        </button>
      ) : (
        <>
          {recording === "paused" ? (
            <button className="btn" onClick={resume}>
              🎙️ Resume
            </button>
          ) : (
            <button className="btn" style={{marginRight: '1rem'}} onClick={pause}>
              ⏸️ Pause
            </button>
          )}
          <button className="btn" onClick={stop}>
            ⏹️ Stop
          </button>
        </>
      )}
    </div>
  );
};
