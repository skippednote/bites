import {FunctionComponent} from "react";
import { Player } from "./Player";

export type BiteI = {
  id: string;
  name: string;
  url: string;
  created_on: string;
  user?: string;
  userName?: string;
  userImage?: string;
  approved?: boolean;
};

export const Bite: FunctionComponent<{bite: BiteI}> = ({ bite, children }) => {
  const date = new Date(bite.created_on).toLocaleDateString();
  return (
    <div key={bite.id} className="bite">
      <Player bite={bite} />
      <div className="bite-meta">
        <p className="bite-name">{bite.name}</p>
        <div className="small">
          <p>{date}</p>
          <p className="bite-author">
            {bite.userName}
            <img className="image"
              style={{ height: 25 }}
              src={bite.userImage}
              alt={bite.userName}
            />
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

type Props = {
  bites: BiteI[];
  children(bite: BiteI): JSX.Element;
};

export const Bites = ({ bites, children }: Props) => {
  return (
    <div className="bites">
      {bites &&
        bites.map((bite) => {
          return children(bite);
        })}
    </div>
  );
};
