import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/client";
import Head from "next/head";
import { Recorder } from "../components/Recorder";
import { Player } from "../components/Player";
import { Upload } from "../components/Upload";
import { Bites, Bite } from "../components/Bites";
import { Audio } from "../components/Upload";
import { Header } from "../components/Header";
const { NEXTAUTH_URL } = process.env;

export default function Home({ data }: { data: Bite[] }) {
  const [session, loading] = useSession();
  const [isUploading, setIsUploading] = useState("default");
  const [audio, setAudio] = useState<Audio>();
  const [bites, setBites] = useState(data);

  useEffect(() => {
    const go = async () => {
      let data = await fetch("/api/fetch").then((r) => r.json());
      data = data.map((b) => {
        // if (b.user) {
        //   b.user = JSON.parse(b.user);
        // }

        return b;
      });
      setBites(data);
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
      <Header session={session} loading={loading} />
      <h1>Sound Bite Recorder</h1>
      {session && (
        <>
          <Recorder setAudio={setAudio} />
          <Player bite={audio} />
          <Upload
            isUploading={isUploading}
            setIsUploading={setIsUploading}
            setAudio={setAudio}
            audio={audio}
            user={session.userId}
          />
        </>
      )}
      <Bites bites={bites} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const session = await getSession(context);
    const data = await fetch(`${NEXTAUTH_URL}/api/fetch`).then((r) => r.json());
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
