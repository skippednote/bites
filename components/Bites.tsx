import { Player } from "./Player";

export type Bite = {
  id: string;
  name: string;
  url: string;
  created_on: string;
  user: string;
  userName: string;
  userImage: string;
};

export const Bites = ({ bites }: { bites: Bite[] }) => {
  return (
    <div>
      {bites &&
        bites.map((bite) => {
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
                <img
                  style={{ height: 25 }}
                  src={bite.userImage}
                  alt={bite.userName}
                />
              </p>
              {/* bite.user && (
                <p>
                  <em>{bite.user.name}</em>{" "}
                  <img style={{ height: 25 }} src={bite.user.image} />
                </p>
              ) */}
            </div>
          );
        })}
    </div>
  );
};
