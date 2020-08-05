import React from "react";
import {Audio} from './Upload'
import {Bite} from './Bites'

type Props = {
  bite: Audio|Bite
}

export const Player = ({ bite }: Props) => {
  if (bite && bite.url) {
    return <audio controls src={bite.url} />;
  }
  return null;
};
