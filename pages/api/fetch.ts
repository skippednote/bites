import {NextApiRequest, NextApiResponse} from 'next'
import { fetchAll } from "../../query/fetchAll";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const records = await fetchAll();
    const r = records.map((r) => {
      return {
        id: r.id,
        name: r.fields["Name"],
        url: r.fields["URL"],
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
