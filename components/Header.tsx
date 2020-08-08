import { signIn, signOut } from "next-auth/client";

export const Header = ({ session, loading }) => {
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
