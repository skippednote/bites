import React from "react";

export const Player = ({ audio }) => {
  if (audio && audio.url) {
    return <audio controls src={audio.url} />;
  }
  return null;
};
