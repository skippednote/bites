import React from "react";
// type Audio = {
//   url: string;
//   data: string | ArrayBuffer
// }
import {Bite} from './Bites'

export const Player = ({ bite }: {bite: Bite}) => {
  if (bite && bite.url) {
    return <audio controls src={bite.url} />;
  }
  return null;
};
