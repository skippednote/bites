import { NextApiRequest, NextApiResponse } from "next";
import jwt from "next-auth/jwt";
import { getSession } from "next-auth/client";
import { fetchAll } from "../../query/fetchAll";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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
          // @ts-ignore
          userName:
            r.fields["Name (from User)"] && r.fields["Name (from User)"][0],
          // @ts-ignore
          userImage:
            r.fields["Image (from User)"] && r.fields["Image (from User)"][0],
          // @ts-ignore
          approved: r.fields["Approved"],
        };
      })
      .filter((b) => b.approved);

    res.statusCode = 200;
    res.json(r);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.json({ e });
  }
};
