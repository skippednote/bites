import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/client"; import Head from "next/head";
import { Recorder } from "../components/Recorder";
import { Player } from "../components/Player";
import { Upload } from "../components/Upload";
import { Bites, Bite, BiteI } from "../components/Bites";
import { Audio } from "../components/Upload";
import { Header } from "../components/Header";
const { NEXTAUTH_URL } = process.env;

export default function Home({ data }: { data: BiteI[] }) {
  const [session, loading] = useSession();
  const [isUploading, setIsUploading] = useState("default");
  const [audio, setAudio] = useState<Audio>();
  const [bites, setBites] = useState(data);

  useEffect(() => {
    const go = async () => {
      const data = await fetch("/api/fetch").then((r) => r.json());
      setBites(data);
    };

    if (isUploading === "success") {
      go();
    }
  }, [isUploading]);

  return (
    <div className="container">
      <Head>
        <title>Bites Recorder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header session={session} loading={loading} />
      {session && (
        <div className="record">
          <Recorder setAudio={setAudio} />
          {audio && audio.data &&
            <div className="player-upload">
              <Player bite={audio} />
              <Upload
                isUploading={isUploading}
                setIsUploading={setIsUploading}
                setAudio={setAudio}
                audio={audio}
                userId={session.userId}
              />
            </div>
          }
        </div>
      )}
      <Bites bites={bites}>
        {(bite: BiteI) => <Bite key={bite.id} bite={bite} />}
      </Bites>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const session = await getSession(context);
    const data = await fetch(`${NEXTAUTH_URL}/api/fetch`, {
      headers: {
        cookie: context.req.headers.cookie || '',
      },
    }).then((r) => r.json());
    return {
      props: { data, session },
    };
  } catch (e) {
    console.log({ e });

    return {
      props: {
        data: [],
      },
    };
  }
};
