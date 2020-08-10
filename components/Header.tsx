import { signIn, signOut } from "next-auth/client";

export interface Session {
  expires: string;
  isAuthorized: string;
  user:{
    name: string;
    email: string;
    image: string
  }
  userId: string;
}

export const Header = ({ session, loading }: {session: Session, loading: boolean}) => {
  if (!session) {
    return <button onClick={signIn}>Sign in</button>;
  } else if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <>
        <span>{session.user.name} | {session.userId}</span>
        <img
          style={{ height: 50, borderRadius: "50%" }}
          src={session.user.image}
        />
        <button onClick={signOut}>Sign out</button>
      </>
    );
  }
};
