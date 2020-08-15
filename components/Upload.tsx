import React, { useState } from "react";
import { SetAudio } from "./Recorder";

export type Audio =
  | {
      url: string;
      data: string | ArrayBuffer | null;
    }
  | undefined;

export type User = {
  name: string;
  email: string;
  image: string;
};

interface Props {
  isUploading: string;
  setIsUploading: (val: string) => void;
  setAudio: SetAudio;
  audio: Audio;
  userId: string;
}

export const Upload = ({
  isUploading,
  setIsUploading,
  setAudio,
  audio,
  userId,
}: Props) => {
  const [recordingName, setRecordingName] = useState<string>();

  const upload = async () => {
    if (!audio || !audio.url) {
      return;
    }
    setIsUploading("uploading");
    try {
      await fetch("/api/upload", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          data: audio.data,
          name: recordingName,
          userId,
        }),
      });
      setIsUploading("success");
      setAudio(undefined);
    } catch (e) {
      setIsUploading("failed");
    }
  };

  if (audio && audio.url) {
    return (
      <div className="upload">
        {" "}
        {isUploading === "uploading" ? (
          <div>Uploading....</div>
        ) : (
          <div className="upload-form">
            <input
              style={{marginRight: '1rem'}}
              className="input"
              placeholder="Name the recording*"
              onInput={(e) => setRecordingName(e.currentTarget.value)}
            />
            {recordingName && <button className="btn" onClick={upload}>Upload!</button>}
          </div>
        )}
      </div>
    );
  }
  return null;
};
