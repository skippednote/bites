import React from "react";
import {Audio} from './Upload'
import {BiteI} from './Bites'

type Props = {
  bite: Audio|BiteI
}

export const Player = ({ bite }: Props) => {
  if (bite && bite.url) {
    return <audio controls src={bite.url} />;
  }
  return null;
};
