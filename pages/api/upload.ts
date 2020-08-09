import { NextApiRequest, NextApiResponse } from "next";
import Airtable from "airtable";
import slug from "slug";
import { S3 } from "aws-sdk";
import jwt from "next-auth/jwt";
import { cors } from "../../utils/middleware";

const {
  SECRET,
  B_AWS_ACCESS_KEY,
  B_AWS_SECRET_ACCESS_KEY,
  AIRTABLE_KEY,
} = process.env;

const s3 = new S3({
  accessKeyId: B_AWS_ACCESS_KEY,
  secretAccessKey: B_AWS_SECRET_ACCESS_KEY,
});
const base = new Airtable({ apiKey: AIRTABLE_KEY }).base("appIBLFgF6dD2yNyl");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await cors(req, res);
    const token = await jwt.getToken({
      req,
      secret: SECRET,
    });
    if (!token || !token.userId) {
      throw new Error("Your are not Authenticated");
    }
    const { data, name, user } = req.body;
    const [, sliced] = data.split(",");
    const buffer = Buffer.from(sliced, "base64");
    const { Location } = await s3
      .upload({
        Bucket: "sound-bites",
        Key: `${slug(name)}-${Date.now()}.webm`,
        Body: buffer,
        ACL: "public-read",
      })
      .promise();

    await base("Bite").create({
      Name: name,
      URL: Location,
      "Created On": new Date().toISOString(),
      User: [user],
    });

    res.statusCode = 200;
    res.json({ Location });
  } catch (e) {
    res.statusCode = 500;
    res.json({ e });
  }
};
