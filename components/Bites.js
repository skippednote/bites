import { Player } from "./Player";
export const Bites = ({ bites }) =>
  bites &&
  bites.map((bite) => {
    return (
      <div
        style={{
          backgroundColor: "#ddd",
          padding: "1rem",
          marginBottom: "2rem",
        }}
      >
        <Player audio={bite} />
        <p>{bite.name}</p>
        <p>{bite.created_on}</p>
      </div>
    );
  });
