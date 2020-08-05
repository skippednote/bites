import { NextApiRequest, NextApiResponse } from "next";
import { fetchAll } from "../../query/fetchAll";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const records = await fetchAll();
    const r = records.map((r) => {
      return {
        id: r.id,
        // @ts-ignore
        name: r.fields["Name"],
        // @ts-ignore
        url: r.fields["URL"],
        // @ts-ignore
        created_on: r.fields["Created On"],
      };
    });

    res.statusCode = 200;
    res.json(r);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.json({ e });
  }
};
