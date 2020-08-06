import { signIn, signOut } from "next-auth/client";

export const Header = ({ session }) => {
  if (!session) {
    return <button onClick={signIn}>Sign in</button>;
  } else {
    return (
      <>
        <span>{session.user.name}</span>
        <img
          style={{ height: 50, borderRadius: "50%" }}
          src={session.user.image}
        />
        <button onClick={signOut}>Sign out</button>
      </>
    );
  }
};
