import React, { useState, useEffect, FormEvent } from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/client";
import Head from "next/head";
import { Header } from "../components/Header";
import { Bites, Bite, BiteI } from "../components/Bites";
const { NEXTAUTH_URL } = process.env;

const Form = ({ bite, setUpdated }: {bite: BiteI, setUpdated: React.Dispatch<React.SetStateAction<number>>}) => {
  const [form, setForm] = useState({
    name: bite.name,
    approved: bite.approved,
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/update", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        approved: form.approved,
        name: form.name,
        id: bite.id,
      }),
    });
    setUpdated(Math.random());
  };

  const deleteBite = async () => {
    await fetch("/api/delete", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: bite.id,
      }),
    });
    setUpdated(Math.random());
  };

  return (
    <>
      <form onSubmit={submit}>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="checkbox"
          checked={form.approved}
          onChange={(e) => setForm({ ...form, approved: e.target.checked })}
        />
        <button type="submit">Update</button>
      </form>
      <button onClick={deleteBite}>Delete</button>
    </>
  );
};

export default function Admin({ data }: { data: BiteI[] }) {
  const [session, loading] = useSession();
  const [bites, setBites] = useState(data);
  const [updated, setUpdated] = useState<number>(0);

  useEffect(() => {
    const go = async () => {
      const data = await fetch("/api/fetch").then((r) => r.json());
      setBites(data);
    };

    go();
  }, [updated]);

  return (
    <div>
      <Head>
        <title>Sound Bites</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header session={session} loading={loading} />
      <h1>Admin: Sound Bite Recorder</h1>

      {session && session.isAuthorized ? (
        <Bites bites={bites}>
          {(bite: BiteI) => (
            <div key={bite.id}>
              <Bite bite={bite} />
              <Form bite={bite} setUpdated={setUpdated} />
            </div>
          )}
        </Bites>
      ) : (
        <div>You are not authorized!</div>
      )}
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
