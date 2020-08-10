import { NextApiRequest, NextApiResponse } from "next";
import jwt from "next-auth/jwt";
import { fetchAll } from "../../query/fetchAll";
import { cors } from "../../utils/middleware";
const { SECRET } = process.env;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await cors(req, res);
    const token = await jwt.getToken({
      req,
      secret: SECRET!,
    });
    const records = await fetchAll();
    const r = records
      .map((r) => {
        return {
          id: r.id,
          // @ts-ignore
          name: r.fields["Name"],
          // @ts-ignore
          url: r.fields["URL"],
          // @ts-ignore
          created_on: r.fields["Created On"],
          // @ts-ignore
          user: r.fields["User"],
          userName:
            // @ts-ignore
            r.fields["Name (from User)"] && r.fields["Name (from User)"][0],
          userImage:
            // @ts-ignore
            r.fields["Image (from User)"] && r.fields["Image (from User)"][0],
          // @ts-ignore
          approved: r.fields["Approved"],
        };
      })
      .filter((b) => token?.isAuthorized || b.approved);

    res.statusCode = 200;
    res.json(r);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.json({ e });
  }
};
