import { signIn, signOut } from "next-auth/client";
import Link from "next/link";

export interface Session {
  expires: string;
  isAuthorized: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
  userId: string;
}

export const HeaderMeta = ({
  session,
  loading,
}: {
  session: Session;
  loading: boolean;
}) => {
  if (!session) {
    return <button className="btn" onClick={signIn}>Sign in</button>;
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="header-meta">
        <button className="btn" onClick={signOut}>
          Sign out
        </button>
        {/*<span>{session.user.name}</span>*/}
        <img className="image" src={session.user.image} />
      </div>
    );
  }
};

export const Header = ({
  session,
  loading,
}: {
  session: Session;
  loading: boolean;
}) => {
  return (
    <header>
      <h1>
        <Link href="/">
          <a>Bite Recorder</a>
        </Link>
      </h1>
      <div className="header-admin-user">
        <nav style={{fontSize: '1.5rem'}}>
          <Link href="/admin">
            <a>🔒 Admin</a>
          </Link>
        </nav>
        <HeaderMeta session={session} loading={loading} />
      </div>
    </header>
  );
};
