import { NextApiRequest, NextApiResponse } from "next";
import Airtable from "airtable";
import jwt from "next-auth/jwt";
import { cors } from "../../utils/middleware";
const { SECRET } = process.env;
const { AIRTABLE_KEY } = process.env;

const base = new Airtable({ apiKey: AIRTABLE_KEY }).base("appIBLFgF6dD2yNyl");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await cors(req, res);

    const token = await jwt.getToken({
      req,
      secret: SECRET,
    });
    if (!token || !token.isAuthorized) {
      throw new Error("Your are not Authorized");
    }
    const { id, name, approved } = req.body;

    await base("Bite").update(id, {
      Name: name,
      Approved: approved,
    });

    res.end();
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.json({ e });
  }
};
