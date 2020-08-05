import React, { useState } from "react";
import {SetAudio} from './Recorder'

export type Audio = {
  url: string;
  data: string | ArrayBuffer | null
} | undefined

interface Props {
  isUploading: string;
  setIsUploading: (val: string) => void;
  setAudio: SetAudio;
  audio: Audio;
}

export const Upload = ({ isUploading, setIsUploading, setAudio, audio }: Props) => {
  const [recordingName, setRecordingName] = useState<string>();

  const upload = async () => {
    if (!audio || !audio.url) {
      return
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
        }),
      });
      setIsUploading("success");
      setAudio(undefined)
    } catch (e) {
      setIsUploading("failed");
    }
  };

  if (audio && audio.url) {
    return isUploading === "uploading" ? (
      <div>Uploading....</div>
    ) : (
      <>
        <input
          placeholder="Name the recording*"
          onInput={(e) => setRecordingName(e.currentTarget.value)}
        />
        {recordingName && <button onClick={upload}>Upload!</button>}
      </>
    );
  }

  return null;
};
