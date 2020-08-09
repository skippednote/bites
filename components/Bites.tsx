import { Player } from "./Player";

export type BiteI = {
  id: string;
  name: string;
  url: string;
  created_on: string;
  user: string;
  userName: string;
  userImage: string;
  approved: boolean;
};

export const Bite = ({bite}: { bite: BiteI }) => {
  return (
    <div
      key={bite.id}
      style={{
        backgroundColor: "#ddd",
        padding: "1rem",
        marginBottom: "2rem",
      }}
    >
      <Player bite={bite} />
      <p>{bite.name}</p>
      <p>{bite.created_on}</p>
      <p>
        {bite.userName}
        <img style={{ height: 25 }} src={bite.userImage} alt={bite.userName} />
      </p>
    </div>
  );
};

// @ts-ignore
export const Bites = ({ bites, children }: any) => {
  return (
    <div>
      {bites &&
        bites.map((bite) => {
          {/* return <Bite bite={bite} />; */}
          return children(bite)
        })}
    </div>
  );
};
