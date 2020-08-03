import React, { useState, useEffect } from "react";
import {GetServerSideProps} from 'next'
import Head from "next/head";
import { Recorder } from "../components/Recorder";
import { Player } from "../components/Player";
import { Upload } from "../components/Upload";
import { Bites } from "../components/Bites";

export default function Home({ data }) {
  const [isUploading, setIsUploading] = useState("default");
  const [audio, setAudio] = useState(null);
  const [bites, setBites] = useState(data);

  useEffect(() => {
    const go = async () => {
      const b = await fetch("/api/fetch").then((r) => r.json());
      setBites(b);
    };

    if (isUploading === "success") {
      go();
    }
  }, [isUploading]);

  return (
    <div>
      <Head>
        <title>Sound Bites</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Sound Bite Recorder</h1>
      <Recorder setAudio={setAudio} />
      <Player audio={audio} />
      <Upload
        isUploading={isUploading}
        setIsUploading={setIsUploading}
        setAudio={setAudio}
        audio={audio}
      />
      <Bites bites={bites} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetch("http://localhost:3000/api/fetch").then((r) =>
    r.json()
  );
  return {
    props: { data },
  };
}
