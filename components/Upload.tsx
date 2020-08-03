import React, { useState } from "react";

export const Upload = ({ isUploading, setIsUploading, setAudio, audio }) => {
  const [recordingName, setRecordingName] = useState(null);

  const upload = async () => {
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
      setAudio({});
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
