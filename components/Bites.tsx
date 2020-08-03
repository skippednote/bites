import { Player } from "./Player";
export type Bite = {
  name: string;
  url: string;
  created_on: string;
}
export const Bites = ({ bites }: {bites:Bite[]}) =>
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
        <Player bite={bite} />
        <p>{bite.name}</p>
        <p>{bite.created_on}</p>
      </div>
    );
  });
