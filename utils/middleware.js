import Cors from "cors";

export function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

export const cors = initMiddleware(
  Cors({
    origin: ["http://localhost:3000", /https:\/\/bites(.+)?.vercel.app/i],
  })
);
