/// <reference types="next" />
/// <reference types="next/types/global" />

interface Token {
  name: string;
  email: string;
  picture: string;
  userId: string;
  isAuthorized: boolean;
  iat: number;
  exp: number;
}
declare module "next-auth/jwt" {
  export function getToken({
    req,
    secret,
  }: {
    req: import("http").IncomingMessage;
    secret: string;
  }): Promise<Token>;
}

declare module "next-auth/client" {
  export function useSession(): [
    import("./components/Header").Session,
    boolean
  ];

  export function getSession(
    context: import("next").GetServerSidePropsContext<
      import("querystring").ParsedUrlQuery
    >
  ): Promise<import("./components/Header").Session>;

  export function signIn(): void;
  export function signOut(): void;
  export function Provider({
    children,
    option,
  }: {
    children: React.children;
    option: {
      clientMaxAge: number;
      keepAlive: number;
    };
    session: import("./components/Header").Session;
  }): JSX.Element;
}
